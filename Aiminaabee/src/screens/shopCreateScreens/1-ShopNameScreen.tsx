import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, Alert } from 'react-native';
import { RadioGroup, RadioButton } from 'react-native-ui-lib';

import { Formik } from 'formik';
import * as Yup from 'yup';

//services
import { useServices } from '../../services';

//Navigation
import { useNavigationButtonPress } from 'react-native-navigation-hooks/dist';
import { NavigationFunctionComponent } from 'react-native-navigation';

//custom hooks
import { useCheckShop } from '../../hooks/useCheckShop';
import { shopRegisterMutations } from '../../localState/shopCreateTemp';

export const ShopNameScreen: NavigationFunctionComponent = ({ componentId }) => {
  //services
  const { nav, t } = useServices();

  //state
  const [shopType, setShopType] = useState('Online');

  //refs
  const shopNameTextRef: any = useRef(null);
  const formikRef: any = useRef();

  //alert
  const Elert = (action: string) => () => {
    Alert.alert(action);
  };

  //local state
  const { updateShopTemp, clearShopTemp } = shopRegisterMutations;

  //custom hooks
  const { checkShopName } = useCheckShop();

  //button press
  useNavigationButtonPress(() => formikRef.current.handleSubmit(), componentId, 'next');

  useEffect(() => {
    shopNameTextRef.current.focus();
  }, [componentId]);

  const validSchema = Yup.object({
    shopName: Yup.string().required('Shop Name is required'),
  });

  return (
    <View style={styles.container}>
      <Formik
        innerRef={formikRef}
        initialValues={{ shopName: '' }}
        validationSchema={validSchema}
        onSubmit={async (values) => {
          const isShopExist = await checkShopName({ shopName: values.shopName });

          if (!isShopExist) {
            clearShopTemp();
            updateShopTemp({ name: values.shopName });
            updateShopTemp({ type: shopType });
            nav.push(componentId, 'ShopDesScreen');
          } else {
            Elert('Shop Name Taken. Please use another one');
          }
        }}>
        {({ handleChange, handleBlur, values, errors, touched }) => (
          <>
            <View style={styles.containerOne}>
              <TextInput
                ref={shopNameTextRef}
                underlineColorAndroid="transparent"
                style={styles.Input}
                placeholder="your awesome shop"
                onChangeText={handleChange('shopName')}
                onBlur={handleBlur('shopName')}
                value={values.shopName}
              />
              <Text style={{ color: 'red', marginTop: 10 }}>
                {touched.shopName && errors.shopName}
              </Text>
            </View>
            <View style={styles.containerOne}>
              <RadioGroup
                initialValue={shopType}
                onValueChange={(value: any) => setShopType(value)}>
                <View style={{ flexDirection: 'row' }}>
                  <RadioButton value={'Online'} label={'Online'} />
                  <RadioButton style={{ marginLeft: 10 }} value={'Physical'} label={'Physical'} />
                </View>
              </RadioGroup>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

ShopNameScreen.options = {
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
  },
  containerOne: {
    padding: 20,
    backgroundColor: '#fff',
    // borderWidth: 1, borderColor: '#000'
  },
  Text: {
    marginTop: 20,
    marginBottom: 10,
    color: '#000',
    fontSize: 16,
  },
  Input: {
    color: '#ccc',
    fontSize: 25,
  },
});
