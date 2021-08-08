import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { Button, View, Text } from 'react-native-ui-lib';

import { ImageLoader } from '../comon/ImageLoader';

import { useServices } from '../../services';

import Icon from 'react-native-vector-icons/Octicons';
const verifiedIcon = <Icon name="verified" size={25} color="blue" />;

interface RelatedShopsGridProps {
  data: {
    shopId: number;
    shopName: string;
    shopPicture: string;
    isShopVerified: boolean;
    isShopFollowed: boolean;
  };
  actions: {
    showShop: (shopId: number, shopName: string) => void;
    followShop: () => void;
  };
}

export const RelatedShopsGrid: React.FC<RelatedShopsGridProps> = ({ data, actions }) => {
  //services
  const { nav, t } = useServices();

  return (
    <TouchableWithoutFeedback onPress={() => actions.showShop(data.shopId, data.shopName)}>
      <View flex-1 bg-bgColor>
        <View flex-1 bg-bgColor margin-10>
          <View flex-1 center>
            <ImageLoader
              style={{ height: '100%', width: '100%', alignItems: 'center' }}
              source={{ uri: data.shopPicture }}
            />
          </View>
          <View padding-10 center bg-bgColor>
            {data.isShopVerified ? <Text>{verifiedIcon}</Text> : <Text></Text>}
            <Text h2>{data.shopName}</Text>
          </View>
          <View padding-5 style={{ height: 50 }}>
            <Button
              bg-btnBg
              br20
              label={t.do('section.navigation.button.forgotPassword')}
              onPress={() => actions.followShop()}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
