import React, { useState, useRef } from 'react';
import { ActivityIndicator, RefreshControl, Dimensions } from 'react-native';
import { NavigationFunctionComponent } from 'react-native-navigation';
import { View } from 'react-native-ui-lib';

//list view
import { RecyclerListView, LayoutProvider } from 'recyclerlistview';
import { dataProvider } from '../../utils/dataProvider';

//apollo
import { useQuery } from '@apollo/client';
import { NetworkStatus } from '@apollo/client';
import { GET_SINGLE_SHOP, GET_SHOP_PRODUCTS } from '../../requests/shop';

//navigation
import { useNavigationButtonPress } from 'react-native-navigation-hooks/dist';

//services
import { useServices } from '../../services';

//components
import { BeeModal } from '../../components/comon/BeeModal';
import { ModalRow } from '../../components/comon/ModalRow';
import { ShopDetails } from '../../components/shop/shopDetails';
import { ShopInfo } from '../../components/shop/shopInfo';
import { ShopButtons } from '../../components/shop/shopButtons';
import { ExploreFeedGrid } from '../../components/productView/ExploreFeedGrid/ExploreFeedGrid';

//custom hooks
import { useToggleFollowShop } from '../../requests/mutations/shop';
import { useToggleBookmark } from '../../requests/mutations/product';

let { width } = Dimensions.get('window');
const LIMIT = 10;

export const ShopScreen: NavigationFunctionComponent = ({ componentId, shopId }: any) => {
  //services
  const { nav, t } = useServices();

  //cutom hooks
  const { mutate: toggleFollowShop, loading: followLoading } = useToggleFollowShop();
  const { mutate: toggleBookmark } = useToggleBookmark();

  //ref
  const shopMenuRef = useRef<any>(null);
  const dataProviderWithData = useRef(dataProvider);

  const getWindowWidth = () => Math.round(width * 1000) / 1000 - 1;

  const [layoutProvider] = useState(
    () =>
      new LayoutProvider(
        (i) => {
          return dataProviderWithData.current.getDataForIndex(i).__typename;
        },
        (type, dim) => {
          switch (type) {
            case 'Shop':
              dim.width = getWindowWidth();
              dim.height = 270;
              break;
            case 'Product':
              dim.width = getWindowWidth() / 2 - 6;
              dim.height = 250;
              break;
            default:
              dim.width = width;
              dim.height = 0;
          }
        },
      ),
  );

  //navigation buttons
  useNavigationButtonPress(() => shopMenuRef.current.open(), componentId, 'menu');

  //get shop information query
  const { loading: shopLoading, data: shopInfo } = useQuery(GET_SINGLE_SHOP, {
    variables: { shopId },
  });

  //shop products query
  const { loading, data, networkStatus, refetch, fetchMore } = useQuery(GET_SHOP_PRODUCTS, {
    variables: { shopId, limit: LIMIT, offset: 0 },
    notifyOnNetworkStatusChange: true,
  });

  if (data && data.getShopProducts && shopInfo) {
    dataProviderWithData.current = dataProviderWithData.current.cloneWithRows([
      shopInfo.getSingleShop,
      ...data.getShopProducts,
    ]);
  }

  const handleListEnd = () => {
    if (networkStatus !== NetworkStatus.fetchMore && dataProviderWithData.current.getSize()) {
      fetchMore({
        variables: {
          shopId: shopId,
          offset: dataProviderWithData.current.getSize(),
        },
        updateQuery: (pqr, { fetchMoreResult }) => {
          if (!fetchMoreResult) {
            return pqr;
          }
          return {
            getShopProducts: [...pqr.getShopProducts, ...fetchMoreResult.getShopProducts],
          };
        },
      });
    }
  };

  const rowRenderer = (type: any, data: any) => {
    switch (type) {
      case 'Shop':
        return (
          <View flex-1 bg-bgColor>
            <ShopDetails
              data={{
                shopId: data.id,
                shopName: data.name,
                shopPicture: data.avatar,
                numShopProducts: data.numProducts,
                numShopFollowers: data.numFollowers,
                isShopFollowed: data.isShopFollowed,
                shopConvId: data.conversationId,
                isMyShop: data.isMyShop,
                loadingStatus: followLoading,
              }}
              actions={{
                toggleFollowShop: (shopId: number, status: any) =>
                  toggleFollowShop({ variables: { shopId, status } }),
                onPressShopFollowers: (shopId: number) =>
                  nav.push(componentId, 'ShopFollowerScreen', { shopId }),
                onChatPressed: () => null,
              }}
            />
            <ShopInfo
              data={{
                shopId: data.id,
                shopName: data.name,
                shopDesc: data.description,
                shopWebsite: data.website,
                shopContact: data.contact,
              }}
            />
            <ShopButtons
              data={{
                shopId: data.id,
                shopName: data.name,
                shopPicture: data.avatar,
                numShopProducts: data.numProducts,
                categoryId: data.categoryId,
              }}
              actions={{
                showShopMap: (shopId: number, shopName: string) =>
                  nav.push(componentId, 'MapScreen', { shopId, shopName }),
                showShopRelated: (shopCategoryId: number) =>
                  nav.push(componentId, 'RelatedShopScreen', { shopCategoryId }),
              }}
            />
          </View>
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
            }}
            actions={{
              toggleBookmark: (productId: number, status: any) =>
                toggleBookmark({ variables: { productId, status } }),
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

  if (shopLoading) {
    return <ActivityIndicator style={{ margin: 5 }} size="large" color={'black'} />;
  }

  return (
    <View flex-1 paddingH-5 bg-bgColor>
      <RecyclerListView
        style={{ flex: 1, margin: 5 }}
        onEndReached={handleListEnd}
        dataProvider={dataProviderWithData.current}
        layoutProvider={layoutProvider}
        rowRenderer={rowRenderer}
        onEndReachedThreshold={10}
        renderFooter={_renderFooter}
        showsVerticalScrollIndicator={false}
        forceNonDeterministicRendering={true}
        refreshControl={
          <RefreshControl
            refreshing={networkStatus === NetworkStatus.refetch}
            onRefresh={() => refetch({ shopId, offset: 0, limit: LIMIT })}
            colors={['#EA0000']}
            tintColor="#000"
            title="loading..."
            titleColor="#000"
            progressBackgroundColor="white"
          />
        }
      />
      <BeeModal modalRef={shopMenuRef} heading={'Shop Reviews'} modalHeight={150}>
        <ModalRow
          data={{
            icon: null,
            title: 'Shop Reviews',
          }}
          actions={{
            onMenuPress: () => {
              nav.push(componentId, 'ShopReviewScreen', { shopId });
              shopMenuRef.current.close();
            },
          }}
        />
      </BeeModal>
    </View>
  );
};

ShopScreen.options = {
  bottomTabs: {
    visible: false,
    drawBehind: true,
  },
};
