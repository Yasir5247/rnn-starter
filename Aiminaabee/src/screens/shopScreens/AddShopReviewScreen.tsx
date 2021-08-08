import React from 'react';
import { NavigationFunctionComponent } from 'react-native-navigation';
import { Colors, View, Button, TextField } from 'react-native-ui-lib';
import { Navigation } from 'react-native-navigation';

import { Formik } from 'formik';
import * as Yup from 'yup';

//services
import { useServices } from '../../services';

//navigation
import { useNavigationButtonPress } from 'react-native-navigation-hooks/dist';

//Hooks
import { useCreateShopReview } from '../../requests/mutations/reviews';

//Components
import { BeeRating } from '../../components/comon/BeeRating';

export const AddShopReviewScreen: NavigationFunctionComponent = ({ componentId, shopId }: any) => {
  //services
  const { nav, t } = useServices();

  //hooks
  const { mutate: createShopReview } = useCreateShopReview();

  //navigation buttons
  useNavigationButtonPress(() => nav.pop(componentId), componentId, 'cancelRating');

  const validSchema = Yup.object({
    ratingText: Yup.string().required('Your rating required'),
  });

  return (
    <View flex-1 paddingH-5 bg-bgColor>
      <Formik
        initialValues={{ ratingText: '', rating: 5 }}
        validationSchema={validSchema}
        onSubmit={async (values) => {
          try {
            //create shop review
            await createShopReview({
              variables: {
                shopId: shopId,
                body: values.ratingText,
                rating: values.rating,
              },
            });
            //send user back to the screen
            Navigation.pop(componentId);
          } catch (err) {
            console.log('err2', err);
            console.log('err3', Object.values(err));
          }
        }}>
        {({ handleChange, values, errors, setFieldValue, handleSubmit }) => (
          <>
            <View>
              <TextField
                title={'Add new review'}
                titleColor={Colors.green10}
                placeholder={'review here..'}
                underlineColor={Colors.black}
                value={values.ratingText}
                onChangeText={handleChange('ratingText')}
                autoCapitalize="none"
                error={errors.ratingText}
              />
              <BeeRating
                data={{
                  ratingNumber: values.rating,
                  name: 'rating',
                  reviews: ['Terrible', 'Bad', 'Okay', 'Good', 'Great'],
                  count: 5,
                  size: 30,
                }}
                actions={{
                  handleRatingChange: () => setFieldValue,
                }}
              />
            </View>
            <View marginT-20 style={{ height: 40 }}>
              <Button
                bg-btnBg
                br20
                label={t.do('section.navigation.button.loginIn')}
                onPress={() => handleSubmit()}
              />
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

AddShopReviewScreen.options = {
  bottomTabs: {
    visible: false,
    drawBehind: true,
  },
};
