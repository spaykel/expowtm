import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, GestureResponderEvent } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');  // Added username state
  const [errorMessage, setErrorMessage] = useState('');

  const backendUrl = "http://192.168.1.63:8080/api/user/login"; // Use your computer's IP address and port

  const handleLogin = async () => {
    console.log('Username:', username);
    console.log('Password:', password);
    
    try {
      const response = await fetch(`${backendUrl}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,  // Send username and password for login
          password,
        }),
      });
  
      const textResponse = await response.text();  // Get the raw text response
      console.log('Raw Response:', textResponse);
  
      if (response.ok) {
        const data = JSON.parse(textResponse);
        await AsyncStorage.setItem('username', data.username);
        await AsyncStorage.setItem('userId', String(data.userId));
        console.log('Login Response:', data);
        router.push('/');
      } else {
        // If login failed, parse the error response
        const errorData = JSON.parse(textResponse);
        setErrorMessage(errorData.message || 'Invalid username or password');
        console.error('Login failed:', errorData.message);
      }
    } catch (error) {
      console.error('Error during login request:', error);
      setErrorMessage('An error occurred. Please try again.');
    }
  };  

  // Sign-up action (to be implemented later)
  function handleSignUp(event: GestureResponderEvent): void {
    router.push('./register');
  }

  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/WTM-Logo.png')}
        style={styles.logo}
      />
      <Text style={styles.title}>Login</Text>

      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}

      <TextInput
        style={styles.input}

        placeholder="Username"
        placeholderTextColor="#999"
        value={username}
        onChangeText={setUsername}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#999"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.signUpButton]} onPress={handleSignUp}>
        <Text style={styles.signUpButtonText}>Sign Up</Text>
      </TouchableOpacity>

      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    height: 200,
    width: 400,
    marginBottom: 40,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 28,
    color: '#fff',
    marginBottom: 20,
    fontFamily: 'Roboto',
    textTransform: 'uppercase',
    letterSpacing: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    padding: 10,
    borderRadius: 5,
  },
  input: {
    width: '100%',
    padding: 15,
    marginBottom: 20,
    borderRadius: 999,
    backgroundColor: '#333',
    color: '#fff',
    fontSize: 16,
  },
  button: {
    width: '75%',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6200EE',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signUpButton: {
    backgroundColor: '#888',
  },
  signUpButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  error: {
    color: 'red',
    marginTop: 10,
    fontSize: 14,
  },
});




