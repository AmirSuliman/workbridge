'use client';
import { signOut } from 'next-auth/react';
import { signOut as nextAuthSignOut } from 'next-auth/react';
import React from 'react';
import { CiLogout } from 'react-icons/ci';

declare global {
  interface Window {
    __REQUESTS__?: AbortController[];
  }
}

const Logout = () => {
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);

  const onLogout = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (isLoggingOut) return;

    setIsLoggingOut(true);

    try {
      // 1. Abort all ongoing fetch requests
      if (typeof window !== 'undefined' && window.__REQUESTS__) {
        const requests = [...window.__REQUESTS__];
        requests.forEach((controller) => {
          try {
            controller.abort();
          } catch (e) {
            console.warn('Failed to abort request:', e);
          }
        });
      }

      // 2. Handle NextAuth signout first
      await signOut({ redirect: false });
      await nextAuthSignOut({ redirect: false });

      // 3. Clear storage in a more production-friendly way
      if (typeof window !== 'undefined') {
        // Clear localStorage items related to auth only
        const authKeys = [
          'next-auth.session-token',
          'next-auth.callback-url',
          'next-auth.csrf-token',
        ];
        authKeys.forEach((key) => {
          try {
            localStorage.removeItem(key);
          } catch (e) {
            console.warn(`Failed to remove ${key} from localStorage:`, e);
          }
        });

        // A safer way to clear cookies (focus on auth-related cookies)
        const cookiesToClear = [
          'next-auth.session-token',
          '__Secure-next-auth.session-token',
          '__Host-next-auth.csrf-token',
        ];
        cookiesToClear.forEach((cookieName) => {
          document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; secure; samesite=strict`;
        });

        // If you're using a specific path other than root, also clear there
        cookiesToClear.forEach((cookieName) => {
          document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/api/auth; secure; samesite=strict`;
        });
      }

      // 4. Navigate to login page with a small delay to ensure cleanup completes
      setTimeout(() => {
        window.location.href = '/?logout=success';
      }, 100);
    } catch (error) {
      console.error('Logout error:', error);
      // Handle the error more gracefully
      setIsLoggingOut(false);

      // Only force navigation as a last resort
      setTimeout(() => {
        window.location.href = '/?logout=error';
      }, 100);
    }
  };

  // Keyboard accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      onLogout(e as unknown as React.MouseEvent<HTMLDivElement>);
    }
  };

  return (
    <div
      className='flex gap-4 items-center text-xs px-4 py-2 bg-white hover:bg-opacity-50 cursor-pointer'
      onClick={onLogout}
      onKeyDown={handleKeyDown}
      role='button'
      tabIndex={0}
      aria-label='Logout'
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
