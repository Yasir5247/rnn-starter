import React, { useState, useEffect, useRef } from 'react';
import { Platform } from 'react-native';
import { Colors, View, Button, TextField } from 'react-native-ui-lib';
import { NavigationFunctionComponent } from 'react-native-navigation';

//form
import { Formik } from 'formik';
import * as Yup from 'yup';

import { useServices } from '../../../services';

//components
import { OTPDescSection } from '../../../components/screen/OTP/sharedOTPDesc';

//custom hook
import { useOTPVerification } from '../../../hooks/useOTPVerification';

//navigation
import { useNavigationButtonPress } from 'react-native-navigation-hooks/dist';

export const OtpScreen: NavigationFunctionComponent = ({
  componentId,
  email,
  phoneNumber,
  resendId,
}: any) => {
  console.log('from otp screen', phoneNumber);

  const { nav, t } = useServices();

  //state
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  //refs
  const emailTextRef = useRef(null);
  const formikRef = useRef();

  //navigation
  useNavigationButtonPress(() => nav.popToRoot(componentId), componentId, 'cancel');

  //custom hooks
  const { verifyOTP, resendOTP } = useOTPVerification();

  const validSchema = Yup.object({
    userOTP: Yup.string()
      .required()
      .matches(/^[0-9]+$/, 'Must be only digits')
      .min(6, 'Must be exactly 7 digits')
      .max(6, 'Must be exactly 7 digits'),
  });

  const resendOTPCode = async () => {
    try {
      setResendLoading(true);
      await resendOTP({ phoneNumber, id: resendId });
      setResendLoading(false);
    } catch (error) {
      setResendLoading(false);
    }
  };

  return (
    <View flex padding-15 bg-white style={{ marginTop: Platform.OS === 'ios' ? 140 : 0 }}>
      <Formik
        initialValues={{ userOTP: '' }}
        validationSchema={validSchema}
        onSubmit={async (values) => {
          setVerifyLoading(true);

          //get user entered OTP value from the form
          const { userOTP } = values;

          //verify OTP code
          const data = await verifyOTP({ phoneNumber, otpCode: userOTP });
          const { success, response } = data;

          if (success) {
            setVerifyLoading(false);
            //move reset password screen
            nav.push(componentId, 'PasswordResetScreen', { email, phoneNumber });
          } else {
            setVerifyLoading(false);
            //show error message here
          }
        }}>
        {({ handleChange, values, errors, handleSubmit }) => (
          <View>
            <View marginT-20>
              <TextField
                title={'Enter OTP:'}
                titleColor={Colors.green10}
                placeholder={'your password'}
                underlineColor={Colors.textInputUnderlineColor}
                value={values.userOTP}
                onChangeText={handleChange('userOTP')}
                error={errors.userOTP}
                secureField={true}
              />
            </View>
            <OTPDescSection
              text={'Enter the verification code sent to your mobile number'}
              mobileNumber={phoneNumber}
            />
            <View>
              <View marginT-20 style={{ height: 40 }}>
                <Button
                  bg-btnBg
                  br20
                  label={t.do('section.navigation.button.sendOTP')}
                  onPress={() => handleSubmit()}
                />
              </View>
              <View marginT-05 style={{ height: 40 }}>
                <Button
                  bg-btnBg
                  br20
                  label={t.do('section.navigation.button.reSendOTP')}
                  onPress={() => resendOTPCode()}
                />
              </View>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

OtpScreen.options = {
  topBar: {
    largeTitle: {
      visible: true,
    },
  },
};
