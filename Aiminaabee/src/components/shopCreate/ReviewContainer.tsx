import React, { useState } from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { View, Button, Text } from 'react-native-ui-lib';

import { CardMenu } from '../sharedBoxMenu';

import Icon from 'react-native-vector-icons/AntDesign';
const upIcon = <Icon name="up" size={15} color="#000" />;
const downIcon = <Icon name="down" size={15} color="#000" />;

const HideContent: React.FC<any> = ({ data }) => {
  return (
    <View>
      {data.map((x: any, i: any) => {
        return (
          <CardMenu
            bg
            key={i}
            control="middle"
            name={`location ${(i += 1)}`}
            rightText={x.name}
            onPressMenu={() => null}
          />
        );
      })}
    </View>
  );
};

const HideShowRow: React.FC<any> = ({ menuName, hideState, onPressHandler }) => {
  return (
    <TouchableWithoutFeedback onPress={onPressHandler}>
      <View row padding-15 bg-bgColor style={{ justifyContent: 'space-between' }}>
        <View>
          <Text>{menuName}</Text>
        </View>
        <View>{hideState ? upIcon : downIcon}</View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const ReviewContainer: React.FC<any> = ({ data }) => {
  const [hide, setHide] = useState(false);

  const { name, type, description, categoryName, contact, deliveryLocations } = data;

  return (
    <View bg-bgColor marginV-10>
      <CardMenu bg control="top" menuName={'Name'} rightText={name} onPressMenu={() => null} />
      <CardMenu
        bg
        control="middle"
        menuName={'Shop Type'}
        rightText={type}
        onPressMenu={() => null}
      />
      <CardMenu
        bg
        control="middle"
        menuName="Description"
        rightText={description}
        onPressMenu={() => null}
      />
      <CardMenu
        bg
        control="middle"
        menuName={'Category'}
        rightText={categoryName}
        onPressMenu={() => null}
      />
      <HideShowRow
        menuName={'Delivery Locations'}
        hideState={hide}
        onPressHandler={() => setHide(!hide)}
      />
      {hide ? <HideContent data={deliveryLocations} /> : null}
      <CardMenu
        bg
        control="bottom"
        menuName={'Contact'}
        rightText={contact}
        onPressMenu={() => null}
      />
    </View>
  );
};

export default ReviewContainer;
