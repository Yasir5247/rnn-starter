import React, { useEffect, useRef } from 'react';
import { Platform } from 'react-native';
import { View, Button, Text, Colors, TextField } from 'react-native-ui-lib';
import { NavigationFunctionComponent } from 'react-native-navigation';

//form
import { Formik } from 'formik';
import * as Yup from 'yup';

//Navigation
import { useNavigationButtonPress } from 'react-native-navigation-hooks/dist';

//Services
import { useServices } from '../../services';

//custom hook
import { useOTPVerification } from '../../hooks/useOTPVerification';

export const UserContactScreen: NavigationFunctionComponent = ({ componentId }) => {
  //refs
  const userContactInputRef: any = useRef(null);
  const formikRef: any = useRef();

  //services
  const { nav, t } = useServices();

  //custom hooks
  const { sendOTP } = useOTPVerification();

  //button press
  useNavigationButtonPress(() => formikRef.current.handleSubmit(), componentId, 'next');

  const validSchema = Yup.object({
    userContact: Yup.string()
      .required()
      .matches(/^[0-9]+$/, 'Must be only digits')
      .min(7, 'Must be exactly 7 digits')
      .max(7, 'Must be exactly 7 digits'),
  });

  return (
    <View flex padding-15 bg-white style={{ marginTop: Platform.OS === 'ios' ? 140 : 0 }}>
      <Formik
        innerRef={formikRef}
        initialValues={{ userContact: '' }}
        validationSchema={validSchema}
        onSubmit={async (values) => {
          const { userContact: phoneNumber } = values;

          //send OTP
          const { success, response } = await sendOTP({ phoneNumber });

          //send to OTP verification screen regardless of the outcome
          if (success) {
            nav.push(componentId, 'SignUpOTPVerificationScreen', {
              phoneNumber,
              resendId: response.id,
            });
          }
        }}>
        {({ handleChange, values, errors, touched }) => (
          <View>
            <TextField
              ref={userContactInputRef}
              title={'your contact?:'}
              titleColor={Colors.green10}
              placeholder={'contact here'}
              underlineColor={Colors.black}
              value={values.userContact}
              onChangeText={handleChange('userContact')}
              keyboardType={'numeric'}
              error={errors.userContact}
            />
            <Text style={{ color: 'red', marginTop: 10 }}>
              {touched.userContact && errors.userContact}
            </Text>
          </View>
        )}
      </Formik>
    </View>
  );
};

UserContactScreen.options = {
  topBar: {
    largeTitle: {
      visible: true,
    },
  },
};
