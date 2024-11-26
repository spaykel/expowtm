import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Switch, ScrollView, StyleSheet } from 'react-native';
import { Entypo, FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Modal from 'react-native-modal';


export default function SettingsScreen() {
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const toggleModal = (option: string | null = null) => {
    setSelectedOption(option);
    setModalVisible(!isModalVisible);
  };

  const handleSignOut = () => {
    console.log("sign out");
    router.push('/login');
  }

  const toggleSwitch = () => setIsDarkMode(previousState => !previousState);
  const navigateToAbout = () => router.push('../(stack)/about');


  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <TouchableOpacity style={styles.item} onPress={() => toggleModal('Notifications')}>
        <View style={styles.iconText}>
          <FontAwesome name="bell-o" size={24} color="#fff" />
          <Text style={styles.text}>Notifications</Text>
        </View>
        <Entypo name="chevron-right" size={24} color="#fff" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.item}onPress={() => toggleModal('Customer Support')}>
        <View style={styles.iconText}>
          <FontAwesome name="question-circle-o" size={24} color="#fff" />
          <Text style={styles.text}>Customer Support</Text>
        </View>
        <Entypo name="chevron-right" size={24} color="#fff" />
      </TouchableOpacity>

      <Modal isVisible={isModalVisible} onBackdropPress={() => toggleModal(null)} style={styles.modal}>
        <View style={styles.popupContainer}>
          <Text style={styles.titleTwo}>{selectedOption}</Text>
          <Text style={styles.message}>
            {selectedOption === 'Notifications'
              ? 'Do you want to enable notifications?'
              : 'Do you need help with something?'}
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={() => toggleModal(null)}>
              <Text style={styles.buttonText}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => toggleModal(null)}>
              <Text style={styles.buttonText}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <TouchableOpacity style={styles.item} onPress={navigateToAbout}>
        <View style={styles.iconText}>
          <FontAwesome name="info-circle" size={24} color="#fff" />
          <Text style={styles.text}>About Us</Text>
        </View>
        <Entypo name="chevron-right" size={24} color="#fff" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Dark background
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  iconText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 10,
  },
  signOutButton: {
    backgroundColor: '#6200EE', // Light blue
    padding: 15,
    marginVertical: 20,
    borderRadius: 999,
    alignItems: 'center',
  },
  signOutText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupContainer: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    marginHorizontal: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#6200EE',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  titleTwo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});