import { Image } from '@telegram-apps/telegram-ui';
import React from 'react';

interface Props {
  user: any;
  bio: string;
  onBioChange: (value: string) => void;
  onBioBlur: () => void;
}

export const UserProfile: React.FC<Props> = ({ user, bio, onBioChange, onBioBlur }) => (
  <div className='flex flex-col justify-center items-center mt-6 gap-2'
  >
    {user.photo_url && (
      <Image
        src={user.photo_url}
        className='rounded-full w-20 h-20'
      />
    )}

    <div className='text-lg font-medium'>
      {user.first_name} {user.last_name ?? ''}
    </div>

    {user.username && (
      <div className='text-gray-300'>@{user.username}</div>
      )}

    <h1 className='text-xl text-center font-semibold'>{bio}</h1>

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
