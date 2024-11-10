import { Image, View, StyleSheet, TextInput, TouchableOpacity, Text } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';

export default function Login() {
  const router = useRouter(); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const backendUrl = 'https://192.168.1.219:8080'; 

  // Define your API requests inside the handleLogin function
  const handleLogin = async () => {
    console.log('Email:', email);
    console.log('Password:', password);

    // Perform the GET request to test the Spring Boot connection
    try {
      const greetingResponse = await fetch(`${backendUrl}/greeting`);
      const greetingData = await greetingResponse.json();
      console.log('Greeting Data:', greetingData);
    } catch (error) {
      console.error('Error in GET request:', error);
    }

    // Example of a POST request to login endpoint
    // try {
    //   const loginResponse = await fetch(`${backendUrl}/login`, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ email, password }),
    //   });
    //   const loginData = await loginResponse.json();
    //   console.log('Login Response:', loginData);
    // } catch (error) {
    //   console.error('Error in POST request:', error);
    // }

    // Navigate to the home screen after login (or based on the login success)
    router.push('/');
  };

  const handleSignUp = () => {
    console.log('Sign Up');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/WTM-Logo.png')}
        style={styles.logo}
      />
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
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

      {/* Login button */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      
      {/* Sign Up button */}
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
