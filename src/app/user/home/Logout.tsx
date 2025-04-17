'use client';
import React from 'react';
import { CiLogout } from 'react-icons/ci';
import { useRouter } from 'next/navigation';

declare global {
  interface Window {
    __REQUESTS__?: AbortController[];
  }
}

const Logout = () => {
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);
  const router = useRouter();

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

      // 2. Call the logout API endpoint to clear server-side state
      try {
        await fetch('/api/auth/logout', {
          method: 'POST',
          credentials: 'include',
        });
      } catch (error) {
        console.warn('Failed to call logout API:', error);
        // Continue with client-side logout even if API call fails
      }

      // 3. Clear client-side storage
      if (typeof window !== 'undefined') {
        // Clear accessToken from localStorage
        localStorage.removeItem('accessToken');

        // Clear accessToken cookie
        document.cookie =
          'accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; secure; samesite=strict';

        // Clear any other auth-related items you might have
        const authKeys = [
          'user',
          'userData',
          // Add any other keys your app uses
        ];

        authKeys.forEach((key) => {
          try {
            localStorage.removeItem(key);
          } catch (e) {
            console.warn(`Failed to remove ${key} from localStorage:`, e);
          }
        });
      }

      // 4. Navigate to login page with a small delay to ensure cleanup completes
      setTimeout(() => {
        window.location.href = '/sign-in?logout=success';
      }, 100);
    } catch (error) {
      console.error('Logout error:', error);
      // Handle the error more gracefully
      setIsLoggingOut(false);

      // Only force navigation as a last resort
      setTimeout(() => {
        window.location.href = '/sign-in?logout=error';
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
