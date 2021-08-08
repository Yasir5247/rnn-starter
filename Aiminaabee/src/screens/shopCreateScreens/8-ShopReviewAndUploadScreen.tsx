import React, { useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { View, Button, Text } from 'react-native-ui-lib';

//queries
import { shopCreateTempVar } from '../../services/client/cache';

//Services
import { useServices } from '../../services';

//components
import ReviewContainer from '../../components/shopCreate/ReviewContainer';

//Navigation
import { useNavigationButtonPress } from 'react-native-navigation-hooks/dist';
import { NavigationFunctionComponent } from 'react-native-navigation';

//cutom hooks
import { useCreateShop } from '../../requests/mutations/shop';

export const ShopReivewAndUploadScreen: NavigationFunctionComponent = ({ componentId }) => {
  //services
  const { nav, t } = useServices();
  //state
  const [loading, setLoading] = useState(false);

  //cutom hooks
  const { mutate: createShop } = useCreateShop();

  //local state
  const shopTempValues = shopCreateTempVar();

  //button press
  useNavigationButtonPress(() => nav.popToRoot(componentId), componentId, 'cancel');

  const shopCreateHandler = async () => {
    //set loading to true
    setLoading(true);

    //create the shop
    const response = await createShop({ variables: { ...shopTempValues } });
    const isSuccess = response.data.createShop.success;

    if (isSuccess) {
      //set loading to false
      setLoading(false);

      //navigated back to the root
      nav.popToRoot(componentId);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <>
          <View style={styles.infoBox}>
            <ReviewContainer data={shopTempValues} />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              bg-btnBg
              br20
              label={t.do('section.shop.letters.createShop')}
              onPress={() => shopCreateHandler()}
            />
          </View>
        </>
      </ScrollView>
    </View>
  );
};

ShopReivewAndUploadScreen.options = {
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
    padding: 10,
    marginTop: 140,
  },
  imageBox: {},
  infoBox: {},
  buttonContainer: {
    height: 40,
  },
});
