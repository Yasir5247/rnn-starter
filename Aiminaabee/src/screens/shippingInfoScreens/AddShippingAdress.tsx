import React, { useRef } from 'react';
import { Colors, View, TextField, Button } from 'react-native-ui-lib';
import { NavigationFunctionComponent } from 'react-native-navigation';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Formik } from 'formik';
import * as Yup from 'yup';

//custom hooks
import { useAddShippingAdress } from '../../requests/mutations/shipping';

//navigation
import { useNavigationButtonPress } from 'react-native-navigation-hooks/dist';

//services
import { useServices } from '../../services';

// import { useSelector } from 'react-redux';
// import { useDispatch } from 'react-redux';
// import * as settingsActions from '../../../store/actions/settingAcations';

export const AddShippingAddress: NavigationFunctionComponent = ({ componentId }) => {
  //services
  const { nav, t } = useServices();

  //custom hooks
  const { mutate: addAddress } = useAddShippingAdress();

  // const selectedIsland = useSelector((state) => state.settingTemp.selectedIsland);
  // const dispatch = useDispatch();
  const formikRef = useRef<any>();

  //button press
  useNavigationButtonPress(() => nav.pop(componentId), componentId, 'cancel');

  const shippingInitialValues = {
    housename: '',
    street: '',
    appartment: '',
    floor: '',
    phone: '',
    zipcode: '',
    islandId: '',
  };

  const validSchema = Yup.object({
    islandId: Yup.number().required('You must select island'),
    housename: Yup.string().required('required'),
    street: Yup.string().required('required'),
    phone: Yup.string()
      .required()
      .matches(/^[0-9]+$/, 'Must be only digits')
      .min(7, 'Must be exactly 7 digits')
      .max(7, 'Must be exactly 7 digits'),
  });

  return (
    <KeyboardAwareScrollView style={{ flex: 1 }}>
      <Formik
        innerRef={formikRef}
        enableReinitialize
        initialValues={shippingInitialValues}
        validationSchema={validSchema}
        onSubmit={async (values) => {
          const reponse = await addAddress({
            variables: {
              houseName: values.housename,
              streetName: values.street,
              appartment: values.appartment,
              floor: values.floor,
              islandId: values.islandId,
              phone: values.phone,
              zipCode: values.zipcode,
            },
          });
          // dispatch(settingsActions.resetSettingsStore());
          nav.pop(componentId);
        }}>
        {({ handleChange, handleBlur, values, errors, touched }) => (
          <View bg-bgColor padding-20>
            <TextField
              title={'House name?:'}
              titleColor={Colors.green10}
              placeholder={'housename'}
              underlineColor={Colors.textInputUnderlineColor}
              value={values.housename}
              onChangeText={handleChange('housename')}
              error={errors.housename}
              autoCapitalize="none"
            />
            <TextField
              title={'Street name?:'}
              titleColor={Colors.green10}
              placeholder={'street'}
              underlineColor={Colors.textInputUnderlineColor}
              value={values.street}
              onChangeText={handleChange('street')}
              error={errors.street}
              autoCapitalize="none"
            />
            <TextField
              title={'Appartment?:'}
              titleColor={Colors.green10}
              placeholder={'appartment'}
              underlineColor={Colors.textInputUnderlineColor}
              value={values.appartment}
              onChangeText={handleChange('appartment')}
              error={errors.appartment}
              autoCapitalize="none"
            />
            <TextField
              title={'Floor?:'}
              titleColor={Colors.green10}
              placeholder={'floor'}
              underlineColor={Colors.textInputUnderlineColor}
              value={values.floor}
              onChangeText={handleChange('floor')}
              error={errors.floor}
              autoCapitalize="none"
            />
            <TextField
              title={'Phone?:'}
              titleColor={Colors.green10}
              placeholder={'phone'}
              underlineColor={Colors.textInputUnderlineColor}
              value={values.phone}
              onChangeText={handleChange('phone')}
              error={errors.phone}
              autoCapitalize="none"
            />
            <TextField
              title={'Zipcode?:'}
              titleColor={Colors.green10}
              placeholder={'zipcode'}
              underlineColor={Colors.textInputUnderlineColor}
              value={values.zipcode}
              onChangeText={handleChange('zipcode')}
              error={errors.zipcode}
              autoCapitalize="none"
            />
            <View style={{ height: 40, width: '100%' }}>
              <Button
                bg-btnBg
                br20
                label={t.do('section.appWideButtons.button.create')}
                onPress={() => nav.push(componentId, 'UserNameScreen')}
              />
            </View>
          </View>
        )}
      </Formik>
    </KeyboardAwareScrollView>
  );
};

AddShippingAddress.options = {
  bottomTabs: {
    visible: false,
    drawBehind: true,
  },
};
