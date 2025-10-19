import { useEffect, useState } from 'react';
import { cloudStorage } from '@telegram-apps/sdk';
import { debounce } from '@/helpers/debounce';

export const useCloudBio = () => {
  const [bio, setBio] = useState('');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const load = async () => {
      if (!cloudStorage.isSupported()) {
        console.warn('CloudStorage not supported');
        setLoaded(true);
        return;
      }

      try {
        const value = await cloudStorage.getItem('bio');
        setBio(value || '');
      } catch (err) {
        console.error('Failed to load bio', err);
      }

      setLoaded(true);
    };

    load();
  }, []);

  const saveBio = async (value: string) => {
    if (!cloudStorage.isSupported()) return;
    try {
      await cloudStorage.setItem('bio', value);
    } catch (err) {
      console.error('Failed to save bio', err);
    }
  };

  const saveBioDebounced = debounce(saveBio, 500);

  return { bio, setBio, saveBio, saveBioDebounced, loaded };
};
