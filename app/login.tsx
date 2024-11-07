import { Image, View, StyleSheet, TextInput, TouchableOpacity, Text, Keyboard } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string>('');

  const handleLogin = async () => {
    Keyboard.dismiss();
    setError(''); 
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in:', email);
      router.push('/'); // Navigate to home
    } catch (err) {
      const errorMessage = (err as { message: string }).message;
      console.error('Login error:', errorMessage);
      setError(errorMessage); 
    }
  };

  const handleSignUp = async () => {
    Keyboard.dismiss();
    setError(''); 
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log('User signed up:', email);
      router.push('/'); // Navigate to home
    } catch (err) {
      const errorMessage = (err as { message: string }).message;
      console.error('Sign Up error:', errorMessage);
      setError(errorMessage); 
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/WTM-Logo.png')}
        style={styles.logo}
      />
      <Text style={styles.title}>Login</Text>

      {/* Error message display */}
      {error ? <Text style={styles.error}>{error}</Text> : null}

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
  error: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
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
