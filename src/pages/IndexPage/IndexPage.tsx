import { FC } from 'react';
import { Page } from '@/components/Page';
import { Cell, List } from '@telegram-apps/telegram-ui';
import { useTelegramUser } from './hooks/useTelegramUser';
import { useCloudBio } from './hooks/useCloudBio';
import { UserProfile } from './components/UserProfile';

export const IndexPage: FC = () => {
  const { user, ready } = useTelegramUser();
  const { bio, setBio, saveBio, saveBioDebounced, loaded } = useCloudBio();

  if (!ready || !loaded) {
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
        {user ? (
          <UserProfile
            user={user}
            bio={bio}
            onBioChange={(v) => {
              setBio(v);
              saveBioDebounced(v);
            }}
            onBioBlur={() => saveBio(bio)}
          />
        ) : (
          <Cell>No user data</Cell>
        )}
      </List>
    </Page>
  );
};
