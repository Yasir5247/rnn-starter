import React, { useRef } from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';
import { NavigationFunctionComponent } from 'react-native-navigation';
import { View, Text } from 'react-native-ui-lib';

import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import { useQuery } from '@apollo/client';
import { Svg, Image as ImageSvg } from 'react-native-svg';

import { SHOP_LOCATION } from '../../requests/shop';

export const MapScreen: NavigationFunctionComponent = ({ componentId, shopId }: any) => {
  const { loading, data } = useQuery(SHOP_LOCATION, {
    variables: { shopId: shopId },
  });

  //references
  const markerRef = useRef<any>(null);

  const { shopName, shopPicture, cords } = data?.getShopLocation ?? {};

  const handleRegionChangeComplete = () => {
    if (markerRef && markerRef.current && markerRef.current.showCallout) {
      // console.log(markerRef.current);
      markerRef.current.showCallout();
    }
  };

  if (loading) {
    return <ActivityIndicator style={{ margin: 5 }} size="large" color={'black'} />;
  }

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: parseFloat(cords.longitude),
          longitude: parseFloat(cords.latitude),
          latitudeDelta: 0.003,
          longitudeDelta: 0.003,
        }}
        onRegionChangeComplete={handleRegionChangeComplete}>
        <Marker
          ref={markerRef}
          coordinate={{
            latitude: parseFloat(cords.longitude),
            longitude: parseFloat(cords.latitude),
          }}>
          <Callout>
            <Text style={styles.calloutText}>{shopName}</Text>
            <View style={styles.calloutView}>
              <Svg width={200} height={120}>
                <ImageSvg
                  width={'100%'}
                  height={'100%'}
                  preserveAspectRatio="xMidYMid slice"
                  href={{ uri: shopPicture }}
                />
              </Svg>
            </View>
          </Callout>
        </Marker>
      </MapView>
    </View>
  );
};

MapScreen.options = {
  bottomTabs: {
    visible: false,
    drawBehind: true,
  },
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  calloutView: {
    paddingBottom: 10,
    paddingHorizontal: 5,
  },
  calloutText: {
    textAlign: 'center',
    marginBottom: 5,
    fontWeight: '500',
    fontSize: 20,
  },
});
