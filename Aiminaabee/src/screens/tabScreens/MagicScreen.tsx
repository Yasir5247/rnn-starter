import React, { useState, useRef } from 'react';
import { ActivityIndicator, RefreshControl, Dimensions } from 'react-native';
import { View, Button, Text } from 'react-native-ui-lib';
import { NavigationFunctionComponent } from 'react-native-navigation';

import { RecyclerListView, LayoutProvider } from 'recyclerlistview';
import { dataProvider } from '../../utils/dataProvider';

//apollo
import { useQuery } from '@apollo/client';
import { NetworkStatus } from '@apollo/client';

//custom hooks
import { useToggleBookmark } from '../../requests/mutations/product';

//components
import { ExploreFeedGrid } from '../../components/productView/ExploreFeedGrid/ExploreFeedGrid';
import { CategoryScroller } from '../../components/productView/ExploreScreenCatScroller/CategoryScroller';
import { CategoryDisplay } from '../../components/productView/InstaCategoryStyle/CategoryDisplay';
import { ShopFollower } from '../../components/productView/ShopFollower/ShopFollower';

//navigation
import {
  useNavigationButtonPress,
  useNavigationBottomTabSelect,
} from 'react-native-navigation-hooks/dist';

//services
import { useServices } from '../../services';

//queries
import { MainCategories } from '../../requests/__generated__/MainCategories';
import { GET_MAIN_CATEGORIES } from '../../requests/categories';
import { MagicFeed } from '../../requests/__generated__/MagicFeed';
import { GET_MAGIC_FEED } from '../../requests/magicFeed';

let { width } = Dimensions.get('window');
const LIMIT = 30;

export const MagicScreen: NavigationFunctionComponent = ({ componentId }) => {
  //custom hooks
  const { mutate: toggleBookmark } = useToggleBookmark();

  //state
  const dataProviderWithData = useRef(dataProvider);

  //services
  const { nav, t } = useServices();

  //Ref
  const listViewRef: any = useRef();

  //prcision for android
  const getWindowWidth = () => Math.round(Dimensions.get('window').width * 1000) / 1000 - 1;

  //scroll to top function
  const scrollToTop = () => listViewRef.current?.scrollToOffset(0, 0, true);

  //layout provider
  const [layoutProvider] = useState(
    () =>
      new LayoutProvider(
        (i) => {
          return dataProviderWithData.current.getDataForIndex(i).__typename;
        },
        (type, dim) => {
          switch (type) {
            case 'MainCategories':
              dim.width = getWindowWidth();
              dim.height = 90;
              break;
            case 'ShopFollower':
              dim.width = width;
              dim.height = 400;
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

  //navigation
  useNavigationButtonPress(() => nav.push(componentId, 'MessageScreen'), componentId, 'message');

  // prettier-ignore
  useNavigationButtonPress(() => nav.push(componentId, "DiscoverProductScreen"), componentId, 'search')
  useNavigationBottomTabSelect(() => scrollToTop());

  const { loading, data, networkStatus, refetch, fetchMore } = useQuery<MagicFeed>(GET_MAGIC_FEED, {
    variables: { offset: 0, limit: LIMIT },
    notifyOnNetworkStatusChange: true,
  });

  const {
    loading: catLoading,
    data: mainCatData,
    refetch: rf2,
  } = useQuery<MainCategories>(GET_MAIN_CATEGORIES);

  if (data && data?.magicFeed && mainCatData?.mainCategories.length) {
    const DataMix = data.magicFeed.map((x: any, i: any) => {
      if (i === 0) {
        return {
          __typename: 'MainCategories',
          data: [...mainCatData?.mainCategories],
        };
      }
      if (i === 5) {
        return {
          __typename: 'ShopFollower',
        };
      }
      return {
        ...x,
      };
    });

    dataProviderWithData.current = dataProviderWithData.current.cloneWithRows(DataMix);
  }

  const _onEndReached = () => {
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
      case 'MainCategories':
        return (
          <CategoryScroller
            key={data.id}
            data={data?.data ?? []}
            actions={{
              showCatScreen: (catId: number, categoryName: string, subCats: any) =>
                nav.pushWithTitle(componentId, 'AllProductsInCatScreen', categoryName, {
                  catId,
                  subCats,
                }),
            }}
          />
        );
      case 'ShopFollower':
        return (
          <ShopFollower
            actions={{
              onShopPress: (shopId: number, shopName: string) =>
                nav.pushWithTitle(componentId, 'ShopScreen', shopName, {
                  shopId,
                  shopName,
                }),
            }}
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
              toggleBookmark: (productId: number, status: boolean) =>
                toggleBookmark({ variables: { productId, status } }),
              showProduct: (prodId: number, prodName: string) =>
                nav.push(componentId, 'ProductDetailScreen', {
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
      <View center style={{ height: 50 }}>
        <ActivityIndicator style={{ margin: 5 }} size="large" color={'black'} />
      </View>
    ) : null;
  };

  if (catLoading) {
    return <ActivityIndicator style={{ margin: 5 }} size="large" color={'black'} />;
  }

  return (
    <View flex bg-bgColor paddingH-10>
      <RecyclerListView
        style={{ flex: 1 }}
        ref={listViewRef}
        dataProvider={dataProviderWithData?.current ?? []}
        onEndReached={_onEndReached}
        rowRenderer={_rowRenderer}
        layoutProvider={layoutProvider}
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
