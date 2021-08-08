import React from 'react';
import { View, Text, TouchableWithoutFeedback, StyleSheet, Image } from 'react-native';

const userRatingRow = (props) => {
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={props.showUser.bind(this, props.user_id, props.user_name)}>
        <View>
          <Image
            style={{ width: 40, height: 40, borderRadius: 100 }}
            source={{ uri: props.profile_photo }}
          />
        </View>
      </TouchableWithoutFeedback>
      <View style={styles.body}>
        <Text>
          <Text style={{ color: 'blue', fontWeight: 'bold', marginLeft: 5 }}>
            {props.user_name}
          </Text>
          <Text style={{ color: '#000', marginLeft: 5 }}> {props.comment}</Text>
        </Text>
        <View>
          <Text>3m ago </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 10,
  },
  body: {
    flex: 1,
    paddingLeft: 10,
    flexDirection: 'column',
  },
});

export default userRatingRow;
