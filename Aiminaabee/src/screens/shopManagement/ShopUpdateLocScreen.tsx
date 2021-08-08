import _ from 'lodash';
import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Alert,
  Dimensions,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Colors, View, Text, Button, TextField } from 'react-native-ui-lib';
import { NavigationFunctionComponent } from 'react-native-navigation';

//map related
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { request, PERMISSIONS } from 'react-native-permissions';

//navigation
import { useNavigationButtonPress } from 'react-native-navigation-hooks/dist';

//services
import { useServices } from '../../services';

//network requests
import { useQuery } from '@apollo/client';
import { SHOP_LOCATION } from '../../requests/shop';

//custom hooks
import { useUpdateShopLocation } from '../../requests/mutations/shop';

//svg
import { Svg, Image as ImageSvg } from 'react-native-svg';

//remove this
import Icon from 'react-native-vector-icons/AntDesign';
const filterIcon = <Icon name="filter" size={15} />;

//dimentions
let { width } = Dimensions.get('window');

export const ShopUpdateLocScreen: NavigationFunctionComponent = ({
  componentId,
  shopId,
  shopName,
  avatar,
}: any) => {
  //services
  const { nav, t } = useServices();

  //custom hooks
  const { mutate: updateShopLocation } = useUpdateShopLocation();

  //Initial Location
  const [focusedlocation, setFocusedlocation] = useState();

  //choosen location
  const [isLocationChosen, setIsLocationChosen] = useState(false);

  //references
  const mapReference = useRef<any>(null);
  const markerRef = useRef<any>(null);

  //get the shop location
  const { loading, data } = useQuery(SHOP_LOCATION, {
    variables: { shopId: shopId },
    fetchPolicy: 'no-cache',
    onCompleted: (data) => {
      const cords = { ...data.getShopLocation.cords };
      setFocusedlocation(cords);
      requestPermissionLocation();
    },
  });

  useEffect(() => {
    if (focusedlocation) {
      animateToRegion();
    }
  }, [focusedlocation]);

  const animateToRegion = () => {
    if (mapReference.current) {
      mapReference.current.animateCamera(
        {
          center: {
            latitude: focusedlocation.latitude,
            longitude: focusedlocation.longitude,
          },
          zoom: 18,
        },
        1000,
      );
      setIsLocationChosen(true);
    }
  };

  //button press
  useNavigationButtonPress(
    async () => {
      await updateShopLocation({
        variables: {
          shopId: shopId,
          longitude: focusedlocation.longitude,
          latitude: focusedlocation.latitude,
        },
      });
      //send screen back to main page
      nav.pop(componentId);
    },
    componentId,
    'updateSloc',
  );

  const locateCurrentPossition = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        let region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.003,
          longitudeDelta: 0.003,
        };
        setFocusedlocation(region);
      },
      (error) => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 2000, maximumAge: 1000 },
    );
  };

  const setInitialPosition = () => {
    if (data) {
      const { longitude, latitude } = data?.getShopLocation?.cords;
      if (longitude && latitude) {
        setFocusedlocation({
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
          latitudeDelta: 0.003,
          longitudeDelta: 0.003,
        });
      } else {
        locateCurrentPossition();
      }
    }
  };

  const requestPermissionLocation = async () => {
    if (Platform.OS === 'ios') {
      const response = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      if (response === 'granted') {
        setInitialPosition();
      }
    } else {
      const response = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      if (response === 'granted') {
        setInitialPosition();
      }
    }
  };

  //This function is called after changin the marker
  const pickLocationHandler = (event: any) => {
    const cords = event.nativeEvent.coordinate;

    console.log('picked longitude', cords.longitude);
    console.log('picked latitude', cords.latitude);

    const new_longitude = cords.longitude;
    const new_latitude = cords.latitude;

    // console.log('picked longitude', new_longitude);
    // console.log('picked latitude', new_latitude);

    let newPossition = {
      ...focusedlocation,
      longitude: parseFloat(cords.latitude),
      latitude: parseFloat(cords.longitude),
    };
    setFocusedlocation(newPossition);
    console.log('focused location in picker', focusedlocation);
    setIsLocationChosen(true);
  };

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
        ref={mapReference}
        liteMode={true}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={focusedlocation}
        region={focusedlocation}
        onRegionChangeComplete={handleRegionChangeComplete}
        onPress={pickLocationHandler}
        loadingEnabled={true}
        showsUserLocation={true}>
        {isLocationChosen ? (
          <Marker
            ref={markerRef}
            draggable
            tracksViewChanges={false}
            coordinate={focusedlocation}
            onDragEnd={pickLocationHandler}>
            <Callout>
              <Text style={styles.calloutText}>{shopName}</Text>
              <View style={styles.calloutView}>
                <Svg width={200} height={120}>
                  <ImageSvg
                    width={'100%'}
                    height={'100%'}
                    preserveAspectRatio="xMidYMid slice"
                    href={{ uri: avatar }}
                  />
                </Svg>
              </View>
            </Callout>
          </Marker>
        ) : null}
      </MapView>
      <View style={styles.locateMeButton}>
        <TouchableOpacity onPress={() => locateCurrentPossition()}>
          <View style={styles.lbutton}>
            <Text>{filterIcon}</Text>
            <Text> locate me </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

ShopUpdateLocScreen.options = {
  bottomTabs: {
    visible: false,
    drawBehind: true,
  },
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    flex: 1,
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
  locateMeButton: {
    position: 'absolute',
    bottom: 0,
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: width - 20,
    padding: 10,
    borderWidth: 0.5,
    borderRadius: 4,
    borderColor: '#A6A9AC',
    backgroundColor: '#ECF1F4',
  },
  lbutton: {
    flexDirection: 'row',
  },
});
