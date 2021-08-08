import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';

import { CardMenu } from '../boxMenu';
import { GetShippingAdress_getShippingAdress_island } from '../../requests/__generated__/GetShippingAdress';

interface HideContentTypes {
  data: {
    streetName: string;
    appartment: string | null;
    floor: string | null;
    island: string;
    atoll: string;
    phone: number;
    zipCode: string | null;
  };
}

const HideContent: React.FC<HideContentTypes> = ({ data }) => {
  return (
    <View>
      <CardMenu
        data={{
          control: 'middle',
          title: 'Street Name',
          isRight: true,
          valueRight: data.streetName || '',
        }}
        actions={{
          onPressMenu: () => null,
        }}
      />
      <CardMenu
        data={{
          control: 'middle',
          title: 'Appartment',
          isRight: true,
          valueRight: data.appartment || '-',
        }}
        actions={{
          onPressMenu: () => null,
        }}
      />
      <CardMenu
        data={{
          control: 'middle',
          title: 'Floor',
          isRight: true,
          valueRight: data.floor || '-',
        }}
        actions={{
          onPressMenu: () => null,
        }}
      />
      <CardMenu
        data={{
          control: 'middle',
          title: 'Island',
          isRight: true,
          valueRight: data.island || '',
        }}
        actions={{
          onPressMenu: () => null,
        }}
      />
      <CardMenu
        data={{
          control: 'middle',
          title: 'Atoll',
          isRight: true,
          valueRight: data.atoll || '',
        }}
        actions={{
          onPressMenu: () => null,
        }}
      />
      <CardMenu
        data={{
          control: 'middle',
          title: 'Phone',
          isRight: true,
          valueRight: data.phone || '',
        }}
        actions={{
          onPressMenu: () => null,
        }}
      />
      <CardMenu
        data={{
          control: 'middle',
          title: 'Zip Code',
          isRight: true,
          valueRight: data.zipCode || '-',
        }}
        actions={{
          onPressMenu: () => null,
        }}
      />
    </View>
  );
};

interface HideShopProps {
  data: {
    hideState: boolean;
  };
  actions: {
    onPressHandler: () => void;
  };
}

const HideShowRow: React.FC<HideShopProps> = ({ data, actions }) => {
  return (
    <TouchableWithoutFeedback onPress={() => actions.onPressHandler()}>
      <View style={styles.hideButtonStyle}>
        {data.hideState ? (
          <Text style={{ color: '#999' }}>hide</Text>
        ) : (
          <Text style={{ color: '#999' }}>show</Text>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

interface ShippingAdressTypes {
  data: {
    shippingAdressId: number;
    houseName: string;
    streetName: string;
    appartment: string | null;
    floor: string | null;
    island: GetShippingAdress_getShippingAdress_island;
    phone: number;
    zipCode: string | null;
    isDefault: boolean;
    screen: string;
  };
  actions: {
    onPressShippingRow: (shippingId: number, isDefault: boolean) => void;
  };
}

export const ShippingAddressess: React.FC<ShippingAdressTypes> = ({ data, actions }) => {
  //hid show state
  const [hide, setHide] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback
        onPress={() => actions.onPressShippingRow(data.shippingAdressId, data.isDefault)}>
        <View style={styles.innerContainer}>
          <CardMenu
            data={{
              control: 'middle',
              title: 'House Name',
              isRight: true,
              valueRight: data.houseName || '',
            }}
            actions={{
              onPressMenu: () => null,
            }}
          />
          <HideShowRow
            data={{
              hideState: hide,
            }}
            actions={{
              onPressHandler: () => setHide(!hide),
            }}
          />
          {!!hide && (
            <HideContent
              data={{
                streetName: data.streetName,
                appartment: data.appartment,
                floor: data.floor,
                island: data.island.name,
                atoll: data.island.atoll.name,
                phone: data.phone,
                zipCode: data.zipCode,
              }}
            />
          )}
          <CardMenu
            data={{
              control: 'customBottomView',
              title: 'Default Address',
              isTrue: data.isDefault,
            }}
            actions={{
              onPressMenu: () => null,
            }}
          />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  innerContainer: {
    padding: 15,
  },
  hideButtonStyle: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccc',
    padding: 15,
  },
});
