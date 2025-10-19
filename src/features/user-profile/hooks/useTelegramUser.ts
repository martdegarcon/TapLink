import { useEffect, useState } from 'react';

export const useTelegramUser = () => {
  const [user, setUser] = useState<any | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const tg = (window as any)?.Telegram?.WebApp;

    if (!tg) {
      console.warn('Telegram WebApp not found');
      setReady(true);
      return;
    }

    tg.ready();
    const userData = tg.initDataUnsafe?.user ?? null;
    setUser(userData);
    setReady(true);
  }, []);

  return { user, ready };
};
