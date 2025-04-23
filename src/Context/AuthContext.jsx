import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  deleteUser,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";

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

  const fetchUserData = useCallback(
    async (uid) => {
      try {
        const token = await auth.currentUser?.getIdToken();
        const response = await fetch(`http://[::1]:3001/users/${uid}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Cache-Control": "no-cache",
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
    },
    [logout],
  );

  const fetchReviews = useCallback(async () => {
    try {
      const currentUser = auth.currentUser;
      const uid = currentUser.uid;
      const token = await auth.currentUser?.getIdToken();

      const response = await axios.get(
        `http://[::1]:3001/reviews/professional/${uid}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Cache-Control": "no-cache",
          },
        },
      );

      const data = response.data;

      console.log("Response de reseñas:", data);

      return data;
    } catch (error) {
      console.error("Error fetching reviews:", error);
      return [];
    }
  }, []);

  const updateProfile = useCallback(async (profileData) => {
    try {
      setLoading(true);
      const currentUser = auth.currentUser;
      if (!currentUser) throw new Error("Usuario no autenticado");

      const token = await currentUser.getIdToken(true);
      const cleanedPayload = Object.fromEntries(
        Object.entries(profileData).filter(
          ([_, value]) => value !== null && value !== undefined,
        ),
      );

      const response = await axios.patch(
        `http://[::1]:3001/users/${currentUser.uid}`,
        cleanedPayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const updatedUser = response.data;
      setUserData((prev) => ({ ...prev, ...updatedUser }));
      localStorage.setItem("userData", JSON.stringify(updatedUser));
      return { success: true, user: updatedUser };
    } catch (error) {
      console.error("Error updating profile:", error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  }, []);

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

          if (["/login", "/register"].includes(location.pathname)) {
            navigate("/home");
          }
        } else {
          setUser(null);
          setUserData(null);
          localStorage.removeItem("user");
          localStorage.removeItem("userData");

          if (!["/login", "/register", "/"].includes(location.pathname)) {
            navigate("/login");
          }
        }
      } catch (error) {
        console.error("Error en el observer de autenticación:", error);
        if (!["/login", "/register"].includes(location.pathname)) {
          navigate("/login");
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
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;
      const userData = await fetchUserData(user.uid);
      navigate("/home");
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
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;
      const token = await user.getIdToken();

      const userDataForBackend = {
        ...userData,
        uid: user.uid,
        validUser: true,
      };

      let response;
      try {
        response = await axios.post(
          "http://[::1]:3001/users",
          userDataForBackend,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
      } catch (error) {
        await deleteUser(user);
        const backendMessage =
          error.response?.data?.message || "Error al registrar en el backend";
        throw new Error(backendMessage);
      }

      const responseData = response.data;
      const newUserData = { ...userDataForBackend, ...responseData.user };
      setUser(user);
      setUserData(newUserData);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("userData", JSON.stringify(newUserData));

      navigate("/home");
      return { success: true, user: newUserData };
    } catch (error) {
      console.error("Error en el registro:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (formData, options = { showLoading: true }) => {
    try {
      if (options.showLoading) {
        setLoading(true);
      }

      const currentUser = auth.currentUser;
      if (!currentUser) throw new Error("Usuario no autenticado");

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
        identityCardFront: formData.identityCardFront?.url
          ? { url: formData.identityCardFront.url }
          : null,
        identityCardBack: formData.identityCardBack?.url
          ? { url: formData.identityCardBack.url }
          : null,
        backgroundCertificate: formData.backgroundCertificate?.url
          ? { url: formData.backgroundCertificate.url }
          : null,
        additionalCertificate: formData.additionalCertificate?.url
          ? { url: formData.additionalCertificate.url }
          : null,
        bankName: formData.bankName,
        accountType: formData.accountType,
        accountHolderName: formData.accountHolderName,
        accountNumber: Number(formData.accountNumber),
        siiActivitiesStarted: formData.siiActivitiesStarted,
      };

      const cleanedPayload = Object.fromEntries(
        Object.entries(payload).filter(
          ([_, value]) => value !== null && value !== undefined,
        ),
      );

      const response = await axios.patch(
        `http://[::1]:3001/users/${uid}`,
        cleanedPayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const responseData = response.data;
      setUserData(responseData.user);
      localStorage.setItem("userData", JSON.stringify(responseData.user));
      return { success: true, user: responseData.user };
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      throw error;
    } finally {
      if (options.showLoading) {
        setLoading(false);
      }
    }
  };

  if (!authChecked) {
    return <LoadingSpinner />;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        userData,
        login,
        register,
        logout,
        loading,
        fetchUserData,
        updateUser,
        authChecked,
        fetchReviews,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
