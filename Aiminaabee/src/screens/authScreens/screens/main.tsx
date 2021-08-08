import React from 'react';
import { View, Button, Text } from 'react-native-ui-lib';
import { NavigationFunctionComponent } from 'react-native-navigation';

//services
import { useServices } from '../../../services';

import { LogoSection } from '../components/LogoSection';
import { PhotoSection } from '../components/PhotoSection';
import { LoginSection } from '../components/LoginSection';
import { PrivacySection } from '../components/PrivacySection';

export const MainScreen: NavigationFunctionComponent = ({ componentId }) => {
  //services
  const { nav, t } = useServices();

  return (
    <View flex-1>
      <View flex center>
        <LogoSection appName={'Aiminaabee'} appDescription={'Connecting Shops'} />
      </View>
      <View flex-1>
        <PhotoSection />
        <LoginSection handleLogin={() => nav.push(componentId, 'SignInScreen')} />
      </View>
      <View flex center>
        <View center style={{ height: 40, width: '80%' }}>
          <View style={{ height: 40, width: '100%' }}>
            <Button
              bg-btnBg
              br20
              label={t.do('section.navigation.button.signUp')}
              onPress={() => nav.push(componentId, 'UserNameScreen')}
            />
          </View>
        </View>
        <PrivacySection />
      </View>
    </View>
  );
};
