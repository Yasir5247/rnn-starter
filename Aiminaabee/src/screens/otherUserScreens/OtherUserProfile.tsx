import React, { useState, useRef } from 'react';
import { RefreshControl, ActivityIndicator, Dimensions } from 'react-native';
import { View, Text } from 'react-native-ui-lib';
import { NavigationFunctionComponent } from 'react-native-navigation';

import { RecyclerListView, LayoutProvider } from 'recyclerlistview';
import { dataProvider } from '../../utils/dataProvider';

//services
import { useServices } from '../../services';

//queries
import { NetworkStatus } from '@apollo/client';
import { useQuery } from '@apollo/client';
import { OTHER_USER, USER_LIKES } from '../../requests/users';
import { OtherUser, OtherUserVariables } from '../../requests/__generated__/OtherUser';
import { UserLikes, UserLikesVariables } from '../../requests/__generated__/UserLikes';

//components
import { EmptyScreen } from '../../components/comon/EmptyScreen';
import { ProductGrid } from '../../components/productView/GridComponent/ProductGrid';
import { SectionOne } from '../../components/otherUser/SectionOne';
import { SectionTwo } from '../../components/otherUser/SectionTwo';
import { SectionThree } from '../../components/otherUser/SectionThree';

//hooks
import { useToggleFollowUser } from '../../requests/mutations/user';

const LIMIT = 20;
let { width } = Dimensions.get('window');

export const OtherUserProfile: NavigationFunctionComponent = ({ componentId, userId }: any) => {
  //services
  const { nav, t } = useServices();

  //custom hooks
  const { mutate: followUser } = useToggleFollowUser();

  //refs
  const dataProviderWithData = useRef(dataProvider);

  //get user information
  const { loading: authUserLoading, data: otherUserData } = useQuery<OtherUser, OtherUserVariables>(
    OTHER_USER,
    {
      variables: { userId: userId },
    },
  );

  //get user liked products
  const { loading, data, networkStatus, refetch, fetchMore } = useQuery<
    UserLikes,
    UserLikesVariables
  >(USER_LIKES, {
    variables: { userId: userId, limit: LIMIT, offset: 0 },
    notifyOnNetworkStatusChange: true,
  });

  if (data && data.userLikes && otherUserData) {
    dataProviderWithData.current = dataProviderWithData.current.cloneWithRows([
      otherUserData.otherUser,
      ...data.userLikes,
    ]);
  }

  const getWindowWidth = () => Math.round(Dimensions.get('window').width * 1000) / 1000 - 1;

  const [layoutProvider] = useState(
    () =>
      new LayoutProvider(
        (i) => {
          return dataProviderWithData.current.getDataForIndex(i).__typename;
        },
        (type, dim) => {
          switch (type) {
            case 'User':
              dim.width = width;
              dim.height = 320;
              break;
            case 'Product':
              dim.width = getWindowWidth() / 3;
              dim.height = 130;
              break;
            default:
              dim.width = width;
              dim.height = 0;
          }
        },
      ),
  );

  const handleListEnd = () => {
    if (networkStatus !== NetworkStatus.fetchMore && dataProvider.getSize()) {
      fetchMore({
        variables: {
          userId: userId,
          limit: LIMIT,
          offset: dataProviderWithData.current.getSize(),
        },
        updateQuery: (pqr: any, { fetchMoreResult }) => {
          const oldValues = pqr?.userLikes || [];
          const newValues = fetchMoreResult?.userLikes || [];
          if (!fetchMoreResult) {
            return pqr;
          }
          return {
            userLikes: [...oldValues, ...newValues],
          };
        },
      });
    }
  };

  const rowRenderer = (type: any, data: any) => {
    switch (type) {
      case 'User':
        return (
          <View flex bg-bgColor>
            <SectionOne
              data={{
                userId: data.id,
                userName: data.name,
                userPicture: data.avatar,
              }}
              actions={{
                onPressUserImage: (avatar: string) =>
                  nav.push(componentId, 'LightBoxScreen', { images: [avatar] }),
              }}
            />
            <SectionTwo
              data={{
                userId: data.id,
                followersCount: data.followersCount,
                followingCount: data.followingCount,
                follShopsCount: data.followingShopsCount,
              }}
              actions={{
                showFollowers: (userId: number) =>
                  nav.push(componentId, 'FollowersScreen', { userId }),
                showFollowing: (userId: number) =>
                  nav.push(componentId, 'FollowingScreen', { userId }),
                showFollowingshops: (userId: number) =>
                  nav.push(componentId, 'FollowingShopScreen', { userId }),
              }}
            />
            <SectionThree
              data={{
                userId: data.id,
                userName: data.name,
                isFollowing: data.isFollowing,
                userConvId: data.conversationId,
                userLikesCount: data.userLikesCount,
              }}
              actions={{
                followUser: (userId: number, status: boolean) =>
                  followUser({ variables: { userId, status } }),
                showOwnedShops: (userId: number) =>
                  nav.push(componentId, 'UserOwnedShops', { userId }),
                onChatPressed: (userConvId: string, toId: number, toName: string) =>
                  nav.pushWithTitle(componentId, 'MsgUserUserScreen', toName, {
                    userConvId,
                    toUserId: toId,
                  }),
              }}
            />
          </View>
        );
      case 'Product':
        return (
          <ProductGrid
            data={{
              productId: data.id,
              productName: data.product_name,
              productImage: data.defaultImage,
            }}
            actions={{
              showProduct: (prodId: number, productName: string) =>
                nav.pushWithTitle(componentId, 'ProductDetailScreen', productName, {
                  prodId,
                }),
            }}
          />
        );
      default:
        return null;
    }
  };

  const _renderFooter = () => {
    return loading ? (
      <ActivityIndicator style={{ margin: 10 }} size="large" color={'black'} />
    ) : (
      <View style={{ height: 80 }} />
    );
  };

  if (loading) {
    return <ActivityIndicator style={{ margin: 10 }} size="large" color={'black'} />;
  }

  if (authUserLoading) {
    return <ActivityIndicator style={{ margin: 5 }} size="large" color={'black'} />;
  }

  return (
    <View flex-1 bg-bgColor>
      <RecyclerListView
        style={{ flex: 1 }}
        onEndReached={handleListEnd}
        dataProvider={dataProviderWithData.current}
        layoutProvider={layoutProvider}
        rowRenderer={rowRenderer}
        renderFooter={_renderFooter}
        // forceNonDeterministicRendering={true}
        refreshControl={
          <RefreshControl
            refreshing={networkStatus === NetworkStatus.refetch}
            onRefresh={() =>
              refetch({
                userId: userId,
                limit: LIMIT,
                offset: 0,
              })
            }
            colors={['#EA0000']}
            tintColor="#000"
            title="loading..."
            titleColor="#000"
            progressBackgroundColor="white"
          />
        }
      />
    </View>
  );
};

OtherUserProfile.options = {
  bottomTabs: {
    visible: false,
    drawBehind: true,
  },
};
