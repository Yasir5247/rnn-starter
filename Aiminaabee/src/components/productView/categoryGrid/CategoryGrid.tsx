import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { View, Button, Text } from 'react-native-ui-lib';

//components
import { ImageLoader } from '../../comon/ImageLoader';
import { LikeButton } from '../../comon/LikeButton';
import { BookmarkButton } from '../../comon/BookmarkButton';

//services
import { useServices } from '../../../services';

interface CategoryGridProps {
  data: {
    productId: number;
    productName: string;
    productPrice: number;
    productImage: string;
    categoryName: string;
    isLiked: boolean;
    isBookmarked: boolean;
  };
  actions: {
    toggleLike: (productId: number, status: any) => void;
    toggleBookmark: (productId: number, status: any) => void;
    showProduct: (prodId: number, prodName: string) => void;
  };
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({ data, actions }) => {
  //services
  const { nav, t } = useServices();

  //status
  const isLiked = data.isLiked ? 0 : 1;
  const isBookmarked = data.isBookmarked ? 0 : 1;

  //box style
  const boxBorder = { borderRightWidth: 2, borderBottomWidth: 2, borderColor: '#f2f2f2' };
  const hotLableBorder = { borderWidth: 0.5, borderColor: '#f2f2f2' };

  return (
    <View flex-1 bg-bgColor>
      <View flex bg-bgColor style={boxBorder}>
        <View row padding-10 style={{ justifyContent: 'space-between' }}>
          <View>
            <View padding-2 bg-bgColor br20 center style={hotLableBorder}>
              <Text hotlable>{data.categoryName}</Text>
            </View>
          </View>
          <View>
            <LikeButton
              data={{
                productId: data.productId,
                status: isLiked,
              }}
              actions={{
                toggleLike: (productId: number, status: any) =>
                  actions.toggleLike(productId, status),
              }}
            />
          </View>
        </View>
        <View flex-1 center padding-10>
          <TouchableWithoutFeedback
            onPress={() => actions.showProduct(data.productId, data.productName)}>
            <ImageLoader
              style={{ height: '80%', width: '80%', alignItems: 'center' }}
              source={{ uri: data.productImage }}
            />
          </TouchableWithoutFeedback>
        </View>
        <View bg-bgColor padding-10>
          <Text h1>{data.productName}</Text>
          <View row paddingT-5 style={{ justifyContent: 'space-between' }}>
            <View>
              <Text row>
                <Text h1>{data.productPrice}</Text>
              </Text>
            </View>
            <View>
              <BookmarkButton
                data={{
                  productId: data.productId,
                  status: isBookmarked,
                }}
                actions={{
                  toggleBookmark: (productId: number, status: any) =>
                    actions.toggleBookmark(productId, status),
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
