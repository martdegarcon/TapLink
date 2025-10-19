import { FC } from 'react';
import { Page } from '@/components/layout/Page';
import { Cell, List } from '@telegram-apps/telegram-ui';
import { useTelegramUser } from '@/features/user-profile/hooks/useTelegramUser';
import { useCloudBio } from '@/features/user-profile/hooks/useCloudBio';
import { UserProfile } from '@/features/user-profile/ui/UserProfile';
import SkillsSection from '@/features/skills/ui/SkillsSection';

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
        <>
        {user ? (
          <UserProfile
            user={user}
            bio={bio}
            onBioChange={(v: string) => {
              setBio(v);
              saveBioDebounced(v);
            }}
            onBioBlur={() => saveBio(bio)}
          />
        ) : (
          <Cell>No user data</Cell>
        )}
              <SkillsSection />
        </>
      </List>
    </Page>
  );
};
