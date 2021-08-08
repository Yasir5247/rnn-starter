import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

//components
import { PictureUploadSection } from './PictureUploadSection';
import { DefaultPictureSelection } from './DefaultPictureSelection';
import { imageSelectionType, PictureType, picturePropType } from '../../../models/picture';

interface ShopPicView {
  data: {
    image: imageSelectionType;
    loading: boolean;
  };
  actions: {
    handleGallerySelection: (selection: imageSelectionType) => void;
    handleDefultSelection: (selection: imageSelectionType) => void;
  };
}

export const ShopPictureUploadView: React.FC<ShopPicView> = ({ data, actions }) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerSection}>
        <Text style={styles.headerText}> Update Picture for your Shop </Text>
      </View>
      <View style={styles.pictureSection}>
        <PictureUploadSection data={data} actions={actions} />
      </View>
      <View style={styles.defaultPictureSection}>
        <DefaultPictureSelection actions={actions} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerSection: {
    height: 80,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  pictureSection: {
    height: 250,
  },
  defaultPictureSection: {
    height: 250,
  },
  headerText: {
    color: '#000',
    fontSize: 16,
  },
});
