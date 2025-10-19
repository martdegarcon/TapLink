import { Image } from '@telegram-apps/telegram-ui';
import React from 'react';

interface Props {
  user: any;
  bio: string;
  onBioChange: (value: string) => void;
  onBioBlur: () => void;
}

export const UserProfile: React.FC<Props> = ({ user, bio, onBioChange, onBioBlur }) => (
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
    {user.photo_url && (
      <Image
        src={user.photo_url}
        style={{ borderRadius: '50%', width: 80, height: 80 }}
      />
    )}
    <div>{user.first_name} {user.last_name ?? ''}</div>
    {user.username && <div>@{user.username}</div>}

    <h1 style={{ marginTop: 8, fontSize: 20, textAlign: 'center' }}>{bio}</h1>

    <div style={{ marginTop: 24, width: '90%' }}>
      <textarea
        placeholder="Напишите что-то о себе..."
        value={bio}
        onChange={(e) => onBioChange(e.target.value)}
        onBlur={onBioBlur}
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
  </div>
);
