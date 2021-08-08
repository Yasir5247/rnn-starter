import React from 'react';
import { ScrollView, RefreshControl, ActivityIndicator } from 'react-native';
import { View } from 'react-native-ui-lib';

import { useQuery } from '@apollo/client';

import { Section } from '../../components/comon/Section';
import { ProfileSection } from '../../components/profile/ProfileSection';
import { UserStats } from '../../components/profile/UserStats';
import { UserBasicInfo } from '../../components/profile/BasicInfor';
import { UserShops } from '../../components/profile/UserShops';
import { ProfileMenuRow } from '../../components/profile/ProfileMenuRow';
import { ToggleThemeRow } from '../../components/profile/ToggleThemeRow';

//navigation
import { useNavigationButtonPress } from 'react-native-navigation-hooks/dist';
import { NavigationFunctionComponent } from 'react-native-navigation';

//types
import { AuthUser } from '../../requests/__generated__/AuthUser';
import { AuthUserShops, AuthUserShopsVariables } from '../../requests/__generated__/AuthUserShops';

//services
import { useServices } from '../../services';

//query
import { AUTH_USER, AUTH_USER_SHOPS } from '../../requests/users';

//stores
import { useStores } from '../../stores';

//icons
import { sharedIcon } from '../../utils/icons';

//custom hooks
import { useClearCache } from '../../hooks/useClearCache';

