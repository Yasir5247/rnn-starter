import React from 'react';
import { View, Text, KeyboardAvoidingView, StyleSheet } from 'react-native';

//formik
import { Formik } from 'formik';
import * as Yup from 'yup';

//apollo
import { useQuery } from '@apollo/client';

//funcs
import { theme } from '../../../components/Styles/theme';

//components
import BeeInput from '../../../components/UI/Components/BeeInput';
import BeeFileUpload from '../../../components/UI/Components/BeeFileUpload';
import FullWidthButton from '../../../components/UI/FullWidthButton';

//constants
const TEXT_INPUT_HEIGHT = 55;

const ShopVerifyScreen = () => {
  const verifySchema = Yup.object({
    idNumber: Yup.string().required('ID Card Number is compulsory'),
    idCopy: Yup.string().required('ID Card Copy is compulsory'),
  });

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ idNumber: '', dCopy: '' }}
        validationSchema={verifySchema}
        onSubmit={async (values) => {
          console.log('values', values);
        }}>
        {({ handleChange, handleSubmit, handleBlur, values, errors, touched, setFieldValue }) => (
          <KeyboardAvoidingView
            behavior="padding"
            style={{ flex: 1 }}
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={85}
            enabled>
            <View style={styles.inputWrapper}>
              <BeeInput
                label={'ID Card Number?'}
                onChangeText={handleChange('idNumber')}
                onBlur={handleBlur('idNumber')}
                value={values.idNumber}
                onTouchError={touched.idNumber}
                onErrors={errors.idNumber}
                padding={10}
                height={TEXT_INPUT_HEIGHT}
                borderBottom={false}
              />
            </View>
            <View style={styles.inputWrapper}>
              <BeeFileUpload
                onErrors={errors.idCopy}
                onPressFileUpload={(file) => {
                  console.log('file-hahah', file);
                  setFieldValue('idCopy', file);
                }}
              />
            </View>
            <View style={styles.buttonWrapper}>
              <FullWidthButton
                radius={35}
                textColor={'#fff'}
                bgColor={'#2C3747'}
                buttonText={'Send Request'}
                isDark={true}
                onPress={() => handleSubmit()}
              />
            </View>
          </KeyboardAvoidingView>
        )}
      </Formik>
    </View>
  );
};

ShopVerifyScreen.options = {
  bottomTabs: {
    visible: false,
    drawBehind: true,
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.CARD_BACKGROUND_COLOR,
    margin: 5,
  },
  inputWrapper: {
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 12,
    padding: 5,
    marginBottom: 5,
  },
  buttonWrapper: {
    height: 55,
  },
});

export default ShopVerifyScreen;
