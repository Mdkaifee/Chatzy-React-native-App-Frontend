import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {launchImageLibrary} from 'react-native-image-picker'; // Import the image picker
import RNFetchBlob from 'rn-fetch-blob';
import RNFS from 'react-native-fs';
export default function EditProfile() {
  const [profileImage, setProfileImage] = useState(null);
 
const handleImagePick = () => {
    launchImageLibrary({ mediaType: 'photo', includeBase64: false }, response => {
      if (response.didCancel) {
        console.log('User canceled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const filePath = response.assets[0].uri; // Temporary file path
  
        // Use react-native-fs to copy the file to a permanent location
        const newFilePath = RNFS.DocumentDirectoryPath + '/' + response.assets[0].fileName;
  
        RNFS.copyFile(filePath, newFilePath)
          .then(() => {
            console.log('Image copied to permanent location:', newFilePath);
            setProfileImage(newFilePath); // Update the profile image path to the new location
          })
          .catch(err => {
            console.error('Error copying file:', err);
            Alert.alert('Error', 'Failed to copy image to a permanent location');
          });
      }
    });
  };
const handleSave = () => {
    if (profileImage) {
      const imagePath = profileImage; // Permanent file path
  
      RNFetchBlob.fetch('POST', 'http://10.0.2.2:5000/api/auth/uploadProfileImage', {
        timeout: "120000", // 120 seconds timeout (increase as needed)
      }, [
        { name: 'userId', data: 'yourUserId' },  // Include the userId in the request
        { name: 'profileImage', filename: 'profile_image.jpg', data: RNFetchBlob.wrap(imagePath) },  // Wrap the file path correctly
      ])
        .then((response) => {
          console.log('Upload response:', response);
          const data = JSON.parse(response.data); // Parse the server response
      
          if (data.message === 'Profile image uploaded successfully') {
            Alert.alert('Success', 'Profile image uploaded successfully!');
          } else {
            Alert.alert('Error', 'Failed to upload profile image');
          }
        })
        .catch((error) => {
          console.error('Error uploading profile image:', error);
          Alert.alert('Error', 'An error occurred while uploading the profile image.');
        });
      
    } else {
      Alert.alert('No image selected', 'Please upload a profile picture before saving.');
    }
  };
  
 
  return (
    <View style={styles.container}>
      <Text>Edit Profile</Text>

      {/* Show default image if no profile image is uploaded */}
      <TouchableOpacity onPress={handleImagePick}>
      <Image
  source={
    profileImage
      ? { uri: 'file://' + profileImage } // Prefix with 'file://' for local files
      : require('../Src/Icon/Profile.png') // Default image
  }
  style={styles.profileImage}
/>

      </TouchableOpacity>

      {/* Save button */}
      <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
  },
});
