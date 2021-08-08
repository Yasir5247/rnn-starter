import _ from 'lodash';
import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Alert, TouchableWithoutFeedback } from 'react-native';
import Modal from 'react-native-modalbox';

import { shopRegisterMutations } from '../../localState/shopCreateTemp';

//Services
import { useServices } from '../../services';

//Navigation
import { useNavigationButtonPress } from 'react-native-navigation-hooks/dist';
import { NavigationFunctionComponent } from 'react-native-navigation';

//components
import UserDeliveryLocationSelection from '../../components/shopCreate/UserDeliveryLocationSelection';
import { IslandSelectionModal } from '../../components/islandSelection/IslandSelectionModal';

export const ShopDeliveryLocationScreen: NavigationFunctionComponent = ({ componentId }) => {
  //services
  const { nav, t } = useServices();

  const defaultText = 'Select Location';
  const [location, setLocation]: any = useState([]);

  const shopDeliveryLocationSelectModalRef: any = useRef(null);

  //local state
  const { updateShopTemp } = shopRegisterMutations;

  const Elert = (action: string) => {
    Alert.alert(action);
  };

  //button press
  useNavigationButtonPress(
    () => {
      if (location.length >= 1) {
        updateShopTemp({ deliveryLocations: location });
        nav.push(componentId, 'ShopReivewAndUploadScreen');
      } else {
        Elert('Choose a Delivery Location');
      }
    },
    componentId,
    'next',
  );

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <UserDeliveryLocationSelection
          selectedName={location[0]?.name ?? defaultText}
          onPressSelectedLocation={() => {
            shopDeliveryLocationSelectModalRef.current.open();
          }}
        />
        <UserDeliveryLocationSelection
          selectedName={location[1]?.name ?? defaultText}
          onPressSelectedLocation={() => {
            shopDeliveryLocationSelectModalRef.current.open();
          }}
        />
        <UserDeliveryLocationSelection
          selectedName={location[2]?.name ?? defaultText}
          onPressSelectedLocation={() => {
            shopDeliveryLocationSelectModalRef.current.open();
          }}
        />
        <TouchableWithoutFeedback onPress={() => setLocation([])}>
          <View style={styles.resetButton}>
            <Text>Reset</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>

      <Modal
        style={styles.modal}
        backdrop={true}
        useNativeDriver={false}
        backdropPressToClose={true}
        swipeArea={20}
        position={'bottom'}
        ref={shopDeliveryLocationSelectModalRef}>
        <IslandSelectionModal
          onIslandSelectionRow={(islandId: number, islandName: string) => {
            if (location.length == 0 || location.length >= 3) {
              setLocation([{ id: islandId, name: islandName }]);
              shopDeliveryLocationSelectModalRef.current.close();
            } else {
              location.map((x: any) => {
                if (x.id !== islandId) {
                  setLocation([...location, { id: islandId, name: islandName }]);
                  shopDeliveryLocationSelectModalRef.current.close();
                } else {
                  setLocation([...location]);
                }
              });
            }
          }}
        />
      </Modal>
    </View>
  );
};

ShopDeliveryLocationScreen.options = {
  topBar: {
    largeTitle: {
      visible: true,
    },
  },
  bottomTabs: {
    visible: false,
    drawBehind: true,
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 150,
    padding: 10,
  },
  resetButton: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    padding: 20,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
  },
  modal: {
    height: '70%',
    justifyContent: 'flex-start',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  headerText: {
    fontSize: 18,
    color: '#000',
  },
});
