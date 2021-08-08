import React, { useEffect, useRef } from 'react';
import { Platform } from 'react-native';
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

export const UserNameScreen: NavigationFunctionComponent = ({ componentId }) => {
  const formikRef: any = useRef();
  const userNameTextInputRef: any = useRef(null);

  const { nav, t } = useServices();

  //local state
  const { updateUser } = userRegisterMutations;
  const userCreateTemp = userCreateTempVar();

  //button press
  useNavigationButtonPress(() => formikRef.current.handleSubmit(), componentId, 'next');

  useEffect(() => {
    userNameTextInputRef.current.focus();
  }, [componentId]);

  const initialValues = { username: '' };
  const validSchema = Yup.object({
    username: Yup.string().required('User Name is required'),
  });

  return (
    <View flex padding-15 bg-white style={{ marginTop: Platform.OS === 'ios' ? 140 : 0 }}>
      <Formik
        innerRef={formikRef}
        initialValues={initialValues}
        validationSchema={validSchema}
        onSubmit={(values) => {
          updateUser({ ...userCreateTemp, name: values.username });
          nav.push(componentId, 'UserEmailScreen');
        }}>
        {({ handleChange, values, errors }) => (
          <View padding-10>
            <TextField
              ref={userNameTextInputRef}
              title={'your name?:'}
              titleColor={Colors.green10}
              placeholder={'your password'}
              underlineColor={Colors.black}
              value={values.username}
              onChangeText={handleChange('username')}
              error={errors.username}
              secureField={true}
            />
          </View>
        )}
      </Formik>
    </View>
  );
};

UserNameScreen.options = {
  topBar: {
    largeTitle: {
      visible: true,
      color: '#000',
    },
  },
};
