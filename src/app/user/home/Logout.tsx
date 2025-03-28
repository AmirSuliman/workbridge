'use client';
import { signOut } from 'next-auth/react';
import React from 'react';
import { CiLogout } from 'react-icons/ci';

declare global {
  interface Window {
    __REQUESTS__?: AbortController[];
  }
}
const Logout = () => {
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);
  const abortControllerRef = React.useRef<AbortController | null>(null);

  const onLogout = async (e) => {
    e.preventDefault();
    if (isLoggingOut) return;

    setIsLoggingOut(true);
    abortControllerRef.current = new AbortController();

    try {
      // 1. Abort all ongoing fetch requests
      if (typeof window !== 'undefined') {
        // Abort any application-specific requests
        if (window.__REQUESTS__) {
          window.__REQUESTS__.forEach((req) => req.abort());
        }
      }

      // 2. Clear all auth tokens and storage
      localStorage.removeItem('next-auth.session-token');
      sessionStorage.clear();

      // Clear all cookies
      document.cookie.split(';').forEach((c) => {
        document.cookie = c
          .replace(/^ +/, '')
          .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
      });

      // 3. Sign out from Next-Auth
      await signOut({ redirect: false });

      // 4. Completely reset the application state
      if (typeof window !== 'undefined') {
        // This ensures no callbacks can interfere
        window.location.href = '/?logout=true';
        window.location.reload();
      }
    } catch (error) {
      console.error('Logout error:', error);
      // Force full reset on error
      window.location.href = '/?logout=true';
    } finally {
      setIsLoggingOut(false);
    }
  };

  React.useEffect(() => {
    return () => {
      // Cleanup abort controller on unmount
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return (
    <div
      className="flex gap-4 items-center text-xs px-4 py-2 bg-white hover:bg-opacity-50 cursor-pointer"
      onClick={onLogout}
      role="button"
      tabIndex={0}
      aria-label="Logout"
      style={{
        opacity: isLoggingOut ? 0.7 : 1,
        pointerEvents: isLoggingOut ? 'none' : 'auto',
      }}
    >
      <CiLogout /> {isLoggingOut ? 'Logging out...' : 'Logout'}
    </div>
  );
};

export default Logout;
