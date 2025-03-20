import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, deleteUser } from "firebase/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
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
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedUserData = localStorage.getItem("userData");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      if (storedUserData) {
        setUserData(JSON.parse(storedUserData));
      } else {
        fetchUserData(JSON.parse(storedUser).uid);
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      await fetchUserData(user.uid);
      navigate("/home");
    } catch (error) {
      console.error("Error al iniciar sesión:", error.message);
      throw error;
    }
  };

  const register = async (email, password, userData) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));

      const token = await user.getIdToken();
      const response = await fetch("http://[::1]:3001/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...userData, uid: user.uid }),
      });

      if (!response.ok) {
        await deleteUser(user);
        throw new Error("Error al guardar los datos en el backend");
      }

      await fetchUserData(user.uid);
      navigate("/home");
    } catch (error) {
      console.error("Error en el registro:", error.message);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setUserData(null);
    localStorage.removeItem("user");
    localStorage.removeItem("userData");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, userData, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);