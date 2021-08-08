import React, { useState } from "react";
import { View, StyleSheet, Text } from 'react-native';
import { Navigation } from 'react-native-navigation';

import { Formik } from 'formik';
import * as Yup from "yup";

//hooks
import { useMakeComment } from '../../../requests/mutations/comments';

//components
import ImageLoader from '../../../components/Common/ImageLoader';
import BeeTextArea from '../../../components/UI/Components/BeeTextArea';
import FullWidthButton from '../../../components/UI/FullWidthButton';



const OrderFeedBackScreen = ({ componentId, productId, productName, productImage }) => {

    //state
    const [loading, setLoading] = useState(false);

    //hooks
    const { mutate: makeComment } = useMakeComment();

    return (
        <View style={styles.container}>
            <View style={styles.orderProductsContainer}>
                <View style={styles.productHeader}>
                    <View style={styles.imageBox}>
                        <ImageLoader
                            style={styles.imageStyle}
                            imageStyle={{ borderRadius: 100 }}
                            source={{ uri: productImage }}
                        />
                    </View>
                    <View style={{ flex: 1, paddingLeft: 8, justifyContent: 'center' }}>
                        <Text style={{ color: '#000' }}>{productName}</Text>
                    </View>
                </View>
                <View style={styles.inputWrapper}>
                    <Formik
                        initialValues={{ feedback: '' }}
                        validationSchema={Yup.object().shape({ feedback: Yup.string().required("Input Required") })}
                        onSubmit={async values => {
                            //fire of the feedback
                            setLoading(true);
                            await makeComment({ variables: { productId: productId, body: values.feedback } });
                            setLoading(false);
                            //take back to the screen
                            Navigation.pop(componentId);
                        }}
                    >
                        {({ handleChange, handleBlur, values, errors, touched, handleSubmit }) => (
                            <View style={styles.controlsContainer}>
                                <View style={styles.inputWrapper}>
                                    <BeeTextArea
                                        label={"Your feedback here"}
                                        onChangeText={handleChange('feedback')}
                                        onBlur={handleBlur('feedback')}
                                        value={values.feedback}
                                        onTouchError={touched.feedback}
                                        onErrors={errors.feedback}
                                        padding={10}
                                        borderBottom={false}
                                    />
                                </View>
                                <View style={[styles.buttonContainer]}>
                                    <View style={{ height: 50, marginTop: 10 }}>
                                        <FullWidthButton
                                            radius={25}
                                            textColor={'#fff'}
                                            bgColor={'#2C3747'}
                                            buttonText={'Submit Feedback'}
                                            isDark={true}
                                            loadingStatus={loading}
                                            onPress={() => handleSubmit()}
                                        />
                                    </View>
                                </View>
                            </View>
                        )}
                    </Formik>
                </View>
            </View>
        </View>
    )
}



OrderFeedBackScreen.options = {
    bottomTabs: {
        visible: false,
        drawBehind: true,
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f2f2f2",
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    orderProductsContainer: {
        padding: 10,
        backgroundColor: '#FFF',
        borderRadius: 10
    },
    productHeader: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#f2f2f2'
    },
    imageBox: {
        width: 55,
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
    },
    imageStyle: {
        width: 40,
        height: 40,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: '#fbfcfb'
    },
});


export default OrderFeedBackScreen;

