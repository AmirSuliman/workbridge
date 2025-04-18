// providers/AuthProvider.tsx
'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUserData } from '@/services/myInfo';
import { setUser } from '@/store/slices/myInfoSlice';
import { useRouter } from 'next/navigation';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const token = localStorage.getItem('accessToken');

        if (!token) {
          setLoading(false);
          return;
        }

        // Validate token and get user data
        try {
          const userData = await fetchUserData(token);
          dispatch(setUser(userData));
        } catch (error) {
          // Token invalid
          console.error('Invalid token:', error);
          // Clear invalid token
          localStorage.removeItem('accessToken');
          document.cookie =
            'accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
          router.replace('/sign-in');
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [dispatch, router]);

  return (
    <AuthContext.Provider value={{ loading }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
