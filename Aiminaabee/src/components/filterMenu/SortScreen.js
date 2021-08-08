import React from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
import { theme } from '../../../components/Styles/theme';




const sortScreen = () => {


    return (
        <View style={styles.container} >
            <TouchableWithoutFeedback onPress={() => { }}>
                <View style={styles.priceRow}>
                    <View>
                        <Text style={styles.priceText}> Price: Hight to Low</Text>
                    </View>
                    <View>
                        <Text>right</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => { }}>
                <View style={styles.priceRow}>
                    <View>
                        <Text style={styles.priceText}> Price: Low to High</Text>
                    </View>
                    <View>
                        <Text>right</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </View >
    );


}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    priceRow: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    priceText: {
        color: theme.PRIMARY_FONT_COLOR,
        fontFamily: theme.DEFAULT_FONT_BOLD
    }
})



export default sortScreen;
