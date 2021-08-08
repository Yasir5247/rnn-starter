import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { View, Text, Button } from 'react-native-ui-lib';

import { AuthUserShops_authUserShops } from '../../requests/__generated__/AuthUserShops';

//components
import { ShopScroller } from './ShopScroller';

//services
import { useServices } from '../../services';

interface UserShopsProps {
  data: any;
  actions: {
    createShop: () => void;
    showUserShops: (userId: number) => void;
    showShop: (shopId: number, shopName: string) => void;
  };
}

export const UserShops: React.FC<UserShopsProps> = ({ data, actions }) => {
  //services
  const { nav, t } = useServices();

  return (
    <View padding-10>
      {data.length ? (
        data.map((shop: AuthUserShops_authUserShops) => (
          <ShopScroller key={shop.id} data={shop} actions={{ ...actions }} />
        ))
      ) : (
        <Button
          bg-bgColor
          br20
          black
          style={{ borderWidth: 2, borderColor: '#000' }}
          label={t.do('section.navigation.button.signUp')}
          onPress={() => actions.createShop()}
        />
      )}
      {data.length > 3 ? (
        <Button
          bg-bgColor
          br20
          black
          style={{ borderWidth: 2, borderColor: '#000' }}
          label={t.do('section.navigation.button.signUp')}
          onPress={() => actions.createShop()}
        />
      ) : null}
    </View>
  );
};
