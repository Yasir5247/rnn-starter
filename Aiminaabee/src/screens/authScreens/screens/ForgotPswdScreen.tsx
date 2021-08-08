import React, { useRef, useState } from 'react';
import { Platform } from 'react-native';
import { NavigationFunctionComponent } from 'react-native-navigation';
import { Colors, View, Button, TextField } from 'react-native-ui-lib';

import { Formik } from 'formik';
import * as Yup from 'yup';

//services
import { useServices } from '../../../services';

//custom hooks
import { useCheckUser } from '../../../hooks/useCheckUser';
import { useOTPVerification } from '../../../hooks/useOTPVerification';

//navigation
import { useNavigationButtonPress } from 'react-native-navigation-hooks/dist';

export const ForgotPswdScreen: NavigationFunctionComponent = ({ componentId }) => {
  const { nav, t } = useServices();

  //state
  const [loading, setLoading] = useState(false);

  //custom hooks
  const { checkUserValidity } = useCheckUser();
  const { sendOTP } = useOTPVerification();

  //navigation
  useNavigationButtonPress(() => nav.pop(componentId), componentId, 'cancel');

  //validation
  const validSchema = Yup.object({
    email: Yup.string().email().required('Email is required'),
    phoneNumber: Yup.string()
      .required()
      .matches(/^[0-9]+$/, 'Must be only digits')
      .min(7, 'Must be exactly 7 digits')
      .max(7, 'Must be exactly 7 digits'),
  });

  return (
    <View flex padding-15 bg-white style={{ marginTop: Platform.OS === 'ios' ? 140 : 0 }}>
      <Formik
        initialValues={{ email: '', phoneNumber: '' }}
        validationSchema={validSchema}
        onSubmit={async (values) => {
          //set loading status
          setLoading(true);

          //extract values from the form
          const { email, phoneNumber } = values;

          //check to see if this a valid user
          const isValidUser = await checkUserValidity({ email, phone: phoneNumber });

          if (isValidUser) {
            //send OTP
            const data = await sendOTP({ phoneNumber });
            const { success, response } = data;

            if (success) {
              setLoading(false);
              //take id value from reponse object to resend the OTP
              nav.push(componentId, 'OtpScreen', { email, phoneNumber, resendId: response.id });
            }
          } else {
            setLoading(false);
          }
        }}>
        {({ handleChange, handleBlur, values, errors, touched, handleSubmit }) => (
          <>
            <View>
              <TextField
                title={'email:'}
                titleColor={Colors.green10}
                placeholder={'your email'}
                underlineColor={Colors.textInputUnderlineColor}
                value={values.email}
                onChangeText={handleChange('email')}
                error={errors.email}
              />
              <TextField
                title={'phone number:'}
                titleColor={Colors.green10}
                placeholder={'your email'}
                underlineColor={Colors.textInputUnderlineColor}
                value={values.phoneNumber}
                onChangeText={handleChange('phoneNumber')}
                error={errors.phoneNumber}
              />
            </View>
            <View marginT-20 style={{ height: 40 }}>
              <Button
                bg-btnBg
                br20
                label={t.do('section.navigation.button.resetPassword')}
                onPress={() => handleSubmit()}
              />
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

ForgotPswdScreen.options = {
  topBar: {
    largeTitle: {
      visible: true,
    },
  },
};
