import React, { useRef } from 'react';
import { ScrollView, ActivityIndicator } from 'react-native';
import { Colors, View, Button, TextField } from 'react-native-ui-lib';
import { NavigationFunctionComponent } from 'react-native-navigation';

import { Formik } from 'formik';
import * as Yup from 'yup';

//Navigation
import { useNavigationButtonPress } from 'react-native-navigation-hooks/dist';

import { useQuery } from '@apollo/client';
import { useUpdateShop } from '../../requests/mutations/shop';
import { GET_SINGLE_SHOP } from '../../requests/shop';
import { GetSingleShop, GetSingleShopVariables } from '../../requests/__generated__/GetSingleShop';

//services
import { useServices } from '../../services';

export const ShopEditScreen: NavigationFunctionComponent = ({ componentId, shopId }: any) => {
  //services
  const { nav, t } = useServices();

  //hooks
  const { mutate: updateShop } = useUpdateShop();

  //refs
  const formikRef = useRef<any>();

  //button press
  useNavigationButtonPress(() => nav.pop(componentId), componentId, 'cancel');

  const { loading, data: shopData } = useQuery<GetSingleShop, GetSingleShopVariables>(
    GET_SINGLE_SHOP,
    { variables: { shopId: shopId } },
  );

  const validSchema = Yup.object({
    shopDescription: Yup.string(),
    shopWebsite: Yup.string(),
    shopContact: Yup.string()
      .matches(/^[0-9]+$/, 'Must be only digits')
      .min(7, 'Must be exactly 7 digits')
      .max(7, 'Must be exactly 7 digits'),
  });

  if (loading) {
    return <ActivityIndicator style={{ margin: 5 }} size="large" color={'black'} />;
  }

  return (
    <View flex-1 bg-bgColor>
      <ScrollView contentInsetAdjustmentBehavior="always">
        <Formik
          innerRef={formikRef}
          enableReinitialize
          initialValues={{
            shopDescription: shopData?.getSingleShop.description,
            shopWebsite: shopData?.getSingleShop.website,
            shopContact: shopData?.getSingleShop.contact,
          }}
          validationSchema={validSchema}
          onSubmit={async (values) => {
            try {
              await updateShop({
                variables: {
                  shopId: shopId,
                  description: values.shopDescription,
                  website: values.shopWebsite,
                  contact: values.shopContact,
                },
              });
              // send the screen back to root
              nav.pop(componentId);
            } catch (error) {
              console.log('err2', error);
              console.log('err3', Object.values(error));
            }
          }}>
          {({ handleChange, handleBlur, values, errors, touched, handleSubmit }) => (
            <View bg-bgColor padding-20>
              <TextField
                title={'Description:'}
                titleColor={Colors.green10}
                placeholder={'your shop website'}
                underlineColor={Colors.textInputUnderlineColor}
                value={values.shopDescription}
                onChangeText={handleChange('shopDescription')}
                autoCapitalize="none"
                error={errors.shopDescription}
              />
              <TextField
                title={'Website:'}
                titleColor={Colors.green10}
                placeholder={'your shop website'}
                underlineColor={Colors.textInputUnderlineColor}
                value={values.shopWebsite}
                onChangeText={handleChange('shopWebsite')}
                autoCapitalize="none"
                error={errors.shopWebsite}
              />
              <TextField
                title={'Contact Number:'}
                titleColor={Colors.green10}
                placeholder={'your contact number'}
                underlineColor={Colors.textInputUnderlineColor}
                value={values.shopContact}
                onChangeText={handleChange('shopContact')}
                autoCapitalize="none"
                error={errors.shopContact}
              />
              <View marginT-10 style={{ height: 40 }}>
                <Button
                  bg-btnBg
                  br20
                  label={t.do('section.appWideButtons.button.update')}
                  onPress={() => handleSubmit()}
                />
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
};

ShopEditScreen.options = {
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
