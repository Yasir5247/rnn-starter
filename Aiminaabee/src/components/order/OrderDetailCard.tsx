import React from 'react';
import { View } from 'react-native-ui-lib';

//components
import { CardMenu } from '../boxMenu';

interface OrderDetailCardProps {
  data: {
    subTotal: number | null;
    totalTaxPrice: number | null;
    totalPrice: number | null;
  };
}

export const OrderDetailCard: React.FC<OrderDetailCardProps> = ({ data }) => {
  return (
    <View marginV-10>
      <CardMenu
        data={{
          control: 'top',
          title: 'Sub Total',
          isRight: true,
          valueRight: `ރ. ${data.subTotal}`,
        }}
        actions={{
          onPressMenu: (id: number | undefined, name: string | undefined) => null,
        }}
      />
      <CardMenu
        data={{
          control: 'middle',
          title: 'Tax 6%',
          isRight: true,
          valueRight: `ރ. ${Number(data.totalTaxPrice)}`,
        }}
        actions={{
          onPressMenu: (id: number | undefined, name: string | undefined) => null,
        }}
      />
      <CardMenu
        data={{
          control: 'bottom',
          title: 'Tax 6%',
          isRight: true,
          valueRight: `ރ. ${data.totalPrice}`,
        }}
        actions={{
          onPressMenu: (id: number | undefined, name: string | undefined) => null,
        }}
      />
    </View>
  );
};
