import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { Colors, View, Button, TextField } from 'react-native-ui-lib';
import { NavigationFunctionComponent } from 'react-native-navigation';

//form
import { Formik } from 'formik';
import * as Yup from 'yup';

//services
import { useServices } from '../../../services';

//custom hooks
import { useResetPassword } from '../../../requests/mutations/auth';

//navigation
import { useNavigationButtonPress } from 'react-native-navigation-hooks/dist';

export const PasswordResetScreen: NavigationFunctionComponent = ({
  componentId,
  email,
  phoneNumber,
}: any) => {
  const { nav, t } = useServices();

  //hooks
  const [isLoading, setIsloading] = useState(false);
  const [loginError, setLoginError] = useState('');

  //custom hooks
  const { mutate: resetPassword } = useResetPassword();

  //refs
  const formikRef = useRef();

  //navigation
  useNavigationButtonPress(() => nav.popToRoot(componentId), componentId, 'cancel');

  const validSchema = Yup.object({
    newPassword: Yup.string().required('Password is required'),
    confirmPassword: Yup.string().required('Password is required'),
  });

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ newPassword: '', confirmPassword: '' }}
        validationSchema={validSchema}
        onSubmit={async (values) => {
          const { newPassword, confirmPassword } = values;
          const isEqual = newPassword === confirmPassword;

          if (!isEqual) {
            setLoginError('password didnt match');
            return;
          }

          try {
            setIsloading(true);
            //make the query
            const response = await resetPassword({
              variables: { email, phoneNumber, newPassword },
            });
            const isSuccess = response.data.resetPassword.success;
            if (isSuccess) {
              nav.popToRoot(componentId);
              setIsloading(false);
            } else {
              setLoginError('Something bad happend. please try again');
              setIsloading(false);
            }
          } catch (err) {
            setIsloading(false);
          }
        }}>
        {({ handleChange, values, errors, handleSubmit }) => (
          <>
            <View style={[styles.inputContainer, styles.centerStyle]}>
              <TextField
                title={'New Password?:'}
                titleColor={Colors.green10}
                placeholder={'your password'}
                underlineColor={Colors.textInputUnderlineColor}
                value={values.newPassword}
                onChangeText={handleChange('newPassword')}
                error={errors.newPassword}
                secureField={true}
              />
              <TextField
                title={'Confirm Password?:'}
                titleColor={Colors.green10}
                placeholder={'your password'}
                underlineColor={Colors.textInputUnderlineColor}
                value={values.confirmPassword}
                onChangeText={handleChange('confirmPassword')}
                error={errors.confirmPassword}
                secureField={true}
              />
            </View>
            <View style={[styles.buttonContainer]}>
              <View marginT-20 style={{ height: 50 }}>
                <Button
                  bg-btnBg
                  label={t.do('section.navigation.button.loginIn')}
                  onPress={() => handleSubmit()}
                />
              </View>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
    // borderWidth: 1, borderColor: '#000'
  },
  inputContainer: {
    // borderWidth: 1, borderColor: '#000'
  },
  buttonContainer: {
    // borderWidth: 1, borderColor: '#000'
  },
  //center style
  centerStyle: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
});
