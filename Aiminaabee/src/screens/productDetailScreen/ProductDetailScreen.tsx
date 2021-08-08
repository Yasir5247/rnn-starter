import React, { useEffect, useState, useRef } from 'react';
import { ActivityIndicator, Dimensions, RefreshControl } from 'react-native';
import { Toast, View } from 'react-native-ui-lib';

//custom types
import { converPropTypes } from '../../components/productDetail/types';

//ListView
import { RecyclerListView, LayoutProvider } from 'recyclerlistview';
import { dataProvider } from '../../utils/dataProvider';

//custom hooks
import { useToggleLike, useToggleBookmark, useAddToLookup } from '../../requests/mutations/product';

//queries
import { useAddToCart } from '../../requests/mutations/shoppingCart';
import { useReportProduct } from '../../requests/mutations/productViolation';

//components
import { SingleProductCard } from '../../components/productDetail/SingleProductCard';
import { RelatedProdGrid } from '../../components/productView/RelatedProducts/RelatedProdGrid';
import { ProductReportViolationModal } from '../../components/productDetail/ProductReportViolationModal';
import { BeeModal } from '../../components/comon/BeeModal';

//navigation
import { NavigationFunctionComponent } from 'react-native-navigation';
import { useNavigationButtonPress } from 'react-native-navigation-hooks/dist';

//services
import { useServices } from '../../services';

//queries
import { useQuery, NetworkStatus } from '@apollo/client';
import { GET_PRODUCT_DETAIL } from '../../requests/product';

let { width } = Dimensions.get('window');
const LIMIT = 10;

export const ProductDetailScreen: NavigationFunctionComponent = ({ componentId, prodId }: any) => {
  //services
  const { nav, t } = useServices();

  //custom hooks
  const { mutate: addToCart } = useAddToCart();
  const { mutate: toggleLike } = useToggleLike();
  const { mutate: toggleBookmark } = useToggleBookmark();
  const { mutate: reportProduct } = useReportProduct();
  const { mutate: addToLookup } = useAddToLookup();

  //recycler list view
  const dataProviderWithData = useRef(dataProvider);

  //state
  const [showToast, setShowToast] = useState<boolean>(false);
  const productViolationModalRef = useRef<any>(null);

  //navigation buttons
  useNavigationButtonPress(() => productViolationModalRef.current.open(), componentId, 'menu');

  //add to under recently watched catelog
  useEffect(() => {
    addToLookup({ variables: { productId: prodId } });
  }, [componentId, prodId]);

  // product detail query
  const { loading, data, networkStatus, refetch, fetchMore } = useQuery(GET_PRODUCT_DETAIL, {
    fetchPolicy: 'network-only',
    // nextFetchPolicy: 'no-cache',
    variables: { productId: prodId, limit: LIMIT, offset: 0 },
  });

  if (data && data.productDetail) {
    dataProviderWithData.current = dataProviderWithData.current.cloneWithRows(data.productDetail);
  }

  const getWindowWidth = () => Math.round(Dimensions.get('window').width * 1000) / 1000 - 1;

  const [layoutProvider] = useState(
    () =>
      new LayoutProvider(
        (i) => {
          return dataProviderWithData.current.getDataForIndex(i).type;
        },
        (type, dim) => {
          switch (type) {
            case 'product':
              dim.width = width;
              dim.height = 980;
              break;
            case 'relatedProduct':
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

  const handleListEnd = () => {
    if (networkStatus !== NetworkStatus.fetchMore && dataProviderWithData.current.getSize()) {
      fetchMore({
        variables: {
          productId: prodId,
          limit: LIMIT,
          offset: dataProviderWithData.current.getSize(),
        },
        updateQuery: (pqr, { fetchMoreResult }) => {
          if (!fetchMoreResult) {
            return pqr;
          }
          return {
            productDetail: [...pqr.productDetail, ...fetchMoreResult.productDetail],
          };
        },
      });
    }
  };

  const _rowRenderer = (type: any, data: any) => {
    switch (type) {
      case 'product':
        return (
          <SingleProductCard
            id={data.id}
            prodData={data}
            actions={{
              toggleLike: (productId: number, status: any) =>
                toggleLike({ variables: { productId, status } }),
              toggleBookmark: (productId: number, status: any) =>
                toggleBookmark({ variables: { productId, status } }),
              addToCart: (productId: number) => addToCart({ variables: { productId } }),
              onPressProductImage: (images: any) =>
                nav.push(componentId, 'LightBoxScreen', { images }),
              onPressShop: (shopId: number, shopName: string) =>
                nav.pushWithTitle(componentId, 'ShopScreen', shopName, {
                  shopId,
                }),
              onPressDescription: (id: number) =>
                nav.push(componentId, 'ProductDescScreen', { id }),
              onPressComments: (id: number) =>
                nav.push(componentId, 'CommentScreen', { productId: id }),
              // prettier-ignore
              onChatPressed: ({ shopConvId, userId, shopId, image, name, screen }: converPropTypes) => {
                const shopArgs = { shopConvId, userId, shopId, image, name, screen };
                nav.pushWithTitle(componentId, 'MsgUserShopScreen', name, { shopArgs });
              },
            }}
          />
        );
      case 'relatedProduct':
        return (
          <RelatedProdGrid
            id={data.id}
            data={data}
            actions={
              {
                // showProduct: (prodId: number, prodName: string) =>
                //   nav.pushWithTitle(
                //     componentId,
                //     "ProductDetailScreen",
                //     prodName,
                //     {
                //       prodId,
                //     }
                //   ),
              }
            }
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

  return (
    <View flex-1 bg-bgColor>
      <RecyclerListView
        style={{ flex: 1 }}
        dataProvider={dataProviderWithData.current}
        // onEndReached={handleListEnd}
        rowRenderer={_rowRenderer}
        layoutProvider={layoutProvider}
        onEndReachedThreshold={0}
        enderFooter={_renderFooter}
        forceNonDeterministicRendering={true}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={networkStatus === NetworkStatus.refetch}
            onRefresh={() => refetch({ productId: prodId, limit: LIMIT, offset: 0 })}
            colors={['#EA0000']}
            tintColor="#000"
            title="loading..."
            titleColor="#000"
            progressBackgroundColor="white"
          />
        }
      />
      <BeeModal heading={'Report Product'} modalRef={productViolationModalRef} modalHeight={390}>
        <ProductReportViolationModal
          actions={{
            handleViolation: (violationId: number) => {
              reportProduct({ variables: { productId: prodId, violationId } });
              productViolationModalRef.current.close();
              setShowToast(true);
            },
          }}
        />
      </BeeModal>
      <Toast
        visible={showToast}
        showDismiss={true}
        onDismiss={() => setShowToast(false)}
        position={'top'}
        backgroundColor={'#2C2F33'}
        message="Product has been reported"
        autoDismiss={2000}
      />
    </View>
  );
};

ProductDetailScreen.options = {
  bottomTabs: {
    visible: false,
    drawBehind: true,
  },
};
