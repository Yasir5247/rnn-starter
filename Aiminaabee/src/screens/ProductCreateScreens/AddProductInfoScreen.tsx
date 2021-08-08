import React, { useEffect, useRef } from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';
import { NavigationFunctionComponent } from 'react-native-navigation';
import { Colors, View, Button, TextField } from 'react-native-ui-lib';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Formik } from 'formik';
import * as Yup from 'yup';

//services
import { useServices } from '../../services';

//navigation
import { useNavigationButtonPress } from 'react-native-navigation-hooks/dist';

//apollo
import { useQuery } from '@apollo/client';
import { PRODUCT_CONDITIONS } from '../../requests/productVariations';
import { productRegisterMutations } from '../../localState/ProductCreateTemp';

//components
import { BeeSelect } from '../../components/comon/BeeSelect';

interface productCreateInitial {
  prodName: string;
  description: string;
  price: number;
  quantity: number;
  condition: { label: string; value: number };
}

export const AddProductInforScreen: NavigationFunctionComponent = ({ componentId }) => {
  //services
  const { nav, t } = useServices();

  //local state
  const { updateProduct } = productRegisterMutations;

  //refs
  const formikRef = useRef<any>();

  //button press
  useNavigationButtonPress(() => formikRef.current.handleSubmit(), componentId, 'next');

  const { loading, data } = useQuery(PRODUCT_CONDITIONS);

  const productInfoInitialValues: productCreateInitial = {
    prodName: '',
    price: 0,
    description: '',
    quantity: 0,
    condition: { label: '', value: 0 },
  };

  const productInforSchema = Yup.object().shape({
    prodName: Yup.string().required('Product name is required'),
    price: Yup.number()
      .positive("Number can't start with a minus")
      .required('Product price is required'),
    description: Yup.string().required('Product description is required'),
    quantity: Yup.number()
      .positive("Number can't start with a minus")
      .required('Product quantity is required'),
    condition: Yup.object().shape({
      value: Yup.number().required('Product Condition is required'),
    }),
  });

  if (loading) {
    <ActivityIndicator style={{ margin: 10 }} size="large" color={'black'} />;
  }

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <Formik
        innerRef={formikRef}
        initialValues={productInfoInitialValues}
        validationSchema={productInforSchema}
        onSubmit={async (values) => {
          updateProduct({ name: values.prodName });
          updateProduct({ description: values.description });
          updateProduct({ price: values.price });
          updateProduct({ stock: values.quantity });
          updateProduct({ conditionId: values.condition.value });
          updateProduct({ conditionName: values.condition.label });

          nav.push(componentId, 'ProductUploadReviewScreen');
        }}>
        {({ handleChange, handleBlur, values, errors, touched, setFieldValue }) => (
          <>
            <View style={styles.inputWrapper}>
              <TextField
                title={'Product name'}
                titleColor={Colors.green10}
                placeholder={'your email'}
                underlineColor={Colors.textInputUnderlineColor}
                value={values.prodName}
                onChangeText={handleChange('prodName')}
                autoCapitalize="none"
                error={errors.prodName}
              />
              <TextField
                title={'Product description'}
                titleColor={Colors.green10}
                placeholder={'description'}
                underlineColor={Colors.textInputUnderlineColor}
                value={values.description}
                onChangeText={handleChange('description')}
                autoCapitalize="none"
                error={errors.description}
              />
              <TextField
                title={'Product price'}
                titleColor={Colors.green10}
                placeholder={'price'}
                underlineColor={Colors.textInputUnderlineColor}
                value={values.price}
                onChangeText={handleChange('price')}
                autoCapitalize="none"
                error={errors.price}
              />
              <TextField
                title={'Product quanity'}
                titleColor={Colors.green10}
                placeholder={'quantity'}
                underlineColor={Colors.textInputUnderlineColor}
                value={values.quantity}
                onChangeText={handleChange('quantity')}
                autoCapitalize="none"
                error={errors.quantity}
              />
            </View>
            <View style={styles.inputWrapper}>
              <BeeSelect
                label={'Product condition?'}
                value={values.condition}
                onValueChange={(itemValue: { value: number; label: string }) => {
                  setFieldValue('condition.label', itemValue.label);
                  setFieldValue('condition.value', itemValue.value);
                }}
                onTouchError={touched.condition}
                onErrors={errors.condition}
                options={data?.getProductConditions ?? []}
              />
            </View>
          </>
        )}
      </Formik>
    </KeyboardAwareScrollView>
  );
};

AddProductInforScreen.options = {
  bottomTabs: {
    visible: false,
    drawBehind: true,
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
    margin: 5,
  },
  inputWrapper: {
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 12,
    padding: 5,
    marginBottom: 5,
  },
});
