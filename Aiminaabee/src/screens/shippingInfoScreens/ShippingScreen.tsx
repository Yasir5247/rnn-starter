import React, { useState, useRef } from 'react';
import { StyleSheet, ActivityIndicator, RefreshControl } from 'react-native';
import { View, Button } from 'react-native-ui-lib';
import { NavigationFunctionComponent } from 'react-native-navigation';

import { RecyclerListView } from 'recyclerlistview';
import { dataProvider } from '../../utils/dataProvider';
import { LayoutUtil } from '../../utils/LayoutUtil';

import { NetworkStatus } from '@apollo/client';
import { useQuery } from '@apollo/client';

//services
import { useServices } from '../../services';

//navigation
import { useNavigationButtonPress } from 'react-native-navigation-hooks/dist';

//components
import { ShippingAddressess } from '../../components/shipping/ShippingAdressCard';
import { EmptyScreen } from '../../components/comon/EmptyScreen';
import { BeeModal } from '../../components/comon/BeeModal';
import { ModalRow } from '../../components/comon/ModalRow';

//custom hooks
import {
  useRemoveShippingAdress,
  useSetDefaultShippingAdress,
} from '../../requests/mutations/shipping';
import { GET_SHIPPING_ADDRESS } from '../../requests/users';
import {
  GetShippingAdress,
  GetShippingAdressVariables,
  GetShippingAdress_getShippingAdress,
} from '../../requests/__generated__/GetShippingAdress';

export const ShippingScreen: NavigationFunctionComponent = ({ componentId, screen }: any) => {
  //services
  const { nav, t } = useServices();

  //state
  const [shippingId, setShippingId] = useState<number>();
  const [isDefault, setIsDefault] = useState<boolean>(false);
  const [layoutProvider] = useState(LayoutUtil.getLayoutProvider(11));

  const shippingAdressModalRef = useRef<any>();

  //custom hooks
  const { mutate: removeShippingAdress } = useRemoveShippingAdress();
  const { mutate: setDefaultShippingAdress } = useSetDefaultShippingAdress();

  //button press
  useNavigationButtonPress(
    () => nav.push(componentId, 'AddShippingAddress'),
    componentId,
    'addIcon',
  );

  const { loading, data, networkStatus, refetch } = useQuery<
    GetShippingAdress,
    GetShippingAdressVariables
  >(GET_SHIPPING_ADDRESS, {
    variables: { default: false },
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
  });

  const dataProviderWithData = useRef(dataProvider);

  if (data && data.getShippingAdress) {
    dataProviderWithData.current = dataProviderWithData.current.cloneWithRows(
      data.getShippingAdress,
    );
  }

  const _rowRenderer = (type: any, data: GetShippingAdress_getShippingAdress) => {
    return (
      <ShippingAddressess
        data={{
          shippingAdressId: data.id,
          houseName: data.houseName,
          streetName: data.streetName,
          appartment: data.appartment,
          floor: data.floor,
          island: data.island,
          phone: data.phone,
          zipCode: data.zipCode,
          isDefault: data.isDefault,
          screen: screen,
        }}
        actions={{
          onPressShippingRow: (shippingId: number, isDefault: boolean) => {
            shippingAdressModalRef.current.open();
            setShippingId(shippingId);
            setIsDefault(isDefault);
          },
        }}
      />
    );
  };

  const _deleteAddress = async (shippingId: number) => {
    await removeShippingAdress({ variables: { shippingAddressId: shippingId } });
  };

  const _makeDefaultLocation = async (shippingId: number) => {
    await setDefaultShippingAdress({ variables: { shippingAddressId: shippingId } });
  };

  const _renderFooter = () => {
    return loading ? (
      <ActivityIndicator style={{ margin: 10 }} size="large" color={'black'} />
    ) : (
      <View style={{ height: 80 }} />
    );
  };

  return (
    <View style={styles.container}>
      {dataProviderWithData.current.getSize() ? (
        <View style={{ flex: 1 }}>
          <RecyclerListView
            style={{ flex: 1 }}
            dataProvider={dataProviderWithData.current}
            layoutProvider={layoutProvider}
            rowRenderer={_rowRenderer}
            renderFooter={_renderFooter}
            showsVerticalScrollIndicator={false}
            forceNonDeterministicRendering={true}
            refreshControl={
              <RefreshControl
                refreshing={networkStatus === NetworkStatus.refetch}
                onRefresh={() => refetch()}
                colors={['#EA0000']}
                tintColor="#000"
                title="loading..."
                titleColor="#000"
                progressBackgroundColor="white"
              />
            }
          />
          {screen === 'shoppingCartScreen' ? (
            <View style={styles.reviewButtonBox}>
              <Button
                bg-btnBg
                br20
                label={t.do('section.appWideButtons.button.ReviewCart')}
                onPress={() => nav.push(componentId, 'CartReviewScreen')}
              />
            </View>
          ) : null}
        </View>
      ) : (
        <EmptyScreen title={'no shipping adress'} />
      )}
      <BeeModal heading={'Shipping Adress'} modalRef={shippingAdressModalRef} modalHeight={220}>
        <ModalRow
          data={{
            id: shippingId,
            icon: null,
            title: 'Make Default',
          }}
          actions={{
            onMenuPress: (shippingId: number) => {
              _makeDefaultLocation(shippingId);
              shippingAdressModalRef.current.close();
            },
          }}
        />
        <ModalRow
          data={{
            id: shippingId,
            icon: null,
            title: 'Delete',
          }}
          actions={{
            onMenuPress: (shippingId: number) => {
              _deleteAddress(shippingId);
              shippingAdressModalRef.current.close();
            },
          }}
        />
      </BeeModal>
    </View>
  );
};

ShippingScreen.options = {
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
  modal1: {
    height: 170,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  },
  reviewButtonBox: {
    height: 70,
    padding: 10,
    marginBottom: 20,
    borderTopWidth: 1,
    borderColor: '#f2f2f2',
  },
  reviewButton: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0062FF',
    padding: 10,
    borderRadius: 8,
    margin: 5,
  },
});
