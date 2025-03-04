import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Alert, ImageBackground, StyleSheet } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default async function SplashScreen({ navigation }) {
  const [isConnected, setIsConnected] = useState(null);
  const [message, setMessage] = useState('Chatzy SplashScreen');
  const hasCheckedLogin = useRef(false); // Track if the login check has been done

  useEffect(() => {
    checkConnectionAndNavigate();
    // const isLoggedIn =  AsyncStorage.getItem('isLoggedIn');
    // console.log('User is logged in:', isLoggedIn === 'true');  // Compare to 'true' string
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);

      if (state.isConnected) {
        // If connected, check if the user is logged in and navigate accordingly
        if (!hasCheckedLogin.current) {
          checkIfLoggedIn();
          hasCheckedLogin.current = true; // Set flag to avoid repeated login checks
        }
      } else {
        setMessage('No Internet Connection. Please connect to a stable network.');
        Alert.alert('No Internet Connection', 'Please connect to a stable network.');
      }
    });

    return () => unsubscribe();
  }, []);

  const checkConnectionAndNavigate = async () => {
    const state = await NetInfo.fetch();
    setIsConnected(state.isConnected);

    if (!state.isConnected) {
      setMessage('No Internet Connection. Please connect to a stable network.');
      Alert.alert('No Internet Connection', 'Please connect to a stable network.');
      return;
    } else {
      setMessage('Chatzy SplashScreen');
    }

    // Check if the user is logged in
    if (!hasCheckedLogin.current) {
      checkIfLoggedIn();
      hasCheckedLogin.current = true; // Set flag to avoid repeated login checks
    }
  };
 
  const checkIfLoggedIn = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      console.log('Token found:', token);
  
      if (token) {
        console.log('Logged in token found at splash screen:', token);
        setTimeout(() => {
          navigation.replace('Home');  // Navigate to Home if token exists
        }, 2000);
      } else {
        console.log('No token found, user is not logged in.');
        setTimeout(() => {
          navigation.replace('Login');  // Navigate to Login if token does not exist
        }, 2000);
      }
    } catch (error) {
      console.error('Error checking login status:', error);
      navigation.replace('Login');  // Navigate to Login if error occurs
    }
  };
  
  
  return (
    <ImageBackground source={require('../Src/Icon/image7.jpg')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.splashText}>{message}</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  background: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    zIndex: 1,
    marginTop: '80%',
  },
});
