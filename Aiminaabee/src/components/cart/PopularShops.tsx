import React from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { Colors, Button } from 'react-native-ui-lib';

//apollo
import { useQuery } from '@apollo/client';
import { POPULAR_SHOPS } from '../../requests/popularThings';

//services
import { useServices } from '../../services';

//components
import { ImageLoader } from '../comon/ImageLoader';

interface PopularShopsProps {
  actions: {
    toggleFollowShop: (shopId: number, status: any) => void;
  };
}

export const PopularShops: React.FC<PopularShopsProps> = ({ actions }) => {
  //services
  const { nav, t } = useServices();

  //query
  const { loading, data } = useQuery(POPULAR_SHOPS);

  if (loading) {
    return <ActivityIndicator style={{ margin: 5 }} size="large" color={'black'} />;
  }

  const borderTopRadius = {
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    borderBottomWidth: 0.5,
  };

  const borderBottomRadius = {
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 12,
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text>Brows Popular Shops</Text>
      </View>
      <View style={styles.cardContainer}>
        {data?.popularShops
          ? data?.popularShops.map((shop: any, x: number) => (
              <View
                style={[
                  styles.card,
                  x === 0 ? borderTopRadius : null,
                  x === data.popularShops.length - 1 ? borderBottomRadius : null,
                ]}>
                <View style={styles.cardLeft}>
                  <ImageLoader
                    style={{ width: 30, height: 30 }}
                    imageStyle={{ borderRadius: 100 }}
                    source={{ uri: shop.picture }}
                  />
                </View>
                <View style={styles.cardCenter}>
                  <Text>{shop.name.substring(0, 15)}</Text>
                </View>
                <View style={styles.cardRight}>
                  <Button
                    bg-btnBg
                    br20
                    label={t.do('section.appWideButtons.button.follow')}
                    onPress={() => actions.toggleFollowShop(shop.id, false)}
                  />
                </View>
              </View>
            ))
          : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    paddingTop: 10,
    paddingLeft: 10,
  },
  cardContainer: {
    padding: 10,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#EDF0F2',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    borderBottomWidth: 0.5,
    borderColor: '#CCD6DD',
    padding: 15,
    height: 65,
  },
  cardLeft: {
    width: '15%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignContent: 'center',
  },
  cardCenter: {
    width: '50%',
  },
  cardRight: {
    width: '35%',
    justifyContent: 'center',
    alignContent: 'center',
  },
});
