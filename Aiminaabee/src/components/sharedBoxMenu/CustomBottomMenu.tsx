import React from 'react';
import { View, Button, Text } from 'react-native-ui-lib';

import Icon1 from 'react-native-vector-icons/AntDesign';
const verifiedIcon = <Icon1 name="checkcircle" size={25} color="#0062FF" />;

//Custome Components
//Bottom View with a boolean to show truthfullness
export const CustomBottomMenu: React.FC<any> = ({ icon, truth, name }) => {
  const bottomStyle = { borderBottomRightRadius: 12, borderBottomLeftRadius: 12 };

  return (
    <View flex row bg-bgColor style={bottomStyle}>
      <View flex-1 row left>
        <View>
          <Text>{icon}</Text>
        </View>
        <View>
          <Text h1> {name}</Text>
        </View>
      </View>
      <View flex-1 row right>
        {truth ? <Text marginR-5>{verifiedIcon}</Text> : <Text marginR-5>-</Text>}
      </View>
    </View>
  );
};
