import { Image } from '@telegram-apps/telegram-ui';
import React from 'react';

interface Props {
  user: any;
  bio: string;
  onBioChange: (value: string) => void;
  onBioBlur: () => void;
}

export const UserProfile: React.FC<Props> = ({ user, bio, onBioChange, onBioBlur }) => {
  // Моковые данные для разработки
  const mockUser = {
    photo_url: user.photo_url || '/src/assets/application.png', // путь к заглушке
    first_name: user.first_name || 'Иван',
    last_name: user.last_name || 'Иванов',
    username: user.username || 'ivanov'
  };

  const displayBio = bio || 'Расскажите о себе...';

  return (
    <div className='flex flex-col justify-center items-center mt-6 gap-2'>
      {/* Аватар с заглушкой */}
      {mockUser.photo_url ? (
        <Image
          src={mockUser.photo_url}
          className='rounded-full w-20 h-20'
        />
      ) : (
        <div className='rounded-full w-20 h-20 bg-gray-300 flex items-center justify-center'>
          <span className='text-gray-600 text-sm'>No photo</span>
        </div>
      )}

      {/* Имя с заглушкой */}
      <div className='text-lg font-medium'>
        {mockUser.first_name} {mockUser.last_name}
      </div>

      {/* Юзернейм с заглушкой */}
      {mockUser.username && (
        <div className='text-gray-300'>@{mockUser.username}</div>
      )}

      {/* Био с заглушкой */}
      <h1 className='text-xl text-center font-semibold'>{displayBio}</h1>

      <div className='mt-2 w-11/12'>
        <textarea
          placeholder="Напишите что-то о себе..."
          value={bio}
          onChange={(e) => onBioChange(e.target.value)}
          onBlur={onBioBlur}
          className='w-full min-h-20 p-3 rounded-xl border border-gray-300 text-sm resize-none focus:border-blue-500
          focus:outline-none transition-colors'
        />
      </div>
    </div>
  );
};