import React, { useState, useEffect, useRef } from 'react';
import { Platform } from 'react-native';
import { Colors, View, Button, TextField } from 'react-native-ui-lib';
import { NavigationFunctionComponent } from 'react-native-navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';

//formik
import { Formik } from 'formik';
import * as Yup from 'yup';

//custom hooks
import { useRegisterPlayerId, useSignIn } from '../../../requests/mutations/auth';

import { useApolloClient } from '@apollo/client';

//services
import { useServices } from '../../../services';

export const SignInScreen: NavigationFunctionComponent = ({ componentId }) => {
  //services
  const { nav, t } = useServices();

  //hooks
  const [isLoading, setIsloading] = useState(false);
  const [loginError, setLoginError] = useState([]);

  //custom hooks
  const { mutate: registerPlayerId } = useRegisterPlayerId();
  const { mutate: signIn } = useSignIn();

  const apolloClient = useApolloClient();

  //refs
  const emailTextRef = useRef(null);

  const initialValues = { email: '', password: '' };

  const validSchema = Yup.object({
    email: Yup.string().email().required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  return (
    <View flex padding-15 bg-white style={{ marginTop: Platform.OS === 'ios' ? 140 : 0 }}>
      <Formik
        initialValues={initialValues}
        validationSchema={validSchema}
        onSubmit={async (values) => {
          try {
            setIsloading(true);

            //reset apollo cache
            await apolloClient.clearStore();
            await apolloClient.cache.reset();

            //send sign in request
            const response = await signIn({
              variables: {
                email: values.email,
                password: values.password,
              },
            });

            const token = response.data?.signin.token;

            if (!token) {
              // setLoginError(true);
              setIsloading(false);
            } else {
              // store token async storage
              await AsyncStorage.setItem('@token', token);
              // set loading to false
              // Set playerId
              // await activatePlayerId();
              setIsloading(false);
              // redirect to tab screen
              nav.start('tabs_screen');
            }
          } catch (error) {
            setIsloading(false);
            setLoginError(Object.values(error));
            console.log('err2', error);
            console.log('err3', Object.values(error));
          }
        }}>
        {({ handleChange, values, errors, handleSubmit }) => (
          <View marginT-10>
            <View>
              <TextField
                title={'email:'}
                titleColor={Colors.green10}
                placeholder={'your email'}
                underlineColor={Colors.textInputUnderlineColor}
                value={values.email}
                onChangeText={handleChange('email')}
                autoCapitalize="none"
                error={errors.email}
              />
              <TextField
                title={'password:'}
                titleColor={Colors.green10}
                placeholder={'your password'}
                underlineColor={Colors.textInputUnderlineColor}
                value={values.password}
                onChangeText={handleChange('password')}
                error={errors.password}
                autoCapitalize="none"
                secureTextEntry={true}
              />
            </View>
            <View>
              <View marginT-20 style={{ height: 40 }}>
                <Button
                  bg-btnBg
                  br20
                  label={t.do('section.navigation.button.loginIn')}
                  onPress={() => handleSubmit()}
                />
              </View>
              <View marginT-5 style={{ height: 40 }}>
                <Button
                  bg-btnBg
                  br20
                  label={t.do('section.navigation.button.forgotPassword')}
                  onPress={() => nav.push(componentId, 'ForgotPswdScreen')}
                />
              </View>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

SignInScreen.options = {
  topBar: {
    largeTitle: {
      visible: true,
      color: '#000',
    },
  },
};
