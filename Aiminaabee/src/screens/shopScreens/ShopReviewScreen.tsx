import React, { useState, useRef, useEffect } from 'react';
import { ActivityIndicator, RefreshControl } from 'react-native';
import { NavigationFunctionComponent } from 'react-native-navigation';
import { Navigation } from 'react-native-navigation';
import { View } from 'react-native-ui-lib';

import { RecyclerListView } from 'recyclerlistview';
import { dataProvider } from '../../utils/dataProvider';
import { LayoutUtil } from '../../utils/LayoutUtil';

//services
import { useServices } from '../../services';

//query
import { NetworkStatus } from '@apollo/client';
import { useQuery } from '@apollo/client';
import { SHOP_REVEWS } from '../../requests/reviews';

//components
import { EmptyScreen } from '../../components/comon/EmptyScreen';
import { ShopReviews } from '../../components/shop/shopReviews';

const LIMIT = 20;

export const ShopReviewScreen: NavigationFunctionComponent = ({
  componentId,
  shopId,
  screen,
}: any) => {
  //services
  const { nav, t } = useServices();

  // Get shop reviews
  const { loading, data, networkStatus, refetch, fetchMore } = useQuery(SHOP_REVEWS, {
    variables: { shopId: shopId, limit: LIMIT, offset: 0 },
    notifyOnNetworkStatusChange: true,
  });

  const dataProviderWithData = useRef(dataProvider);

  if (data && data.shopReviews) {
    dataProviderWithData.current = dataProviderWithData.current.cloneWithRows(data.shopReviews);
  }

  const [layoutProvider] = useState(LayoutUtil.getLayoutProvider(3));

  useEffect(() => {
    removeRightButtons();
    const unsubscribe = Navigation.events().registerNavigationButtonPressedListener(
      ({ buttonId }) => {
        if (buttonId == 'addshopReveiw') {
          nav.push(componentId, 'ShopReviewScreen', { shopId });
        }
      },
    );

    return () => {
      unsubscribe.remove();
    };
  }, [componentId, shopId]);

  const removeRightButtons = () => {
    if (screen === 'shopManagement') {
      Navigation.mergeOptions(componentId, {
        topBar: {
          rightButtons: [],
        },
      });
    }
  };

  const handleListEnd = () => {
    if (networkStatus !== NetworkStatus.fetchMore && dataProviderWithData.current.getSize()) {
      fetchMore({
        variables: {
          shopId: shopId,
          offset: dataProviderWithData.current.getSize(),
          limit: LIMIT,
        },
        updateQuery: (pqr, { fetchMoreResult }) => {
          if (!fetchMoreResult) {
            return pqr;
          }
          return {
            shopReviews: [...pqr.shopReviews, ...fetchMoreResult.shopReviews],
          };
        },
      });
    }
  };

  const rowRenderer = (type: any, data: any) => {
    return (
      <ShopReviews
        data={{
          reviewId: data.id,
          body: data.formattedBody,
          rating: data.rating,
          user: {
            userId: data.user.id,
            userName: data.user.name,
            userAvatar: data.user.avatar,
          },
          created_at: data.formattedData,
        }}
      />
    );
  };

  const _renderFooter = () => {
    return loading ? (
      <ActivityIndicator style={{ margin: 10 }} size="large" color={'black'} />
    ) : (
      <View style={{ height: 80 }} />
    );
  };

  return (
    <View flex-1 paddingH-5 bg-bgColor>
      {dataProviderWithData.current.getSize() ? (
        <RecyclerListView
          style={{ flex: 1 }}
          onEndReached={handleListEnd}
          dataProvider={dataProviderWithData.current}
          layoutProvider={layoutProvider}
          rowRenderer={rowRenderer}
          renderFooter={_renderFooter}
          showsVerticalScrollIndicator={false}
          forceNonDeterministicRendering={true}
          refreshControl={
            <RefreshControl
              refreshing={networkStatus === NetworkStatus.refetch}
              onRefresh={() => refetch({ offset: 0, limit: LIMIT })}
              colors={['#EA0000']}
              tintColor="#000"
              title="loading..."
              titleColor="#000"
              progressBackgroundColor="white"
            />
          }
        />
      ) : (
        <EmptyScreen title={'no reviews'} />
      )}
    </View>
  );
};

ShopReviewScreen.options = {
  bottomTabs: {
    visible: false,
    drawBehind: true,
  },
};
