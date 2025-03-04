import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import { postData } from './Components/ApiService';  // Assuming you have postData function
import Api from './Components/Api';  // Import your API endpoints
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);  // To handle loading state

  const saveToken = async (token) => {
    try {
      await AsyncStorage.setItem('authToken', token);  // Save token to AsyncStorage
      console.log('Token saved successfully!', token);
    } catch (error) {
      console.error('Error saving token:', error);
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in both fields');
      return;
    }

    setLoading(true);  // Show loading indicator while the request is being processed

    try {
      console.log('Email:', email);  // Ensure email and password are correct
      console.log('Password:', password);

      const payload = { email, password };

      // Call API to handle login
      const response = await postData(Api.LOGIN, payload);

      if (response.token) {
        // Save the token after successful login
        await saveToken(response.token);
        AsyncStorage.setItem('isLoggedIn','true')
        // Navigate to the TabNavigator after login
        navigation.replace('Home'); // Replace the current screen with Home
      } else {
        Alert.alert('Login failed', response.errorMessage || 'An error occurred');
      }
    } catch (error) {
      console.error('Login failed:', error);
      Alert.alert('Login failed', 'Please try again later');
    } finally {
      setLoading(false);  // Hide loading indicator after the request completes
    }
  };
  
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {/* Login button */}
      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />  // Show loading spinner while request is in progress
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>

      {/* Signup navigation */}
      <View style={styles.signupContainer}>
        <Text>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('SignUp')}>
          <Text style={styles.signupLink}>Create now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Styling the components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signupLink: {
    color: 'blue',
  },
});

export default LoginScreen;
