import React, { useState, useRef } from 'react';
import { ActivityIndicator, RefreshControl, Dimensions } from 'react-native';
import { View } from 'react-native-ui-lib';

import { NavigationFunctionComponent } from 'react-native-navigation';
import { RecyclerListView, LayoutProvider } from 'recyclerlistview';
import { dataProvider } from '../../utils/dataProvider';
import { useQuery, NetworkStatus } from '@apollo/client';

//navigation
import {
  useNavigationButtonPress,
  useNavigationBottomTabSelect,
} from 'react-native-navigation-hooks/dist';

//services
import { useServices } from '../../services';

//custom hooks
import { useToggleBookmark } from '../../requests/mutations/product';

//Components
import { ExploreFeedGrid } from '../../components/productView/ExploreFeedGrid/ExploreFeedGrid';
import { CategoryDisplay } from '../../components/productView/InstaCategoryStyle/CategoryDisplay';
import { NearShopScroller } from '../../components/productView/nearShopScreens/NearShopScroller';

import { GET_EXPLORE_FEED } from '../../requests/exploreFeed';
import { NEAR_SHOPS_FEED } from '../../requests/magicFeed';

let { width } = Dimensions.get('window');
const LIMIT = 30;

export const ExploreScreen: NavigationFunctionComponent = ({ componentId }) => {
  //custom hooks
  const { mutate: toggleBookmark } = useToggleBookmark();

  //services
  const { nav, t } = useServices();

  //refs
  const listViewRef: any = useRef();
  const dataProviderWithData: any = useRef(dataProvider);

  //set dimention for android
  const getWindowWidth = () => Math.round(Dimensions.get('window').width * 1000) / 1000 - 1;

  //scroll to top function
  const scrollToTop = () => listViewRef.current?.scrollToOffset(0, 0, true);

  //state
  const [layoutProvider] = useState(
    () =>
      new LayoutProvider(
        (i) => {
          return dataProviderWithData.current.getDataForIndex(i).__typename;
        },
        (type, dim) => {
          switch (type) {
            case 'NearShop':
              dim.width = getWindowWidth();
              dim.height = 240;
              break;
            case 'Category':
              dim.width = width;
              dim.height = 470;
              break;
            case 'Product':
              dim.width = getWindowWidth() / 2 - 6;
              dim.height = 260;
              break;
            default:
              dim.width = width;
              dim.height = 0;
          }
        },
      ),
  );

  //navigation buttons
  useNavigationButtonPress(() => nav.push(componentId, 'DiscoverPeepScreen'), componentId, 'users');
  useNavigationButtonPress(() => nav.push(componentId, 'DiscoverShopScreen'), componentId, 'shops');
  useNavigationBottomTabSelect(() => scrollToTop());

  const { loading, data, networkStatus, refetch, fetchMore } = useQuery(GET_EXPLORE_FEED, {
    variables: { offset: 0, limit: LIMIT },
    notifyOnNetworkStatusChange: true,
  });

  // prettier-ignore
  const { loading: loadingNearShops, data: nearShopsData, refetch: rf2 } = useQuery(NEAR_SHOPS_FEED);

  if (data && data?.exploreFeed && nearShopsData?.nearShopFeed) {
    const DataMix = data.exploreFeed.map((x: any, i: any) => {
      if (i === 0) {
        return {
          __typename: 'NearShop',
          data: [...nearShopsData?.nearShopFeed],
        };
      }
      return {
        ...x,
      };
    });

    dataProviderWithData.current = dataProviderWithData.current.cloneWithRows(DataMix);
  }

  const _onEndReached = useRef(() => {});

  _onEndReached.current = () => {
    if (networkStatus !== NetworkStatus.fetchMore && dataProviderWithData.current.getSize()) {
      fetchMore({
        variables: {
          offset: dataProviderWithData.current.getSize(),
        },
      });
    }
  };

  const _rowRenderer = (type: any, data: any) => {
    switch (type) {
      case 'NearShop':
        return (
          <NearShopScroller
            data={data?.data ?? []}
            actions={
              {
                // onShopPress: (shopId: number, shopName: string) =>
                //   nav.pushWithTitle(
                //     componentId,
                //     'ShopScreen',
                //     shopName,
                //     {
                //       shopId,
                //       shopName
                //     }
                //   )
              }
            }
          />
        );
      case 'Category':
        return (
          <CategoryDisplay
            key={data.id}
            data={data}
            actions={{
              onCatPress: (catId: number, catName: string) =>
                nav.pushWithTitle(componentId, 'CategorySummaryScreen', catName, {
                  catId,
                  catName,
                }),
            }}
          />
        );
      case 'Product':
        return (
          <ExploreFeedGrid
            key={data.id}
            data={{
              product: {
                productId: data.id,
                productName: data.formatedName,
                productPrice: data.formatedPrice,
                productImage: data.defaultImage,
                isBookmarked: data.isBookmarked,
              },
              shop: {
                shopId: data.shop.id,
                shopName: data.shop.formatedShopName,
                shopAvatar: data.shop.avatar,
              },
            }}
            actions={{
              toggleBookmark: (productId: number, status: any) =>
                toggleBookmark({ variables: { productId, status } }),
              showProduct: (prodId: number, prodName: string) => {
                nav.pushWithTitle(componentId, 'ProductDetailScreen', prodName, {
                  prodId,
                });
              },
            }}
          />
        );
      default:
        return null;
    }
  };

  const _renderFooter = () => {
    return loading ? (
      <View center style={{ height: 50 }}>
        <ActivityIndicator style={{ margin: 5 }} size="large" color={'black'} />
      </View>
    ) : null;
  };

  if (loadingNearShops) {
    return <ActivityIndicator style={{ margin: 5 }} size="large" color={'black'} />;
  }

  return (
    <View flex bg-bgColor paddingH-10>
      <RecyclerListView
        ref={listViewRef}
        style={{ flex: 1 }}
        dataProvider={dataProviderWithData?.current ?? []}
        onEndReached={() => _onEndReached.current()}
        layoutProvider={layoutProvider}
        rowRenderer={_rowRenderer}
        onEndReachedThreshold={10}
        renderFooter={_renderFooter}
        forceNonDeterministicRendering={true}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={networkStatus === NetworkStatus.refetch}
            onRefresh={() => {
              refetch({ offset: 0, limit: LIMIT });
              rf2();
            }}
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
