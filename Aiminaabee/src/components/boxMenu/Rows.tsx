import React from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { View, Text, Button } from 'react-native-ui-lib';

import { CardMenuType } from './types';

//icons
import { sharedIcon } from '../../utils/icons';

interface MenuRowTypes {
  data: CardMenuType;
  actions: {
    onPressMenu: (id: number | undefined, name: string | undefined) => void;
  };
}

export const TopMenu: React.FC<MenuRowTypes> = ({ data, actions }) => {
  //border styles
  const topStyles = {
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    borderBottomWidth: 0.5,
    borderColor: '#CCD6DD',
  };

  return (
    <TouchableWithoutFeedback onPress={() => actions.onPressMenu(data?.id, data?.name)}>
      <View bg-cardBoxbg row padding-15 style={topStyles}>
        <View style={styles.cardLeft}>
          {!!data.icon && (
            <View marginR-m>
              <Text>{data.icon}</Text>
            </View>
          )}
          {!!data.title && (
            <View marginR-m>
              <Text h1 textColor>
                {data.title}
              </Text>
            </View>
          )}
        </View>
        <View style={styles.cardRight}>
          {data.isRight ? (
            <Text>{data.valueRight}</Text>
          ) : (
            <Text>
              <Text>{sharedIcon('rightArrow')} </Text>
            </Text>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export const MiddleMenu: React.FC<MenuRowTypes> = ({ data, actions }) => {
  return (
    <TouchableWithoutFeedback onPress={() => actions.onPressMenu(data?.id, data?.name)}>
      <View bg-cardBoxbg row padding-15 style={{ borderBottomWidth: 0.5, borderColor: '#CCD6DD' }}>
        <View style={styles.cardLeft}>
          {!!data.icon && (
            <View marginR-m>
              <Text>{data.icon}</Text>
            </View>
          )}
          {!!data.title && (
            <View marginR-m>
              <Text h1 textColor>
                {data.title}
              </Text>
            </View>
          )}
        </View>
        <View style={styles.cardRight}>
          {data.isRight ? (
            <Text>{data.valueRight}</Text>
          ) : (
            <Text>
              <Text>{sharedIcon('rightArrow')} </Text>
            </Text>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export const BottomMenu: React.FC<MenuRowTypes> = ({ data, actions }) => {
  return (
    <TouchableWithoutFeedback onPress={() => actions.onPressMenu(data?.id, data?.name)}>
      <View
        bg-cardBoxbg
        row
        padding-15
        style={{ borderBottomRightRadius: 8, borderBottomLeftRadius: 8 }}>
        <View style={styles.cardLeft}>
          {!!data.icon && (
            <View marginR-m>
              <Text>{data.icon}</Text>
            </View>
          )}
          {!!data.title && (
            <View marginR-m>
              <Text h1 textColor>
                {data.title}
              </Text>
            </View>
          )}
        </View>
        <View style={styles.cardRight}>
          {data.isRight ? (
            <Text>{data.valueRight}</Text>
          ) : (
            <Text>
              <Text>{sharedIcon('rightArrow')} </Text>
            </Text>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

//Bottom View with a boolean to show truthfullness
export const CustomBottomMenu: React.FC<MenuRowTypes> = ({ data, actions }) => {
  return (
    <View style={[styles.card, { borderBottomRightRadius: 12, borderBottomLeftRadius: 12 }]}>
      <View style={styles.cardLeft}>
        {!!data.icon && (
          <View marginR-m>
            <Text>{data.icon}</Text>
          </View>
        )}
        {!!data.title && (
          <View marginR-m>
            <Text h1 textColor>
              {data.title}
            </Text>
          </View>
        )}
      </View>
      <View style={styles.cardRight}>
        {data.isTrue ? (
          <Text style={{ marginRight: 5 }}>{sharedIcon('verified')}</Text>
        ) : (
          <Text style={{ marginRight: 5 }}>-</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#EDF0F2',
    padding: 15,
  },
  cardLeft: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignContent: 'center',
  },
  cardRight: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    alignContent: 'center',
    marginLeft: 15,
  },
  menuNumberText: {
    padding: 20,
    color: 'red',
    zIndex: 1,
  },
});
