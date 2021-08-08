import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { View, Text } from 'react-native-ui-lib';

interface CartButtonProps {
  data: {
    productId: number;
    isInCart: boolean;
    isOwner: boolean;
  };
  actions: {
    addToCart: (productId: number) => void;
  };
}

export const CartButton: React.FC<CartButtonProps> = ({ data, actions }) => {
  return (
    <View padding-10>
      {data.isOwner ? (
        <View flex center padding-10 br20 bg-btnBg>
          <Text h1 textWhite>
            Product Insight
          </Text>
        </View>
      ) : (
        <View>
          {data.isInCart ? (
            <View flex center padding-10 br20 bg-btnBg>
              <Text h1 textWhite>
                in cart
              </Text>
            </View>
          ) : (
            <TouchableWithoutFeedback onPress={() => actions.addToCart(data.productId)}>
              <View flex center padding-10 br20 bg-btnBg>
                <Text h1 textWhite>
                  Add to cart
                </Text>
              </View>
            </TouchableWithoutFeedback>
          )}
        </View>
      )}
    </View>
  );
};
