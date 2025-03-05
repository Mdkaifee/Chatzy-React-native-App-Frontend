import React, {useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {postData} from './Components/ApiService'; // Assuming you have postData function
import Api from './Components/Api'; // Import your API endpoints
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // To handle loading state

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in both fields');
      return;
    }

    setLoading(true); // Show loading indicator while the request is being processed

    try {
      const payload = {email, password};

      // Call API to handle login
      const response = await postData(Api.LOGIN, payload);

      if (response && response.token) {
        // Save the token and userId to AsyncStorage
        await AsyncStorage.setItem('token', response.token);
        await AsyncStorage.setItem('userId', response.userId);
        AsyncStorage.setItem('isLoggedIn', 'true');

        // Navigate to Home screen after login
        navigation.replace('Home');

        // Log the token and userId after the response is handled
        console.log(
          'Sent token and userId to Home:',
          response.token,
          response.userId,
        );
      } else {
        Alert.alert(
          'Login failed',
          response.errorMessage || 'An error occurred',
        );
      }
    } catch (error) {
      Alert.alert('Login failed', 'Please try again later');
    } finally {
      setLoading(false); // Hide loading indicator after the request completes
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
      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={loading}>
        {loading ? (
          <ActivityIndicator size="small" color="#fff" /> // Show loading spinner while request is in progress
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
