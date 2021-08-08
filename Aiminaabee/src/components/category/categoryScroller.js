import React from 'react';
import { View, Text, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';

import { theme } from '../../../components/Styles/theme';
import ImageLoader from '../../../components/Common/ImageLoader';


const categoryScroller = ({ data, showCat }) => {

    const { id, category_image, category_name, subCats } = data;

    return (

        <TouchableWithoutFeedback onPress={showCat.bind(this, id, category_name, subCats)}>
            <View style={styles.CatHolder}>
                <View style={styles.catImageWrapper}>
                    <ImageLoader
                        style={{ width: 50, height: 50, borderRadius: 100 }}
                        imageStyle={{ borderRadius: 100 }}
                        source={{ uri: category_image }}
                    />
                </View>
                <View style={styles.textWrapper}>
                    <Text style={styles.catNameText}>{category_name.substring(0, 12)} </Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )

};


const styles = StyleSheet.create({

    CatHolder: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 7
    },
    catImageWrapper: {
        width: 55,
        height: 55,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: '#000'
    },
    catNameText: {
        color: theme.PRIMARY_FONT_COLOR,
        fontSize: theme.FONT_SIZE_SMALL,
        fontFamily: theme.DEFAULT_FONT_MEDIUM
    }

});

export default categoryScroller;