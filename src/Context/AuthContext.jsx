import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  deleteUser,
  onAuthStateChanged,
  signOut
} from "firebase/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const logout = useCallback(async () => {
    setIsLoggingOut(true);
    setLoading(true);
    try {
      await signOut(auth);
      setUser(null);
      setUserData(null);
      localStorage.removeItem("user");
      localStorage.removeItem("userData");
      navigate("/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    } finally {
      setIsLoggingOut(false);
      setLoading(false);
    }
  }, [navigate]);

  const fetchUserData = useCallback(async (uid) => {
    try {
      const token = await auth.currentUser?.getIdToken();
      const response = await fetch(`http://[::1]:3001/users/${uid}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Cache-Control": "no-cache"
        },
      });

      if (!response.ok) {
        throw new Error("Error al obtener los datos del usuario");
      }
      const data = await response.json();
      setUserData(data);
      localStorage.setItem("userData", JSON.stringify(data));
      return data;
    } catch (error) {
      console.error("Error fetching user data:", error);
      await logout();
      throw error;
    }
  }, [logout]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (isLoggingOut) return;

      try {
        if (firebaseUser) {
          setUser(firebaseUser);
          localStorage.setItem("user", JSON.stringify(firebaseUser));

          const userData = await fetchUserData(firebaseUser.uid);

          if (!userData) {
            throw new Error("Datos de usuario no válidos");
          }

          if (['/login', '/register'].includes(location.pathname)) {
            navigate('/home');
          }
        } else {
          setUser(null);
          setUserData(null);
          localStorage.removeItem("user");
          localStorage.removeItem("userData");

          if (!['/login', '/register', '/'].includes(location.pathname)) {
            navigate('/login');
          }
        }
      } catch (error) {
        console.error("Error en el observer de autenticación:", error);
        if (!['/login', '/register'].includes(location.pathname)) {
          navigate('/login');
        }
      } finally {
        setLoading(false);
        setAuthChecked(true);
      }
    });

    return () => unsubscribe();
  }, [navigate, isLoggingOut, location.pathname, fetchUserData]);

  const login = async (email, password) => {
    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userData = await fetchUserData(user.uid);
      navigate('/home');
      return userData;
    } catch (error) {
      console.error("Error al iniciar sesión:", error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email, password, userData) => {
    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const token = await user.getIdToken();

      const userDataForBackend = {
        ...userData,
        uid: user.uid,
        validUser: true
      };

      const response = await fetch("http://[::1]:3001/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userDataForBackend),
      });

      if (!response.ok) {
        const errorData = await response.json();
        await deleteUser(user);
        throw new Error(errorData.message || "Error al registrar en el backend");
      }

      const responseData = await response.json();
      const newUserData = { ...userDataForBackend, ...responseData.user };
      setUser(user);
      setUserData(newUserData);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("userData", JSON.stringify(newUserData));

      navigate('/home');
      return { success: true, user: newUserData };
    } catch (error) {
      console.error("Error en el registro:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (formData) => {
    try {
      setLoading(true);
      const currentUser = auth.currentUser;
      if (!currentUser) throw new Error('Usuario no autenticado');

      const uid = currentUser.uid;
      const token = await currentUser.getIdToken(true);

      const payload = {
        rut: formData.rut,
        phone: formData.phone,
        region: formData.region,
        commune: formData.commune,
        specialties: formData.specialties,
        siiRegistered: formData.siiRegistered,
        hasTools: formData.hasTools,
        ownTransportation: formData.ownTransportation,
        identityCardFront: formData.identityCardFront?.url ?
          { url: formData.identityCardFront.url } : null,
        identityCardBack: formData.identityCardBack?.url ?
          { url: formData.identityCardBack.url } : null,
        backgroundCertificate: formData.backgroundCertificate?.url ?
          { url: formData.backgroundCertificate.url } : null,
        additionalCertificate: formData.additionalCertificate?.url ?
          { url: formData.additionalCertificate.url } : null,
        bankName: formData.bankName,
        accountType: formData.accountType,
        accountHolderName: formData.accountHolderName,
        accountNumber: Number(formData.accountNumber),
        siiActivitiesStarted: formData.siiActivitiesStarted
      };

      // Depuración final
      console.log('Payload para backend:', JSON.stringify(payload, null, 2));

      const response = await fetch(`http://[::1]:3001/users/${uid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const responseData = await response.json();
      if (!response.ok) {
        console.error('Error detallado del backend:', responseData);
        throw new Error(responseData.message || 'Error al actualizar');
      }

      setUserData(responseData.user);
      localStorage.setItem("userData", JSON.stringify(responseData.user));
      return { success: true, user: responseData.user };

    } catch (error) {
      console.error('Error completo:', {
        message: error.message,
        stack: error.stack,
        formData: JSON.parse(JSON.stringify(formData))
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  if (!authChecked) {
    return <div>Cargando...</div>;
  }

  return (
    <AuthContext.Provider value={{
      user,
      userData,
      login,
      register,
      logout,
      loading,
      fetchUserData,
      updateUser,
      authChecked
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);