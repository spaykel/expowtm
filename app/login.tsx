import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, GestureResponderEvent } from 'react-native';
import { useRouter } from 'expo-router';

export default function Login() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');  // Added username state
  const [errorMessage, setErrorMessage] = useState('');

  const backendUrl = 'http://192.168.1.110:8080'; // Use your server's IP and port

  const handleLogin = async () => {
    console.log('here');
    console.log('Password:', password);
    console.log('Username:', username);  // Log username for debugging
  
    try {
      const response = await fetch(`${backendUrl}/api/user/login`, {
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
        // If login is successful, parse the response as JSON and handle user data
        const data = JSON.parse(textResponse);
        console.log('Login Response:', data);
  
        // For example, save user info in state or navigate to a new screen
        // setUser(data);  // Save user data in the frontend state (optional)
  
        // Redirect to home screen or dashboard after successful login
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
    throw new Error('Function not implemented.');
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
        placeholder="Username"  // Added username placeholder
        placeholderTextColor="#999"
        value={username}  // Bind username state
        onChangeText={setUsername}  // Set username on input change
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
  error: {
    color: 'red',
    marginTop: 10,
    fontSize: 14,
  },
});
