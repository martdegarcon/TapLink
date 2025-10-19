import { Cell, Image, List } from '@telegram-apps/telegram-ui';
import type { FC } from 'react';
import { Page } from '@/components/Page.tsx';
import { useState, useEffect } from 'react';
import { cloudStorage } from '@telegram-apps/sdk';

// debounce функция для браузера
function debounce(fn: (...args: any[]) => void, ms: number) {
  let timer: number;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = window.setTimeout(() => fn(...args), ms);
  };
}

export const IndexPage: FC = () => {
  const [user, setUser] = useState<any | null>(null);
  const [ready, setReady] = useState(false);
  const [bio, setBio] = useState<string>('');

  useEffect(() => {
    const tg = (window as any)?.Telegram?.WebApp;
    if (!tg) {
      console.warn('Telegram WebApp object is not available');
      setReady(true);
      return;
    }

    tg.ready();

    const init = async () => {
      const userData = tg.initDataUnsafe?.user ?? null;
      setUser(userData);

      // проверяем поддержку cloudStorage
      if (cloudStorage.isSupported()) {
        try {
          const values = await cloudStorage.getItem('bio');
          setBio(values || '');
        } catch (err) {
          console.error('Failed to load bio from cloudStorage', err);
        }
      }

      setReady(true);
    };

    init();
  }, []);

  const saveBio = async (value: string) => {
    if (!cloudStorage.isSupported()) return;
    try {
      await cloudStorage.setItem('bio', value);
    } catch (err) {
      console.error('Failed to save bio to cloudStorage', err);
    }
  };

  const saveBioDebounced = debounce(saveBio, 500);

  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setBio(value); // отображаем мгновенно
    saveBioDebounced(value); // сохраняем в cloudStorage с задержкой
  };

  if (!ready) {
    return (
      <Page back={false}>
        <List>
          <Cell>Loading...</Cell>
        </List>
      </Page>
    );
  }

  return (
    <Page back={false}>
      <List>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 24,
            gap: 16,
          }}
        >
          {user ? (
            <>
              {user.photo_url && (
                <Image
                  src={user.photo_url}
                  style={{ borderRadius: '50%', width: 80, height: 80 }}
                />
              )}
              <div>{user.first_name} {user.last_name ?? ''}</div>
              {user.username && <div>@{user.username}</div>}

              {/* отображаем bio */}
              <h1 style={{ marginTop: 8, fontSize: 20, textAlign: 'center' }}>{bio}</h1>

              {/* textarea */}
              <div style={{ marginTop: 24, width: '90%' }}>
                <textarea
                  placeholder="Напишите что-то о себе..."
                  value={bio}
                  onChange={handleBioChange}
                  onBlur={() => saveBio(bio)} // финальное сохранение при уходе с поля
                  style={{
                    width: '100%',
                    minHeight: 80,
                    padding: 12,
                    borderRadius: 12,
                    border: '1px solid #ccc',
                    fontSize: 14,
                    resize: 'none',
                  }}
                />
              </div>
            </>
          ) : (
            <div>No User Data Available</div>
          )}
        </div>
      </List>
    </Page>
  );
};
