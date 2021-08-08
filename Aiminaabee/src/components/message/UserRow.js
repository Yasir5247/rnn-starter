import React from 'react';
import { View, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import moment from "moment";
import * as func from '../../../utility/utilFuncs';

import { useApolloClient } from '@apollo/client';
import { AUTH_USER } from '../../../requests/users';

import ImageLoader from '../../../components/Common/ImageLoader';

import Icon from 'react-native-vector-icons/Entypo';
import { theme } from '../../../components/Styles/theme';
const dotIcon = <Icon name="dot-single" size={40} color="#2C3747" />;



const userRow = ({ data, actions }) => {


    const lastMessage = data.lastMessage
    const lastMessageDate = data.formattedDate

    const apolloClient = useApolloClient();
    const { authUser } = apolloClient.readQuery({ query: AUTH_USER });

    //conversationId
    const converId = data._id;

    //from user details
    const fromId = data.from.id
    const fromName = data.from.name
    const fromPic = data.from.avatar

    const toId = data.to.id
    const toName = data.to.name
    const toPic = data.to.avatar

    //show other user profile in coversations
    const otherUserId = fromId === authUser.id ? toId : fromId;
    const otherUserName = fromId === authUser.id ? toName : fromName;
    const otherUserAvatar = fromId === authUser.id ? toPic : fromPic;


    return (

        <TouchableWithoutFeedback onPress={() => actions.onItemPressed(converId, otherUserId, otherUserName)}>
            <View style={styles.userSlice}>
                <View style={styles.imageContainer}>
                    <ImageLoader
                        style={{ width: 50, height: 50 }}
                        imageStyle={{ borderRadius: 100 }}
                        source={{ uri: otherUserAvatar }}
                    />
                </View>
                <View style={styles.otherStuffContainer}>
                    <View style={{ width: '90%', paddingLeft: 10 }}>
                        <Text style={styles.messageUserText}>{func.stringCutter(otherUserName, 20)}</Text>
                        <Text style={styles.lastMessageText}>{lastMessage}</Text>
                    </View>
                    <View style={[styles.centerStyle, { width: '10%' }]}>
                        <Text>{lastMessageDate}</Text>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>

    )

};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.CARD_BACKGROUND_COLOR
    },
    userSlice: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderBottomWidth: 1,
        borderColor: '#ccc',
        padding: 10
    },
    imageContainer: {
        width: '15%',
        justifyContent: 'center',
        alignItems: 'center',
        // borderWidth: 1, borderColor: '#000',
    },
    otherStuffContainer: {
        flexDirection: 'row',
        width: '85%',
        // borderWidth: 1, borderColor: '#000',
    },
    messageTextContainer: {
        width: '80%',
    },
    dateContainer: {
        width: '20%',
    },
    messageUserText: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 18,
        fontFamily: theme.DEFAULT_FONT_MEDIUM,
    },
    lastMessageText: {
        color: '#000',
        fontSize: 16,
        fontFamily: theme.DEFAULT_FONT_MEDIUM
    },
    centerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center'
    }

});



export default userRow;



