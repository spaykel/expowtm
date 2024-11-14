import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, GestureResponderEvent } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


  const backendUrl = "http://192.168.1.219:8080/api/user/login"; // Use your computer's IP address and port

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
          username,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        await AsyncStorage.setItem('username', data.username);
        console.log('Login Response:', data);
        router.push('/'); // Redirect to the home screen or dashboard
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Invalid email or password');
        console.error('Login failed:', errorData.message);
      }
    } catch (error) {
      console.error('Error during login request:', error);
      setErrorMessage('An error occurred. Please try again.');
    }
  };
  
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

      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#999"
        value={username}
        onChangeText={setUsername}
        keyboardType="email-address"
        autoCapitalize="none"
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
});

function setUser(arg0: { username: string; }) {
  throw new Error('Function not implemented.');
}
