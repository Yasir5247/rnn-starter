import React, { useState, useRef, useEffect } from 'react';
import { RefreshControl, ActivityIndicator } from 'react-native';
import { View, Button, Text } from 'react-native-ui-lib';
import { NavigationFunctionComponent } from 'react-native-navigation';

import Modal from 'react-native-modalbox';

import { RecyclerListView } from 'recyclerlistview';
import { dataProvider } from '../../utils/dataProvider';
import { LayoutUtil } from '../../utils/LayoutUtil';

import { NetworkStatus } from '@apollo/client';
import { useQuery } from '@apollo/client';

import { SEARCH_SHOPS } from '../../requests/search';

//services
import { useServices } from '../../services';

//components
import { SearchBox } from '../../components/comon/SearchBox';

// import DiscoverShopsGrid from '../Components/DiscoverShopsGrid';
import { DiscoverShopView } from '../../components/productView/DiscoverShopView/DiscoverShopView';
import { FilterModalContent } from '../../components/discover/FilterModalContent';

//custom hooks
import { useToggleFollowShop } from '../../requests/mutations/shop';

const LIMIT = 10;

export const DiscoverShops: NavigationFunctionComponent = ({ componentId }) => {
  //services
  const { nav, t } = useServices();

  //custom hooks
  const { mutate: toggleFollowShop } = useToggleFollowShop();

  //state
  const shopFilterModelRef: any = useRef(null);
  const [query, setQuery] = useState<string>('');
  const [isVerified, setVerfied] = useState<boolean>(false);
  const [isLatest, setLatest] = useState<boolean>(false);
  //const [layoutProvider] = useState(LayoutUtil.getLayoutProvider(12));  grid layout
  const [layoutProvider] = useState(LayoutUtil.getLayoutProvider(15));

  //query
  const { loading, data, networkStatus, refetch, fetchMore } = useQuery(SEARCH_SHOPS, {
    variables: { limit: LIMIT, offset: 0 },
    notifyOnNetworkStatusChange: true,
  });

  const dataProviderWithData = useRef(dataProvider);

  if (data && data.searchShops.success) {
    dataProviderWithData.current = dataProviderWithData.current.cloneWithRows(
      data.searchShops.shops,
    );
  }

  // useNavigationButtonPress(shopFilterModelRef.current.open(), componentId, 'filterShops')

  const rowRenderer = (type: any, data: any) => {
    return (
      <DiscoverShopView
        data={{
          shopId: data.id,
          shopName: data.name,
          shopPicture: data.picture,
          isVerified: data.isVerified,
          isShopFollowed: data.isShopFollowed,
          numShopFollowers: data.numFollowers,
          shopPImages: data.shopPImages,
        }}
        actions={{
          toggleFollowShop: (shopId: number, status: any) =>
            toggleFollowShop({ variables: { shopId, status } }),
          showShop: (shopId: number, shopName: string) =>
            nav.pushWithTitle(componentId, 'ShopScreen', shopName, {
              shopId,
            }),
        }}
      />
    );
  };

  const onEndReached = () => {
    console.log('hey im called');
    if (networkStatus !== NetworkStatus.fetchMore && dataProviderWithData.current.getSize()) {
      fetchMore({
        variables: {
          offset: dataProviderWithData.current.getSize(),
        },
      });
    }
  };

  return (
    <View flex-1 bg-bgColor>
      <SearchBox
        data={{
          query: query,
          loadingStatus: loading,
          placeholder: 'search shops',
        }}
        actions={{
          searchQueryHandler: (query: string) => {
            setQuery(query);
            // refetch({ searchQuery: query });
          },
        }}
      />
      <RecyclerListView
        style={{ flex: 1 }}
        onEndReached={onEndReached}
        onEndReachedThreshold={10}
        dataProvider={dataProviderWithData.current}
        layoutProvider={layoutProvider}
        rowRenderer={rowRenderer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={networkStatus === NetworkStatus.refetch}
            onRefresh={() =>
              refetch({
                offset: 0,
                limit: LIMIT,
                // searchQuery: '',
                // sort: { order: 'DESC' },
                // filter: { verified: false },
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
      <Modal
        style={{
          height: 290,
          justifyContent: 'flex-start',
        }}
        backdrop={true}
        useNativeDriver={false}
        backdropPressToClose={true}
        swipeArea={100}
        position={'bottom'}
        ref={shopFilterModelRef}>
        <FilterModalContent
          data={{
            isVerified: isVerified,
            isLatest: isLatest,
          }}
          actions={{
            onPressFilterButton: (isVerified: boolean, isLatest: boolean) => {
              setVerfied(isVerified);
              setLatest(isLatest);
              refetch({
                // sort: { order: isLatest ? 'DESC' : 'ASC' },
                // filter: { verified: isVerified },
              });
              shopFilterModelRef.current.close();
            },
          }}
        />
      </Modal>
    </View>
  );
};

DiscoverShops.options = {
  bottomTabs: {
    visible: false,
    drawBehind: true,
  },
};
