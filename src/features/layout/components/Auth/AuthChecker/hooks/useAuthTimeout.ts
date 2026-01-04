'use client';

import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const PUBLIC_ROUTES = ['/listOfDentists', '/services/dentalPlan', '/rules'];

function logout(router: ReturnType<typeof useRouter>) {
  Cookies.remove('token');
  Cookies.remove('tokenExpiresAt');
  Cookies.remove('user');
  Cookies.remove('phoneNumber');
  Cookies.remove('isLoggedIn');
  router.replace('/');
}

export function useAuthTimeout() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (PUBLIC_ROUTES.includes(pathname)) {
      return;
    }

    const token = Cookies.get('token');
    const expiresAt = Cookies.get('tokenExpiresAt');

    if (!token || !expiresAt) {
      logout(router);
      return;
    }

    const expiresAtTime = new Date(expiresAt).getTime();

    if (isNaN(expiresAtTime)) {
      logout(router);
      return;
    }

    const timeout = expiresAtTime - Date.now();

    if (timeout <= 0) {
      logout(router);
      return;
    }

    const timer = setTimeout(() => {
      logout(router);
    }, timeout);

    return () => clearTimeout(timer);
  }, [router, pathname]);
}
