import React from 'react';
import { View, Text, TouchableWithoutFeedback, StyleSheet, Image, ActivityIndicator } from 'react-native';
import moment from "moment";
import * as func from '../../../utility/utilFuncs';

import { useApolloClient } from '@apollo/client';
import { AUTH_USER } from '../../../requests/users';

import ImageLoader from '../../../components/Common/ImageLoader';

import Icon from 'react-native-vector-icons/Entypo';
import { theme } from '../../../components/Styles/theme';
const dotIcon = <Icon name="dot-single" size={40} color="blue" />;

// import moment from "moment";
// moment(lastMessage.updatedAt).format("MMMM D, YYYY")



const shopUserRow = ({ onItemPressed, data }) => {


    const lastMessage = data.lastMessage
    const lastMessageDate = data.formattedDate

    const apolloClient = useApolloClient();
    const { authUser } = apolloClient.readQuery({ query: AUTH_USER });

    // ---------------------"shop-user"----------------------------- //

    const type = data.type;

    const shopId = data.from.id;
    const shopName = data.from.shop_name;
    const shopAvatar = data.from.shop_picture;

    const userId = data.to.id;
    const userName = data.to.full_name;
    const userAvatar = data.to.avatar;

    // Swith Display
    const diplayName = userId === authUser.id ? shopName : userName;
    const diplayAvatar = userId === authUser.id ? shopAvatar : userAvatar;
    const myShopTag = userId !== authUser.id ? shopName : "";


    return (

        <TouchableWithoutFeedback onPress={onItemPressed.bind(this, data._id, userId, shopId, diplayName)}>
            <View style={styles.userSlice}>
                <View style={styles.imageContainer}>
                    <ImageLoader
                        style={{ width: 50, height: 50 }}
                        imageStyle={{ borderRadius: 100 }}
                        source={{ uri: diplayAvatar }}
                    />
                </View>
                <View style={styles.otherStuffContainer}>
                    {
                        myShopTag ? (
                            <View style={styles.topRowContainer}>
                                <Text style={styles.shopTagText}>{func.stringCutter(myShopTag, 20)}</Text>
                            </View>
                        ) : null
                    }
                    <View style={styles.bottomRowContainer}>
                        <View style={{ width: '90%', paddingLeft: 10 }}>
                            <Text style={styles.messageUserText}>{func.stringCutter(diplayName, 20)}</Text>
                            <Text style={styles.lastMessageText}>{lastMessage}</Text>
                        </View>
                        <View style={[styles.centerStyle, { width: '10%' }]}>
                            <Text>{lastMessageDate}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )

};



const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: '#000',
        backgroundColor: theme.CARD_BACKGROUND_COLOR
    },
    userSlice: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderColor: '#CCC',
        padding: 10
    },
    imageContainer: {
        width: '15%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    otherStuffContainer: {
        flexDirection: 'column',
        width: '85%',
    },
    topRowContainer: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'flex-end',
    },
    bottomRowContainer: {
        flexDirection: 'row'
    },
    shopTagText: {
        color: '#000',
        fontSize: 14,
        fontFamily: theme.DEFAULT_FONT_MEDIUM,
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



export default shopUserRow;