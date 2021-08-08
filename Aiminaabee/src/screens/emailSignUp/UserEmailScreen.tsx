import React, { useEffect, useRef } from 'react';
import { Platform, Alert } from 'react-native';
import { View, Button, Text, Colors, TextField } from 'react-native-ui-lib';
import { NavigationFunctionComponent } from 'react-native-navigation';

import { Formik } from 'formik';
import * as Yup from 'yup';

//Navigation
import { useNavigationButtonPress } from 'react-native-navigation-hooks/dist';

//Services
import { useServices } from '../../services';

//Funcs
import { userRegisterMutations } from '../../localState/UserCreateTemp';
import { userCreateTempVar } from '../../localState';

//custom hooks
import { useCheckUser } from '../../hooks/useCheckUser';

export const UserEmailScreen: NavigationFunctionComponent = ({ componentId }) => {
  //refs
  const userEmailTextRef: any = useRef(null);
  const formikRef: any = useRef();

  //services
  const { nav, t } = useServices();

  //local state mutations
  const { updateUser } = userRegisterMutations;
  const userCreateTemp = userCreateTempVar();

  //custom hooks
  const { checkUserEmail } = useCheckUser();

  //alert
  const pushAlertBox = (action: string) => () => {
    Alert.alert(action);
  };

  //button press
  useNavigationButtonPress(() => formikRef.current.handleSubmit(), componentId, 'next');

  useEffect(() => {
    userEmailTextRef.current.focus();
  }, [componentId]);

  const initialValues = { useremail: '' };
  const validSchema = Yup.object({
    useremail: Yup.string().email().required('Email is required'),
  });

  return (
    <View flex padding-15 bg-white style={{ marginTop: Platform.OS === 'ios' ? 140 : 0 }}>
      <Formik
        innerRef={formikRef}
        initialValues={initialValues}
        validationSchema={validSchema}
        onSubmit={async (values) => {
          const cleanedEmail = values.useremail.toLowerCase();
          const emailExist = await checkUserEmail({ email: cleanedEmail });

          if (emailExist) {
            pushAlertBox('email taken');
          } else {
            updateUser({ ...userCreateTemp, email: cleanedEmail });
            nav.push(componentId, 'UserPasswordScreen');
          }
        }}>
        {({ handleChange, values, errors }) => (
          <View padding-10>
            <TextField
              ref={userEmailTextRef}
              title={'your email?:'}
              titleColor={Colors.green10}
              placeholder={'email here'}
              underlineColor={Colors.black}
              value={values.useremail}
              onChangeText={handleChange('useremail')}
              error={errors.useremail}
              secureField={true}
            />
          </View>
        )}
      </Formik>
    </View>
  );
};

UserEmailScreen.options = {
  topBar: {
    largeTitle: {
      visible: true,
    },
  },
};
