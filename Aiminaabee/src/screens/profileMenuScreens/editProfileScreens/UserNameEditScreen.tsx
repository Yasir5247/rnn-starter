import React, { useRef, useState } from 'react';
import { Colors, View, Button, TextField } from 'react-native-ui-lib';
import { ScrollView } from 'react-native';
import { NavigationFunctionComponent } from 'react-native-navigation';

import { Formik } from 'formik';
import * as Yup from 'yup';

import { useApolloClient } from '@apollo/client';
import { AUTH_USER } from '../../../requests/users';
import { AuthUser } from '../../../requests/__generated__/AuthUser';

//services
import { useServices } from '../../../services';

//Navigation
import { useNavigationButtonPress } from 'react-native-navigation-hooks/dist';

//Custom hooks
import { useUpdateUser } from '../../../requests/mutations/user';

export const UserNameEditScreen: NavigationFunctionComponent = ({ componentId }) => {
  //services
  const { nav, t } = useServices();

  //state
  const [isLoading, setIsloading] = useState<boolean>(false);

  //apollo
  const apolloClient = useApolloClient();

  //formik
  const formikRef = useRef<any>();
  const userNameEditTextRef = useRef<any>();

  //hooks
  const { mutate: updateUser } = useUpdateUser();
  const authUser = apolloClient.readQuery<AuthUser>({ query: AUTH_USER });

  //button press
  useNavigationButtonPress(() => nav.pop(componentId), componentId, 'cancel');

  const validSchema = Yup.object({
    userName: Yup.string().required('User name is required'),
  });

  return (
    <View flex-1 bg-bgColor>
      <ScrollView contentInsetAdjustmentBehavior="always">
        <Formik
          innerRef={formikRef}
          initialValues={{ userName: authUser!.authUser.name }}
          validationSchema={validSchema}
          onSubmit={async (values: { userName: string }) => {
            try {
              setIsloading(true);
              await updateUser({
                variables: {
                  name: values.userName,
                },
              });
              setIsloading(false);
              nav.pop(componentId);
            } catch (err) {
              setIsloading(false);
              console.log('err3', Object.values(err));
            }
          }}>
          {({ handleChange, values, errors, handleSubmit }) => (
            <View bg-bgColor padding-20>
              <TextField
                ref={userNameEditTextRef}
                title={'user name:'}
                titleColor={Colors.green10}
                placeholder={'your name'}
                underlineColor={Colors.black}
                value={values.userName}
                onChangeText={handleChange('userName')}
                autoCapitalize="none"
                error={errors.userName}
              />
              <View marginT-10 style={{ height: 40 }}>
                <Button
                  bg-btnBg
                  br20
                  label={t.do('section.appWideButtons.button.update')}
                  onPress={() => handleSubmit()}
                />
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
};

UserNameEditScreen.options = {
  topBar: {
    largeTitle: {
      visible: true,
    },
  },
  bottomTabs: {
    visible: false,
    drawBehind: true,
  },
};
