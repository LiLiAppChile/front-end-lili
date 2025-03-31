import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const fetchUserData = async (uid) => {
    try {
      const token = await auth.currentUser?.getIdToken();
      const response = await fetch(`http://[::1]:3001/users/${uid}`, {
        headers: {
          Authorization: `Bearer ${token}`,
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
      throw error;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (isLoggingOut) return;
      
      if (user) {
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        try {
          const userData = await fetchUserData(user.uid);
          
          if (window.location.pathname === '/login') {
              navigate('/home');
          }
        } catch (error) {
          console.error("Error verificando estado de usuario:", error);
        }
      } else {
        setUser(null);
        setUserData(null);
        localStorage.removeItem("user");
        localStorage.removeItem("userData");
      }
      setLoading(false);
    });
  
    return () => unsubscribe();
  }, [navigate, isLoggingOut]);

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userData = await fetchUserData(user.uid);
      
      if (!userData?.validUser) {
        navigate('/home');
      } else {
        navigate('/home');
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error.message);
      throw error;
    }
  };

  const register = async (email, password, userData) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      const token = await user.getIdToken();
      const response = await fetch("http://[::1]:3001/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ 
          ...userData, 
          uid: user.uid,
          validUser: true
        }),
      });
  
      if (!response.ok) {
        await deleteUser(user);
        throw new Error("Error al guardar los datos en el backend");
      }
  
      setUser(user);
      setUserData({ ...userData, validUser: true });
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("userData", JSON.stringify({ ...userData, validUser: true }));
      
      return { success: true, user };
    } catch (error) {
      console.error("Error en el registro:", error.message);
      throw error;
    }
  };

  const logout = async () => {
    setIsLoggingOut(true);
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
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      userData, 
      login, 
      register, 
      logout, 
      loading,
      fetchUserData
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);