import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { NavigationFunctionComponent } from 'react-native-navigation';

//components
import { EditRow } from '../../components/profile/profileEdit/EditRow';
import { ProfilePictureEdit } from '../../components/profile/profileEdit/ProfilePictureEdit';

//types
import { AuthUser } from '../../requests/__generated__/AuthUser';

//queries
import { useQuery } from '@apollo/client';
import { AUTH_USER } from '../../requests/users';

//services
import { useServices } from '../../services';

export const ProfileEditScreen: NavigationFunctionComponent = ({ componentId }) => {
  //services
  const { nav, t } = useServices();

  const { loading, data } = useQuery<AuthUser>(AUTH_USER);

  if (loading) {
    return <ActivityIndicator style={{ margin: 5 }} size="large" color={'black'} />;
  }

  const { id, name, email, avatar, bio, dateOfBirth } = data!.authUser;

  return (
    <ScrollView style={styles.container}>
      <ProfilePictureEdit
        data={{
          id: id,
          name: name,
          avatar: avatar,
        }}
      />
      <View style={styles.editProfileContainer}>
        <EditRow
          data={{
            title: t.do('section.profile.editScreen.name'),
            selectedValue: name,
          }}
          actions={{
            onMenuPress: () => nav.push(componentId, 'UserNameEditScreen'),
          }}
        />
        <EditRow
          data={{
            title: t.do('section.profile.editScreen.email'),
            selectedValue: email,
          }}
          actions={{
            onMenuPress: () => nav.push(componentId, 'UserEmailEditScreen'),
          }}
        />
        <EditRow
          data={{
            title: t.do('section.profile.editScreen.dob'),
            selectedValue: dateOfBirth,
          }}
          actions={{
            onMenuPress: () => nav.push(componentId, 'UserDobEditScreen'),
          }}
        />
        <EditRow
          data={{
            title: t.do('section.profile.editScreen.bio'),
            selectedValue: bio,
          }}
          actions={{
            onMenuPress: () => nav.push(componentId, 'UserBioEditScreen'),
          }}
        />
      </View>
    </ScrollView>
  );
};

ProfileEditScreen.options = {
  bottomTabs: {
    visible: false,
    drawBehind: true,
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  editProfileContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#F2F2F2',
  },
});
