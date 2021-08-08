import React, { useState, useRef, useEffect } from 'react';
import { ActivityIndicator, RefreshControl, ScrollView } from 'react-native';
import { View, Button, Text } from 'react-native-ui-lib';
import { NavigationFunctionComponent } from 'react-native-navigation';
import Modal from 'react-native-modalbox';

import { RecyclerListView } from 'recyclerlistview';
import { dataProvider } from '../../utils/dataProvider';
import { LayoutUtil } from '../../utils/LayoutUtil';

//services
import { useServices } from '../../services';

//navigation
import { useNavigationButtonPress } from 'react-native-navigation-hooks/dist';

//queries
import { NetworkStatus } from '@apollo/client';
import { useQuery } from '@apollo/client';
import { CATEGORY_FEED } from '../../requests/categoryFeed';

//components
import { CategoryGrid } from '../../components/productView/categoryGrid/CategoryGrid';
import { CategoryCard } from '../../components/productView/categoryGrid/CategoryCard';
import { EmptyScreen } from '../../components/comon/EmptyScreen';
import { FilterMenu } from '../../components/filterMenu/FilterMenu';
import { CatSortModal } from '../../components/category/CatSortModal';

import { categoryFilterMutions } from '../../localState/FilterCategoryTemp';

//custom hooks
import { useToggleLike, useToggleBookmark } from '../../requests/mutations/product';

const LIMIT = 20;

export const AllProductsInSubCatScreen: NavigationFunctionComponent = ({
  componentId,
  subCatId,
  subCatName,
}: any) => {
  //services
  const { nav, t } = useServices();

  //custom hooks
  const { mutate: toggleLike } = useToggleLike();
  const { mutate: toggleBookmark } = useToggleBookmark();

  //state
  const showCategoryProductSortModal: any = useRef(null);
  const [viewType, setViewType] = useState<number>(8);
  const [layoutProvider, setLayoutProvider] = useState(LayoutUtil.getLayoutProvider(viewType));

  //setting local state filters to currently selected category
  //products are re-fetched whenever filters state changes
  const [filters, setFilters] = useState({ categoryId: subCatId, categoryName: subCatName });

  const { categoryId, categoryName } = filters;

  //update local state
  const { clearCategoryTemp } = categoryFilterMutions;

  //redux store
  // const { filteredCategoryId } = useSelector((state) => state.filters);

  //query
  const { loading, data, networkStatus, refetch, fetchMore } = useQuery(CATEGORY_FEED, {
    variables: {
      catId: categoryId,
      limit: LIMIT,
      offset: 0,
      filterCat: categoryId,
    },
    notifyOnNetworkStatusChange: true,
  });

  const dataProviderWithData = useRef(dataProvider);

  if (data && data.categoryFeed) {
    dataProviderWithData.current = dataProviderWithData.current.cloneWithRows(data.categoryFeed);
  }

  // prettier-ignore
  useNavigationButtonPress(() => nav.push(componentId, 'DiscoverProductScreen'), componentId, 'search')

  useEffect(() => {
    return () => clearCategoryTemp();
  }, []);

  const _onEndReached = () => {
    if (networkStatus !== NetworkStatus.fetchMore && dataProviderWithData.current.getSize()) {
      fetchMore({
        variables: {
          catId: categoryId,
          filterCat: categoryId,
          offset: dataProviderWithData.current.getSize(),
        },
      });
    }
  };

  const _renderFooter = () => {
    return loading ? (
      <ActivityIndicator style={{ margin: 10 }} size="large" color={'black'} />
    ) : (
      <View style={{ height: 80 }} />
    );
  };

  const _rowRenderer = (type: any, data: any) => {
    if (viewType == 8) {
      return (
        <CategoryGrid
          data={{
            productId: data.id,
            productName: data.formatedName,
            productPrice: data.formatedPrice,
            productImage: data.defaultImage,
            categoryName: data.category.name,
            isBookmarked: data.isBookmarked,
            isLiked: data.isLiked,
          }}
          actions={{
            toggleLike: (productId, status) => toggleLike({ variables: { productId, status } }),
            toggleBookmark: (productId, status) =>
              toggleBookmark({ variables: { productId, status } }),
            showProduct: (prodId, prodName) =>
              nav.pushWithTitle(componentId, 'ProductDetailScreen', prodName, {
                prodId,
              }),
          }}
        />
      );
    } else {
      return (
        <CategoryCard
          data={{
            productId: data.id,
            productName: data.formatedName,
            productPrice: data.formatedPrice,
            productImage: data.defaultImage,
            categoryName: data.category.name,
            isBookmarked: data.isBookmarked,
            isLiked: data.isLiked,
          }}
          actions={{
            toggleLike: (productId, status) => toggleLike({ variables: { productId, status } }),
            toggleBookmark: (productId, status) =>
              toggleBookmark({ variables: { productId, status } }),
            showProduct: (prodId, productName) =>
              nav.pushWithTitle(componentId, 'ProductDetailScreen', productName, {
                prodId,
              }),
          }}
        />
      );
    }
  };

  return (
    <View flex-1 bg-bgColor>
      <View>
        <FilterMenu
          data={{
            categoryId: categoryId,
            categoryName: categoryName,
            viewType: viewType,
          }}
          actions={{
            onFileterButtonPress: () =>
              nav.pushWithFunc(componentId, 'FilterMenuScreen', {
                subCatId,
                subCatName,
                setFilters,
              }),
            onSortButtonPress: () => showCategoryProductSortModal.current.open(),
            viewChangePress: async (viewType: number) => {
              setLayoutProvider(LayoutUtil.getLayoutProvider(viewType));
              setViewType(viewType);
            },
          }}
        />
      </View>
      <View style={{ flex: 1 }}>
        {dataProviderWithData.current.getSize() ? (
          <RecyclerListView
            style={{ flex: 1 }}
            dataProvider={dataProviderWithData.current}
            onEndReached={_onEndReached}
            rowRenderer={_rowRenderer}
            layoutProvider={layoutProvider}
            renderFooter={_renderFooter}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={networkStatus === NetworkStatus.refetch}
                onRefresh={() => {
                  refetch({ catId: categoryId, offset: 0, limit: LIMIT });
                }}
                colors={['#EA0000']}
                tintColor="#000"
                title="loading..."
                titleColor="#000"
                progressBackgroundColor="white"
              />
            }
          />
        ) : (
          <EmptyScreen title={'no products in this category'} />
        )}
      </View>
      <Modal
        style={{
          height: 200,
          justifyContent: 'flex-start',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
        backdrop={true}
        useNativeDriver={false}
        backdropPressToClose={true}
        swipeArea={100}
        position={'bottom'}
        ref={showCategoryProductSortModal}>
        <CatSortModal
          actions={{
            handleSort: async (sort: any) => {
              // refetch({ sort: { order: sort } });
              showCategoryProductSortModal.current.close();
            },
          }}
        />
      </Modal>
    </View>
  );
};

AllProductsInSubCatScreen.options = {
  bottomTabs: {
    visible: false,
    drawBehind: true,
  },
};
