import React from 'react';
import { View, Button } from 'react-native-ui-lib';

import { CardMenu } from '../boxMenu';

//services
import { useServices } from '../../services';

interface CartSummaryViewProps {
  data: {
    subTotal: number;
    totTaxPrice: number;
    totalPrice: number;
    screen?: string;
  };
  actions: {
    proceedHanlder: () => void;
  };
}

export const CartSummaryView: React.FC<CartSummaryViewProps> = ({ data, actions }) => {
  //services
  const { nav, t } = useServices();

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
          valueRight: `ރ. ${Number(data.totTaxPrice.toFixed(3))}`,
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
      {data.screen === 'shoppingCartScreen' ? (
        <View height={40} marginV-20>
          <Button
            bg-btnBg
            br20
            label={t.do('section.cart.button.proceed')}
            onPress={actions.proceedHanlder}
          />
        </View>
      ) : null}
    </View>
  );
};
