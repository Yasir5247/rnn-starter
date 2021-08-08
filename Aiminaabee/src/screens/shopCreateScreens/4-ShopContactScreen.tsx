import React, { useRef } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

//form
import { Formik } from 'formik';
import * as Yup from 'yup';

//Services
import { useServices } from '../../services';

//Navigation
import { useNavigationButtonPress } from 'react-native-navigation-hooks/dist';
import { NavigationFunctionComponent } from 'react-native-navigation';

//local state
import { shopRegisterMutations } from '../../localState/shopCreateTemp';

export const ShopContactScreen: NavigationFunctionComponent = ({ componentId }) => {
  //services
  const { nav, t } = useServices();

  //local state
  const { updateShopTemp } = shopRegisterMutations;

  //refs
  const shopContactTextRef: any = useRef(null);
  const formikRef: any = useRef();

  //button press
  useNavigationButtonPress(() => formikRef.current.handleSubmit(), componentId, 'next');

  const validSchema = Yup.object({
    shopContact: Yup.string()
      .required()
      .matches(/^[0-9]+$/, 'Must be only digits')
      .min(7, 'Must be exactly 7 digits')
      .max(7, 'Must be exactly 7 digits'),
  });

  return (
    <View style={styles.container}>
      <Formik
        innerRef={formikRef}
        initialValues={{ shopContact: '' }}
        validationSchema={validSchema}
        onSubmit={(values) => {
          updateShopTemp({ contact: values.shopContact });
          nav.push(componentId, 'ShopDeliveryLocationScreen');
        }}>
        {({ handleChange, handleBlur, values, errors, touched }) => (
          <View style={styles.containerOne}>
            <TextInput
              underlineColorAndroid="transparent"
              keyboardType={'numeric'}
              ref={shopContactTextRef}
              style={styles.Input}
              placeholder="XXXXXXX"
              onChangeText={handleChange('shopContact')}
              onBlur={handleBlur('shopContact')}
              value={values.shopContact}
            />
            <Text style={{ color: 'red', marginTop: 10 }}>
              {touched.shopContact && errors.shopContact}
            </Text>
          </View>
        )}
      </Formik>
    </View>
  );
};

ShopContactScreen.options = {
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
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  Text: {
    marginTop: 20,
    color: '#000',
    fontSize: 16,
  },
  Input: {
    color: '#ccc',
    fontSize: 25,
  },
});
