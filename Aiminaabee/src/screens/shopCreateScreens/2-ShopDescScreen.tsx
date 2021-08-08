import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

//Formik
import { Formik } from 'formik';
import * as Yup from 'yup';

//Navigation
import { NavigationFunctionComponent } from 'react-native-navigation';
import { useNavigationButtonPress } from 'react-native-navigation-hooks/dist';

//Services
import { useServices } from '../../services';

//Custom Hooks
import { shopRegisterMutations } from '../../localState/shopCreateTemp';

export const ShopDesScreen: NavigationFunctionComponent = ({ componentId }) => {
  //services
  const { nav, t } = useServices();

  const shopDescTextRef: any = useRef(null);
  const formikRef: any = useRef();

  //local state
  const { updateShopTemp } = shopRegisterMutations;

  //button press
  useNavigationButtonPress(() => formikRef.current.handleSubmit(), componentId, 'next');

  useEffect(() => {
    shopDescTextRef.current.focus();
  }, []);

  const validSchema = Yup.object({
    shopDesc: Yup.string().required('Shop Description is required'),
  });

  return (
    <View style={styles.container}>
      <Formik
        innerRef={formikRef}
        initialValues={{ shopDesc: '' }}
        validationSchema={validSchema}
        onSubmit={(values) => {
          updateShopTemp({ description: values.shopDesc });
          nav.push(componentId, 'ShopRelatedCategoryScreen');
        }}>
        {({ handleChange, handleBlur, values, errors, touched }) => (
          <View style={styles.containerOne}>
            <TextInput
              underlineColorAndroid="transparent"
              ref={shopDescTextRef}
              style={styles.Input}
              placeholder="Eg: let's say kids shop"
              onChangeText={handleChange('shopDesc')}
              onBlur={handleBlur('shopDesc')}
              value={values.shopDesc}
            />
            <Text style={{ color: 'red', marginTop: 10 }}>
              {touched.shopDesc && errors.shopDesc}
            </Text>
          </View>
        )}
      </Formik>
    </View>
  );
};

ShopDesScreen.options = {
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
