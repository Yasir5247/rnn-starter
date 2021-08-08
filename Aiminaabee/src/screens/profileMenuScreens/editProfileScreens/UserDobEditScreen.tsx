import React, { useRef, useState } from 'react';
import { Colors, View, Button } from 'react-native-ui-lib';
import { ScrollView } from 'react-native';
import { NavigationFunctionComponent } from 'react-native-navigation';

import { Formik } from 'formik';
import { BeeDatePicker } from '../../../components/comon/BeeDatePicker';

//services
import { useServices } from '../../../services';

//custom hooks
import { useUpdateUser } from '../../../requests/mutations/user';

//Navigation
import { useNavigationButtonPress } from 'react-native-navigation-hooks/dist';

import { useApolloClient } from '@apollo/client';
import { AUTH_USER } from '../../../requests/users';
import { AuthUser } from '../../../requests/__generated__/AuthUser';

export const UserDobEditScreen: NavigationFunctionComponent = ({ componentId }) => {
  //services
  const { nav, t } = useServices();

  //state
  const [isLoading, setIsloading] = useState<boolean>(false);

  //apollo
  const apolloClient = useApolloClient();
  const formikRef = useRef<any>();

  //hooks
  const { mutate: updateUser } = useUpdateUser();
  const authUser = apolloClient.readQuery<AuthUser>({ query: AUTH_USER });

  //button press
  useNavigationButtonPress(() => nav.pop(componentId), componentId, 'cancel');

  return (
    <View flex-1 bg-bgColor>
      <ScrollView contentInsetAdjustmentBehavior="always">
        <Formik
          innerRef={formikRef}
          initialValues={{ userdob: authUser?.authUser.dateOfBirth }}
          onSubmit={async (values) => {
            console.log('hellow', values);
            try {
              setIsloading(true);
              await updateUser({
                variables: {
                  dateOfBirth: values.userdob,
                },
              });
              setIsloading(false);
              nav.pop(componentId);
            } catch (err) {
              setIsloading(false);
            }
          }}>
          {({ values, setFieldValue, errors, handleSubmit }) => (
            <View bg-bgColor padding-20>
              <BeeDatePicker
                data={{
                  value: new Date(values.userdob),
                  maxDate: null,
                  mode: 'date',
                  name: 'userdob',
                  onErrors: errors.userdob,
                }}
                actions={{
                  handleDateChange: (name: string, val: any) => setFieldValue(name, val),
                }}
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

UserDobEditScreen.options = {
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
