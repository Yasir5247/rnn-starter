import React, { useState } from 'react';
import { TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { View, Button, Text, Toast } from 'react-native-ui-lib';

//services
import { useServices } from '../../../services';

//components
import { ImageLoader } from '../../comon/ImageLoader';
// import HideCartButton from '../../Common/HideCartButton';

interface CategoryCardProps {
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

export const CategoryCard: React.FC<CategoryCardProps> = ({ data, actions }) => {
  //services
  const { nav, t } = useServices();

  //state
  const [showToast, setShowToast] = useState(false);

  //status
  const isLiked = data.isLiked ? 0 : 1;
  const isBookmarked = data.isBookmarked ? 0 : 1;

  return (
    <TouchableWithoutFeedback onPress={() => actions.showProduct(data.productId, data.productName)}>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.pictureBox}>
            <ImageLoader
              style={{ height: '80%', width: '80%', alignItems: 'center' }}
              source={{ uri: data.productImage }}
            />
          </View>
          <View style={styles.prodInfoBox}>
            <View style={styles.header}>
              <View>
                <View style={styles.hotLabelText}>
                  <Text style={{ fontSize: 10 }}>{data.categoryName}</Text>
                </View>
              </View>
              <View>
                <Button
                  bg-btnBg
                  br20
                  label={
                    isLiked
                      ? t.do('section.navigation.button.signUp')
                      : t.do('section.navigation.button.signUp')
                  }
                  onPress={() => actions.toggleLike(data.productId, isLiked)}
                />
              </View>
            </View>
            <View style={styles.prodInfo}>
              <Text h1>{data.productName}</Text>
              <View style={styles.cartContainer}>
                <View>
                  <Text style={{ flexDirection: 'row' }}>
                    <Text h1>MVR</Text>
                    <Text h2>{data.productPrice}</Text>
                  </Text>
                </View>
                <View>
                  <Button
                    bg-btnBg
                    br20
                    label={
                      isBookmarked
                        ? t.do('section.navigation.button.signUp')
                        : t.do('section.navigation.button.signUp')
                    }
                    onPress={() => actions.toggleLike(data.productId, isBookmarked)}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
        <Toast
          visible={showToast}
          showDismiss={true}
          onDismiss={() => setShowToast(false)}
          position={'bottom'}
          backgroundColor={'#2C2F33'}
          message="added to cart"
          autoDismiss={2000}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopWidth: 0.5,
    borderColor: '#ccc',
    backgroundColor: '#F2F2F2',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    marginTop: 5,
  },
  pictureBox: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '30%',
  },
  prodInfoBox: {
    flex: 1,
    flexDirection: 'column',
    paddingRight: 5,
    justifyContent: 'space-between',
  },
  header: {
    padding: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  hotLabelText: {
    padding: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#f2f2f2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  prodInfo: {
    padding: 10,
  },
  cartContainer: {
    paddingTop: 5,
    paddingBottom: 5,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
