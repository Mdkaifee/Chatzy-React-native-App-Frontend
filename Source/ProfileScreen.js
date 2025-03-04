import React from 'react';
import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen({navigation}) {
  
  const removeToken = async () => {
    try {
      console.log('Removing token...');
      await AsyncStorage.removeItem('authToken');  // Ensure the key matches
      console.log('Token removed successfully.');
      navigation.replace('Login');  // Navigate to Login screen after removing token
    } catch (error) {
      console.error('Error removing token:', error);
    }
  };
  

  const handleLogoutPress = () => {
    Alert.alert('Log Out', 'Are you sure you want to log out?', [
      {
        text: 'Cancel',
        style: 'cancel', // Cancel button
      },
      {
        text: 'Log Out',
        onPress: removeToken, // Proceed with removing token on confirmation
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogoutPress}>
        <Image source={require('../Src/Icon/logout.png')} style={styles.icon} />
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>

      <View style={styles.line} />
      <TouchableOpacity
        style={styles.changeProfileButton}
        onPress={() => navigation.navigate('AboutUs')}>
        <Image source={require('../Src/Icon/info.png')} style={styles.icon} />
        <Text>About Us</Text>
      </TouchableOpacity>
      <View style={styles.line} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoutButton: {
    marginTop: 20,
    paddingVertical: 10,
    width: '100%',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  changeProfileButton: {
    paddingVertical: 10,
    width: '100%',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  logoutText: {
    color: 'black',
    fontSize: 16,
  },
  changeProfileText: {
    color: 'black',
    fontSize: 16,
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: 'black',
    marginVertical: 10,
  },
});
