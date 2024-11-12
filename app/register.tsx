import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Ionicons} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';
import Login from './login';

const Register = () => {
  const navigation = useNavigation();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    age: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = () => {
    // Handle form submission logic here
    router.push("/login")
    console.log("User Registered:", form);
  };

  return (
    <View style={styles.container}>

        <TouchableOpacity style={styles.backButton} onPress={() => router.push('/login')}>
        <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>

        <Animated.Image entering={FadeInUp.delay(300).duration(2000)}source={require('@/assets/images/beer.png')} style={[styles.beerSign, styles.topLeft]}/>
        <Animated.Image entering={FadeInUp.delay(300).duration(2000)} source={require('@/assets/images/beer.png')} style={[styles.beerSign, styles.topRight]}/>
      <Text style={styles.headerText}>Sign Up</Text>
      
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={form.firstName}
        onChangeText={(value) => handleInputChange('firstName', value)}
      />

      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={form.lastName}
        onChangeText={(value) => handleInputChange('lastName', value)}
      />

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={form.username}
        onChangeText={(value) => handleInputChange('username', value)}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={form.email}
        keyboardType="email-address"
        onChangeText={(value) => handleInputChange('email', value)}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={form.password}
        secureTextEntry={true}
        onChangeText={(value) => handleInputChange('password', value)}
      />

      <TextInput
        style={styles.input}
        placeholder="Age"
        value={form.age}
        keyboardType="numeric"
        onChangeText={(value) => handleInputChange('age', value)}
      />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    padding: 10,
    top: 45,
    left: 15,
    zIndex: 10
  },
  headerText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    color: '#00000',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  beerSign: {
    width: 150,
    height: 150,
    position: 'absolute',
  },
  topLeft: {
    top: 50,
    left: 20,
  },
  topRight: {
    top: 50,
    right: 20,
  },
  bottomLeft: {
    bottom: 20,
    left: 20,
  },
  bottomRight: {
    bottom: 20,
    right: 20,
  },
  button: {
    backgroundColor: '#6200EE',  
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Register;
