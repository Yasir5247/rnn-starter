import React, { useEffect, useRef, useState } from 'react';
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

//custom hooks
import { useUpdateUser } from '../../../requests/mutations/user';

export const UserBioEditScreen: NavigationFunctionComponent = ({ componentId }) => {
  //services
  const { nav, t } = useServices();

  //state
  const [isLoading, setIsloading] = useState<boolean>(false);

  //apollo
  const apolloClient = useApolloClient();

  const formikRef = useRef<any>();
  const userBioEditTextRef = useRef<any>();

  //hooks
  const { mutate: updateUser } = useUpdateUser();
  const authUser = apolloClient.readQuery<AuthUser>({ query: AUTH_USER });

  //button press
  useNavigationButtonPress(() => nav.pop(componentId), componentId, 'cancel');

  const validSchema = Yup.object({ userBio: Yup.string() });

  return (
    <View flex-1 bg-bgColor>
      <ScrollView contentInsetAdjustmentBehavior="always">
        <Formik
          innerRef={formikRef}
          initialValues={{ userBio: authUser?.authUser.bio ?? '' }}
          validationSchema={validSchema}
          onSubmit={async (values: { userBio: string }) => {
            console.log('bio', values.userBio);
            try {
              setIsloading(true);
              await updateUser({
                variables: {
                  bio: values.userBio,
                },
              });
              setIsloading(false);
              nav.pop(componentId);
            } catch (err) {
              setIsloading(false);
            }
          }}>
          {({ handleChange, handleBlur, values, errors, touched, handleSubmit }) => (
            <View bg-bgColor padding-20>
              <TextField
                ref={userBioEditTextRef}
                title={'userBio:'}
                titleColor={Colors.green10}
                placeholder={'your bio'}
                underlineColor={Colors.black}
                value={values.userBio}
                onChangeText={handleChange('userBio')}
                autoCapitalize="none"
                error={errors.userBio}
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

UserBioEditScreen.options = {
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
