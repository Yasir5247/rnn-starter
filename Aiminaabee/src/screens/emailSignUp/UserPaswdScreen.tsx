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

export const UserPasswordScreen: NavigationFunctionComponent = ({ componentId }) => {
  //refs
  const formikRef: any = useRef();
  const userPasswordRef: any = useRef(null);

  //services
  const { nav, t } = useServices();

  //local state mutation
  const { updateUser } = userRegisterMutations;
  const userCreateTemp = userCreateTempVar();

  //button press
  useNavigationButtonPress(() => formikRef.current.handleSubmit(), componentId, 'next');

  useEffect(() => {
    userPasswordRef.current.focus();
  }, [componentId]);

  const initialValues = { userpswd: '' };
  const validSchema = Yup.object({
    userpswd: Yup.string().required('User password is required'),
  });

  return (
    <View flex padding-15 bg-white style={{ marginTop: Platform.OS === 'ios' ? 140 : 0 }}>
      <Formik
        innerRef={formikRef}
        initialValues={initialValues}
        validationSchema={validSchema}
        onSubmit={(values) => {
          updateUser({ ...userCreateTemp, password: values.userpswd });
          nav.push(componentId, 'UploadPictureScreen');
        }}>
        {({ handleChange, values, errors }) => (
          <View padding-10>
            <TextField
              ref={userPasswordRef}
              title={'your secrete?:'}
              titleColor={Colors.green10}
              placeholder={'secret here'}
              underlineColor={Colors.black}
              value={values.userpswd}
              onChangeText={handleChange('userpswd')}
              error={errors.userpswd}
              secureField={true}
            />
          </View>
        )}
      </Formik>
    </View>
  );
};

UserPasswordScreen.options = {
  topBar: {
    largeTitle: {
      visible: true,
    },
  },
};
