import React, { useState, useRef } from 'react';
import { StyleSheet, ActivityIndicator, RefreshControl } from 'react-native';
import { View, Text, Button } from 'react-native-ui-lib';
import { NavigationFunctionComponent } from 'react-native-navigation';

import { Toast } from 'react-native-ui-lib';

//listView
import { RecyclerListView } from 'recyclerlistview';
import { dataProvider } from '../../utils/dataProvider';
import { LayoutUtil } from '../../utils/LayoutUtil';

//apollo
import { NetworkStatus, useQuery } from '@apollo/client';

//components
import { InventoryRow } from '../../components/shop/shopManagement/InventoryRow';
import { EmptyScreen } from '../../components/comon/EmptyScreen';

//queries
import { GET_INVENTORY } from '../../requests/shop';
import {
  GetShopInventory,
  GetShopInventoryVariables,
} from '../../requests/__generated__/GetShopInventory';

//custom hooks
import { useDeleteProduct } from '../../requests/mutations/product';

const LIMIT = 20;

export const ShopInventory: NavigationFunctionComponent = ({ componentId, shopId }: any) => {
  //custom hooks
  const { mutate: deleteProduct } = useDeleteProduct();

  //ref
  const inventoryProductSortModalRef = useRef<any>(null);
  const productEditModalRef = useRef<any>(null);

  //state
  const [selectedProductId, setSelectedProductId] = useState<number>();
  const [showToast, setShowToast] = useState<boolean>(false);
  const [layoutProvider, setLayoutProvider] = useState(LayoutUtil.getLayoutProvider(13));

  //main query
  const { loading, data, networkStatus, refetch, fetchMore } = useQuery<
    GetShopInventory,
    GetShopInventoryVariables
  >(GET_INVENTORY, {
    variables: { shopId: shopId, limit: LIMIT, offset: 0 },
    notifyOnNetworkStatusChange: true,
  });

  const dataProviderWithData = useRef(dataProvider);

  if (data && data.getShopInventory.success) {
    dataProviderWithData.current = dataProviderWithData.current.cloneWithRows(
      data.getShopInventory.products || [],
    );
  }

  const handleListEnd = () => {
    if (networkStatus !== NetworkStatus.fetchMore && dataProviderWithData.current.getSize()) {
      fetchMore({
        variables: {
          shopId: shopId,
          offset: dataProviderWithData.current.getSize(),
        },
      });
    }
  };

  const rowRenderer = (type: any, data: any) => {
    return (
      <InventoryRow
        key={data.id}
        data={{
          __typename: 'Product',
          id: data.id,
          name: data.formatedName,
          price: data.formatedPrice,
          stock: data.stock,
          defaultImage: data.defaultImage,
          formatedName: data.formatedName,
          formatedPrice: data.formatedPrice,
        }}
        actions={{
          onDeletePressed: (productId: number) => {
            setSelectedProductId(productId);
            productEditModalRef.current.open();
          },
        }}
      />
    );
  };

  const renderFooter = () => {
    return loading ? (
      <ActivityIndicator style={{ margin: 10 }} size="large" color={'black'} />
    ) : (
      <View style={{ height: 80 }} />
    );
  };

  return (
    <View style={styles.container}>
      {dataProviderWithData.current.getSize() ? (
        <RecyclerListView
          style={{ flex: 1 }}
          onEndReached={handleListEnd}
          dataProvider={dataProviderWithData.current}
          layoutProvider={layoutProvider}
          rowRenderer={rowRenderer}
          renderFooter={renderFooter}
          optimizeForInsertDeleteAnimations={true}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={networkStatus === NetworkStatus.refetch}
              onRefresh={() => refetch({ shopId: shopId, limit: LIMIT, offset: 0 })}
              colors={['#EA0000']}
              tintColor="#000"
              title="loading..."
              titleColor="#000"
              progressBackgroundColor="white"
            />
          }
        />
      ) : (
        <EmptyScreen title={'no products'} />
      )}
      <Toast
        visible={showToast}
        showDismiss={true}
        onDismiss={() => setShowToast(false)}
        position={'top'}
        backgroundColor={'#2C2F33'}
        message="Item Removed"
        autoDismiss={2000}
      />
    </View>
  );
};

ShopInventory.options = {
  bottomTabs: {
    visible: false,
    drawBehind: true,
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modal: {
    height: 200,
    justifyContent: 'flex-start',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modal1: {
    height: '70%',
    justifyContent: 'flex-start',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modal2: {
    height: 150,
    justifyContent: 'flex-start',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
