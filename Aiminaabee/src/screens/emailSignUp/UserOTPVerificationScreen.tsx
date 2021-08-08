import React, { useState, useEffect, useRef } from 'react';
import { Platform } from 'react-native';
import { Colors, View, Button, TextField } from 'react-native-ui-lib';
import { NavigationFunctionComponent } from 'react-native-navigation';

//form
import { Formik } from 'formik';
import * as Yup from 'yup';

//Navigation
import { useNavigationButtonPress } from 'react-native-navigation-hooks/dist';

//local state
import { userRegisterMutations } from '../../localState/UserCreateTemp';
import { userCreateTempVar } from '../../localState';

//custom hook
import { useOTPVerification } from '../../hooks/useOTPVerification';

//Services
import { useServices } from '../../services';

//components
import { OTPDescSection } from '../../components/screen/OTP/sharedOTPDesc';

export const SignUpOTPVerificationScreen: NavigationFunctionComponent = ({
  componentId,
  phoneNumber,
  resendId,
}: any) => {
  //state
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  //local state
  const { updateUser } = userRegisterMutations;
  const userCreateTemp = userCreateTempVar();

  //services
  const { nav, t } = useServices();

  //navigation
  useNavigationButtonPress(() => nav.popToRoot(componentId), componentId, 'cancel');

  //refs
  const otpTextRef = useRef(null);
  const formikRef: any = useRef();

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
        innerRef={formikRef}
        initialValues={{ userOTP: '' }}
        validationSchema={validSchema}
        onSubmit={async (values) => {
          setVerifyLoading(true);

          const { userOTP } = values;

          //verify OTP code
          const data = await verifyOTP({ phoneNumber, otpCode: userOTP });
          const { success, response } = data;

          if (success) {
            setVerifyLoading(false);

            //if the verification is successfull
            //store the mobile number in local storage to send
            //to store in the user table
            updateUser({ ...userCreateTemp, contact: phoneNumber });

            //move to splash screen
            nav.push(componentId, 'SplashScreen');
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
                underlineColor={Colors.black}
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

SignUpOTPVerificationScreen.options = {
  topBar: {
    largeTitle: {
      visible: true,
    },
  },
};
