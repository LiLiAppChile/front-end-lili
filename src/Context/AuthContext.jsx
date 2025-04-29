import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { auth } from '../firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  deleteUser,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner';

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
      localStorage.removeItem('user');
      localStorage.removeItem('userData');

      if (location.pathname === '/home') {
        navigate('/login');
      }
      if (location.pathname === '/client/home') {
        navigate('/client/login');
      }

    } catch (error) {
      console.error('Error al cerrar sesión:', error);
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
            'Cache-Control': 'no-cache',
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

  const fetchClientData = useCallback(async (uid) => {
    try {
      const token = await auth.currentUser?.getIdToken();
      const response = await fetch(`http://[::1]:3001/clients/${uid}`, {
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


  const fetchReviews = useCallback(async () => {
    try {
      const currentUser = auth.currentUser;
      const uid = currentUser.uid;
      const token = await auth.currentUser?.getIdToken();

      const response = await axios.get(
        `http://[::1]:3001/reviews?professionalId=${uid}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Cache-Control': 'no-cache',
          },
        }
      );

      const data = response.data;

      console.log('Response de reseñas:', data);

      return data;
    } catch (error) {
      console.error('Error fetching reviews:', error);
      return [];
    }
  }, []);

  const updateProfile = useCallback(async (profileData) => {
    try {
      setLoading(true);
      const currentUser = auth.currentUser;
      if (!currentUser) throw new Error('Usuario no autenticado');

      const token = await currentUser.getIdToken(true);
      const cleanedPayload = Object.fromEntries(
        Object.entries(profileData).filter(
          ([_, value]) => value !== null && value !== undefined
        )
      );

      const response = await axios.patch(
        `http://[::1]:3001/users/${currentUser.uid}`,
        cleanedPayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedUser = response.data;
      setUserData((prev) => ({ ...prev, ...updatedUser }));
      localStorage.setItem('userData', JSON.stringify(updatedUser));
      return { success: true, user: updatedUser };
    } catch (error) {
      console.error('Error updating profile:', error);
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
          localStorage.setItem('user', JSON.stringify(firebaseUser));

          if (['/client/home', '/client/profile'].includes(location.pathname)) {
            const userData = await fetchClientData(firebaseUser.uid);
            return userData;
          }

          if (['/home', '/profile'].includes(location.pathname)) {
            const userData = await fetchUserData(firebaseUser.uid);
            return userData;
          }

          if (['/login', '/register'].includes(location.pathname)) {
            navigate('/home');
          }
          if (['client/login', '/client/register'].includes(location.pathname)) {
            navigate('/client/home');
          }

        } else {
          setUser(null);
          setUserData(null);
          localStorage.removeItem('user');
          localStorage.removeItem('userData');
        }
      } catch (error) {
        console.error("Error en el observer de autenticación:", error);

      } finally {
        setLoading(false);
        setAuthChecked(true);
      }
    });

    return () => unsubscribe();
  }, [navigate, isLoggingOut, location.pathname, fetchUserData, fetchClientData]);



  const login = async (email, password) => {
    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const userData = await fetchUserData(user.uid);
      navigate('/home');
      return userData;
    } catch (error) {
      console.error('Error al iniciar sesión:', error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const clientLogin = async (email, password) => {
    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userData = await fetchClientData(user.uid);
      navigate('/home/client');
      return userData;
    } catch (error) {
      console.error("Error al iniciar sesión:", error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Función de registro
  const register = async (email, password, userData) => {
    try {
      setLoading(true);

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const token = await user.getIdToken();

      const userDataForBackend = {
        ...userData,
        uid: user.uid,
        validUser: true,
      };

      await axios.post('http://[::1]:3001/users', userDataForBackend, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const MAX_ATTEMPTS = 3;
      const RETRY_DELAY = 300;
      let userDetails;
      let lastError;

      for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
        try {
          const { data } = await axios.get(
            `http://[::1]:3001/users/${user.uid}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          userDetails = data;
          break;
        } catch (err) {
          lastError = err;
          if (attempt < MAX_ATTEMPTS - 1) {
            await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
          }
        }
      }

      if (!userDetails) {
        throw (
          lastError || new Error('No se pudieron obtener los datos del usuario')
        );
      }

      setUser(user);
      setUserData(userDetails);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('userData', JSON.stringify(userDetails));

      navigate('/home');
      return { success: true, user: userDetails };
    } catch (err) {
      console.error('Error en el registro:', err);

      if (auth.currentUser) {
        try {
          await deleteUser(auth.currentUser);
        } catch (deleteErr) {
          console.error('Error al limpiar usuario:', deleteErr);
        }
      }

      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Función de registro para clientes
  const registerClient = async (email, password, userData) => {
    try {
      setLoading(true);

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const token = await user.getIdToken();

      const userDataForBackend = {
        ...userData,
        uid: user.uid,
        validUser: true,
      };

      await axios.post('http://[::1]:3001/clients', userDataForBackend, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const MAX_ATTEMPTS = 3;
      const RETRY_DELAY = 300;
      let userDetails;
      let lastError;

      for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
        try {
          const { data } = await axios.get(
            `http://[::1]:3001/clients/${user.uid}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          userDetails = data;
          break;
        } catch (err) {
          lastError = err;
          if (attempt < MAX_ATTEMPTS - 1) {
            await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
          }
        }
      }

      if (!userDetails) {
        throw (
          lastError || new Error('No se pudieron obtener los datos del usuario')
        );
      }

      setUser(user);
      setUserData(userDetails);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('userData', JSON.stringify(userDetails));

      navigate('/client/home');
      return { success: true, user: userDetails };
    } catch (err) {
      console.error('Error en el registro:', err);

      if (auth.currentUser) {
        try {
          await deleteUser(auth.currentUser);
        } catch (deleteErr) {
          console.error('Error al limpiar usuario:', deleteErr);
        }
      }

      throw err;
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
        formSubmitted:
          formData.formSubmitted !== undefined ? formData.formSubmitted : true,
      };

      const cleanedPayload = Object.fromEntries(
        Object.entries(payload).filter(
          ([_, value]) => value !== null && value !== undefined
        )
      );

      const response = await axios.patch(
        `http://[::1]:3001/users/${uid}`,
        cleanedPayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const responseData = response.data;
      setUserData(responseData.user);
      localStorage.setItem('userData', JSON.stringify(responseData.user));
      return { success: true, user: responseData.user };
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      throw error;
    } finally {
      if (options.showLoading) {
        setLoading(false);
      }
    }
  };

  // Función para obtener usuarios ligeros
  const fetchLightUsers = useCallback(async () => {
    try {
      const currentUser = auth.currentUser;
      const token = await currentUser?.getIdToken(true);

      const response = await axios.get(
        'http://[::1]:3001/users?role=professional&formSubmitted=true',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error('Error al obtener usuarios ligeros:', error);
      return [];
    }
  }, []);

  const fetchLightUsersAll = useCallback(async () => {
    try {
      const currentUser = auth.currentUser;
      const token = await currentUser?.getIdToken(true);

      const response = await axios.get('http://[::1]:3001/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error('Error al obtener usuarios ligeros:', error);
      return [];
    }
  }, []);

  const fetchSubmissions = useCallback(async () => {
    try {
      const currentUser = auth.currentUser;
      const token = await currentUser?.getIdToken(true);

      const response = await axios.get(
        'http://[::1]:3001/users?role=professional&formSubmitted=false',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error('Error al obtener postulaciones:', error);
      return [];
    }
  }, []);

  const fetchUserDetails = useCallback(async (uid) => {
    try {
      const token = await auth.currentUser?.getIdToken();
      const response = await fetch(`http://[::1]:3001/users/${uid}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Cache-Control': 'no-cache',
        },
      });

      if (!response.ok) {
        throw new Error('Error al obtener los datos del usuario');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching user details:', error);
      throw error;
    }
  }, []);

  const fetchUsersReviews = useCallback(async (uid) => {
    try {
      const token = await auth.currentUser?.getIdToken();
      const response = await axios.get(
        `http://[::1]:3001/reviews?professionalId=${uid}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Cache-Control': 'no-cache',
          },
        }
      );

      const data = response.data;

      console.log('Response de reseñas:', data);

      return data;
    } catch (error) {
      console.error('Error fetching reviews:', error);
      return [];
    }
  }, []);

  const updateUserStatus = useCallback(async (uid, status) => {
    try {
      const token = await auth.currentUser?.getIdToken();
      const response = await axios.patch(
        `http://[::1]:3001/users/${uid}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
          },
        }
      );

      console.log('Usuario actualizado:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error al actualizar el estado del usuario:', error);
      throw error;
    }
  }, []);

  const fetchOrders = async () => {
    try {
      const token = await auth.currentUser?.getIdToken();
      const response = await fetch('http://localhost:3001/pedidos', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error al obtener pedidos:', error);
      throw error;
    }
  };

  const fetchClientsOrders = async () => {
    try {
      const token = await auth.currentUser?.getIdToken();
      const email = auth.currentUser?.email;
      const response = await fetch('http://localhost:3001/pedidos', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const orders = await response.json()
      const ordersClient = orders.filter((order) => order.emailCliente === email);
      return await ordersClient;

    } catch (error) {
      console.error('Error al obtener pedidos:', error);
      throw error;
    }
  };


  // Función para aceptar un pedido
  const acceptOrder = async (order) => {
    try {
      const token = await auth.currentUser?.getIdToken();

      // Importante: Cambié la URL de "/accept" a "/tomar" para que coincida con el backend
      const response = await fetch(
        `http://localhost:3001/pedidos/${order.id || order._id}/tomar`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error al aceptar pedido:', error);
      throw error;
    }
  };

  // Función para rechazar un pedido
  const rejectOrder = async (order) => {
    try {
      const token = await auth.currentUser?.getIdToken();
      // Change from "/reject" to "/desmarcar" to match backend
      const response = await fetch(
        `http://localhost:3001/pedidos/${order.id || order._id}/desmarcar`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error al rechazar pedido:', error);
      throw error;
    }
  };

  if (!authChecked) {
    return <LoadingSpinner />;
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
      authChecked,
      fetchReviews,
      updateProfile,
      fetchSubmissions,
      fetchLightUsers,
      fetchLightUsersAll,
      fetchUserDetails,
      fetchUsersReviews,
      updateUserStatus,
      fetchOrders,
      acceptOrder,
      rejectOrder,
      registerClient,
      clientLogin,
      fetchClientData,
      fetchClientsOrders,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