export const ProfileScreen: NavigationFunctionComponent = ({ componentId }) => {
  //custom hook
  const { clearCache } = useClearCache();

  //services
  const { nav, t } = useServices();
  const { ui } = useStores();

  //navigation buttons
  useNavigationButtonPress(() => nav.push(componentId, 'ShopNameScreen'), componentId, 'addIcon');

  const {
    loading: authUserLoading,
    data: authUserData,
    networkStatus: n1,
    refetch: rf1,
  } = useQuery<AuthUser>(AUTH_USER);

  const {
    loading: authUserShopsLoading,
    data: authUserShopData,
    networkStatus: n2,
    refetch: rf2,
  } = useQuery<AuthUserShops, AuthUserShopsVariables>(AUTH_USER_SHOPS, {
    variables: { offset: 0, limit: 20 },
  });

  if (authUserLoading) {
    return <ActivityIndicator style={{ margin: 5 }} size="large" color={'#000'} />;
  }

  if (authUserShopsLoading) {
    return <ActivityIndicator style={{ margin: 5 }} size="large" color={'#000'} />;
  }

  const userData = authUserData!.authUser;
  const userShops = authUserShopData?.authUserShops ?? [];

  return (
    <View flex bg-greyish>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => {
              // rf1();
              // rf2();
            }}
            colors={['#EA0000']}
            tintColor="#000"
            title="loading..."
            titleColor="#000"
            progressBackgroundColor="white"
          />
        }>
        <View flex bg-greyish>
          <Section>
            <View>
              <UserStats
                data={userData}
                actions={{
                  onPressUserImage: (avatar: string) =>
                    nav.push(componentId, 'FollowersScreen', {
                      images: [avatar],
                    }),
                  onPressFollowers: (userId: number) =>
                    nav.push(componentId, 'FollowersScreen', { userId }),
                  onPressFollowing: (userId: number) =>
                    nav.push(componentId, 'FollowingScreen', { userId }),
                  onPressFollowShops: (userId: number) =>
                    nav.push(componentId, 'FollowingShopScreen', {
                      userId,
                    }),
                }}
              />
              <UserBasicInfo data={userData} />
            </View>
          </Section>
          <UserShops
            data={userShops}
            actions={{
              showUserShops: (userId: number) => null,
              createShop: () => nav.push(componentId, 'ShopNameScreen'),
              showShop: (shopId: number, shopName: string) =>
                nav.pushWithTitle(componentId, 'ManageShopScreen', shopName, {
                  shopId,
                  shopName,
                }),
            }}
          />
          <ProfileSection>
            <ToggleThemeRow
              data={{
                userId: userData.id,
                selectedTheme: ui.themeMode,
                title: t.do('section.profile.letters.toggleTheme'),
                relatedIcon: sharedIcon('theme'),
              }}
              actions={{
                onPressUserMenu: () => ui.toggleThemeMode(),
              }}
            />
            <ProfileMenuRow
              data={{
                userId: userData.id,
                title: t.do('section.profile.letters.selectLanguage'),
                relatedIcon: sharedIcon('language'),
                number: false,
              }}
              actions={{
                onPressUserMenu: (userId: number) =>
                  nav.push(componentId, 'UserLikedScreen', { userId }),
              }}
            />
          </ProfileSection>
          <ProfileSection>
            <ProfileMenuRow
              data={{
                userId: userData.id,
                title: t.do('section.profile.letters.likes'),
                relatedIcon: sharedIcon('heart'),
                count: userData.userLikesCount || 0,
                number: true,
              }}
              actions={{
                onPressUserMenu: (userId: number) =>
                  nav.push(componentId, 'UserLikedScreen', { userId }),
              }}
            />
            <ProfileMenuRow
              data={{
                userId: userData.id,
                title: t.do('section.profile.letters.saves'),
                relatedIcon: sharedIcon('bookmark'),
                count: userData.userSavesCount || 0,
                number: true,
              }}
              actions={{
                onPressUserMenu: (userId: number) =>
                  nav.push(componentId, 'UserLikedScreen', { userId }),
              }}
            />
            <ProfileMenuRow
              data={{
                userId: userData.id,
                title: t.do('section.profile.letters.orders'),
                relatedIcon: sharedIcon('file'),
                count: userData.userSavesCount || 0,
                number: true,
              }}
              actions={{
                onPressUserMenu: (userId: number) =>
                  nav.push(componentId, 'UserOrderScreen', { userId }),
              }}
            />
            <ProfileMenuRow
              data={{
                userId: userData.id,
                title: t.do('section.profile.letters.friends'),
                relatedIcon: sharedIcon('users'),
                count: userData.userSavesCount || 0,
                number: true,
              }}
              actions={{
                onPressUserMenu: (userId: number) =>
                  nav.push(componentId, 'UserLikedScreen', { userId }),
              }}
            />
          </ProfileSection>
          {/* ----------------profile edit screens ----------------- */}
          <ProfileSection>
            <ProfileMenuRow
              data={{
                userId: userData.id,
                title: t.do('section.profile.letters.editProfile'),
                relatedIcon: sharedIcon('edit'),
                number: false,
              }}
              actions={{
                onPressUserMenu: (userId: number) =>
                  nav.push(componentId, 'ProfileEditScreen', { userId }),
              }}
            />
            <ProfileMenuRow
              data={{
                userId: userData.id,
                title: t.do('section.profile.letters.updateLocation'),
                relatedIcon: sharedIcon('location'),
                number: false,
              }}
              actions={{
                onPressUserMenu: (userId: number) =>
                  nav.push(componentId, 'UserLikedScreen', { userId }),
              }}
            />
            <ProfileMenuRow
              data={{
                userId: userData.id,
                title: t.do('section.profile.letters.shippingAdress'),
                relatedIcon: sharedIcon('adress'),
                count: userData.userLikesCount || 0,
                number: false,
              }}
              actions={{
                onPressUserMenu: (userId: number) =>
                  nav.push(componentId, 'ShippingScreen', { userId }),
              }}
            />
          </ProfileSection>
          {/* ----------------profile links ----------------- */}
          <ProfileSection>
            <ProfileMenuRow
              data={{
                userId: userData.id,
                title: t.do('section.profile.letters.termsOfUse'),
                relatedIcon: sharedIcon('book'),
                number: false,
              }}
              actions={{
                onPressUserMenu: (userId: number) =>
                  nav.push(componentId, 'UserLikedScreen', { userId }),
              }}
            />
            <ProfileMenuRow
              data={{
                userId: userData.id,
                title: t.do('section.profile.letters.communityG'),
                relatedIcon: sharedIcon('info'),
                number: false,
              }}
              actions={{
                onPressUserMenu: (userId: number) =>
                  nav.push(componentId, 'UserLikedScreen', { userId }),
              }}
            />
            <ProfileMenuRow
              data={{
                userId: userData.id,
                title: t.do('section.profile.letters.privacyP'),
                relatedIcon: sharedIcon('noteBook'),
                number: false,
              }}
              actions={{
                onPressUserMenu: (userId: number) =>
                  nav.push(componentId, 'UserLikedScreen', { userId }),
              }}
            />
          </ProfileSection>
          {/* ----------------logout ----------------- */}
          <ProfileSection>
            <ProfileMenuRow
              data={{
                userId: userData.id,
                title: t.do('section.appWideButtons.button.logout'),
                relatedIcon: sharedIcon('logout'),
                number: false,
              }}
              actions={{
                onPressUserMenu: async (userId: number) => {
                  //clear cache
                  clearCache();
                  // //switch navigate back
                  nav.start('auth_screen');
                },
              }}
            />
          </ProfileSection>
        </View>
      </ScrollView>
    </View>
  );
};
