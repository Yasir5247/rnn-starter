import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
import { theme } from '../../../components/Styles/theme';

import { useDispatch } from 'react-redux';
import * as filterActions from '../../../store/actions/filterActions';

import { Switch } from 'react-native-ui-lib';


const emptyScreen = ({ text, key, state }) => {

    const dispatch = useDispatch();

    return (
        <View style={styles.container}>
            <View style={styles.filerRowBox}>
                <View>
                    <Text style={styles.priceText}> {text}</Text>
                </View>
                <View>
                    <Switch
                        value={state}
                        onValueChange={() => dispatch(filterActions.changeFilter(key))}
                        onColor={'#000'}
                        offColor={'#ccc'}
                    />
                </View>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    filerRowBox: {
        padding: 15,
        borderBottomWidth: 0.5,
        borderColor: '#f2f2f2',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    priceText: {
        fontSize: 23,
        fontWeight: 'bold',
        color: theme.PRIMARY_FONT_COLOR,
        fontFamily: theme.DEFAULT_FONT_BOLD
    }
})


export default emptyScreen
