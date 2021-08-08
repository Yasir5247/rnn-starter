import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';

import { useMutation } from '@apollo/client';

import { CHANGE_ORDER_STATUS } from '../../../requests/mutations/order';
import { GET_ORDER_DETAILS } from '../../../requests/orders';

// status_code 1 = Processing
// status_code 2 = Shipped
// status_code 3 = Delivered
// status_code 4 = Cancelled


const shopOrderStatusButton = ({ data }) => {

    const { orderId, status } = data ?? {};

    const [changeOrderStatus, { loading }] = useMutation(CHANGE_ORDER_STATUS);

    return (
        <View style={styles.container}>
            {
                status === 'Processing' ? (
                    <TouchableWithoutFeedback onPress={async () => {
                        try {
                            changeOrderStatus({
                                variables: {
                                    orderId: orderId,
                                    statusId: status === 'Processing' ? 2 : null
                                },
                                refetchQueries: [{
                                    query: GET_ORDER_DETAILS,
                                    variables: { orderId: orderId }
                                }]
                            })
                        } catch (err) {
                            console.log('err2', err)
                            console.log('err3', Object.values(err))
                        }
                    }}>
                        <View style={styles.cardContainer}>
                            <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                                {
                                    loading ?
                                        (<Text style={{ color: '#ccc', fontSize: 14 }}>loading...</Text>)
                                        : (<Text style={{ color: '#ccc', fontSize: 14 }}>Confirm Shipping</Text>)
                                }
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                ) : (
                        <View style={styles.cardContainer}>
                            <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                                {
                                    loading ?
                                        (<Text style={{ color: '#ccc', fontSize: 14 }}>loading...</Text>)
                                        : (<Text style={{ color: '#ccc', fontSize: 14 }}>{status}</Text>)
                                }
                            </View>
                        </View>
                    )
            }

        </View >
    )

};




const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 20
    },
    cardContainer: {
        flexDirection: 'row',
        borderRadius: 12,
        backgroundColor: '#23272A',
        padding: 15,
        marginTop: 10
    }
});



export default shopOrderStatusButton;