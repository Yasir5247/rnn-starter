import React from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Image } from 'react-native';

//funcs
import { imagePicker } from '../../../utils/fileUploadFuncs';
import { imageSelectionType, PictureType } from '../../../models/picture';

interface PictureUploadProps {
  data: {
    image: imageSelectionType;
  };
  actions: {
    handleGallerySelection: (selection: imageSelectionType) => void;
  };
}

export const PictureUploadSection: React.FC<PictureUploadProps> = ({ data, actions }) => {
  return (
    <View style={styles.containerTwo}>
      <View style={styles.shopPicture}>
        <Image
          style={{ height: 100, width: 100, borderRadius: 50 }}
          source={{ uri: data.image.image.imagePath }}
        />
      </View>
      <TouchableWithoutFeedback
        onPress={async () => {
          const image = await imagePicker();
          actions.handleGallerySelection({ raw: false, image });
        }}>
        <View style={styles.uploadButton}>
          <Text style={{ color: '#fff', fontWeight: 'bold' }}> Select from Gallery </Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerTwo: {
    flex: 1,
    padding: 10,
    backgroundColor: 'pink',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shopPicture: {
    width: 106,
    height: 106,
    borderRadius: 100,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  uploadButton: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: '#2C2F33',
    borderRadius: 25,
    padding: 10,
  },
});
