import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { postData } from './Components/ApiService';
import Api from './Components/Api';

const SignUp = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');

  const handleSignUp = async () => {
    try {
      const response = await postData(Api.SIGNUP, { name, email, password, mobile });
      if (response.message) {
        alert('Signup successful!');
        navigation.replace('Login');  // Navigate to LoginScreen
      }
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Mobile"
        value={mobile}
        onChangeText={setMobile}
        maxLength={10}
      />
      
      {/* Sign Up Button with TouchableOpacity */}
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

     <View style={{ flexDirection: 'row', marginTop: 20 }}>
             <Text>Already have an account?</Text>
             <TouchableOpacity onPress={() => navigation.replace('Login')}>
               <Text style={{ color: 'blue' }}>Login</Text>
             </TouchableOpacity>
           </View> 
    </View>
  );
};

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
  loginText: {
    color: 'blue',
    textAlign: 'center',
  },
});

export default SignUp;
