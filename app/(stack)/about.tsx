import {View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

export default function About() {

    const navigation = useNavigation();

    const handleBackPress = () => {navigation.goBack();};
    
    return (       
        <View style={styles.container}>
            {/* Back Button */}
            <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
                <Ionicons name="arrow-back" size={24} color="#ffffff" />
            </TouchableOpacity>

            <ThemedView style={styles.titleContainer}>
                {/* need to change this to actually be centered and not have the spaces */}
                <View style={styles.centered}>
                    <ThemedText type="title">About Us{'\n'}</ThemedText>
                </View>
            </ThemedView>

            <ScrollView contentContainerStyle={styles.friendsList} showsVerticalScrollIndicator={false}>
                {/* This is going to be where we have our text about ourselves, still need to add a clickable link for the "here" in the last sentence*/}
                <ThemedText>
                {'\n'}This app was created by Miguel Coronado, Nick Carboni, Sammy Paykel, and Tyler Hamilton. We are all 
                students at California Polytechnic University in San Luis Obispo taking Computer Science related majors. We developed this 
                app while taking Software Engineering I and II while studying abroad in Rome, Italy. With the teachings from Professor, 
                Davide Falessi, we were able to complete this app in 10 weeks. The link to our github is here. Thank you so much!
                </ThemedText> 
            </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#000000',
    paddingTop: 80, // Additional top padding
    paddingHorizontal: 16,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 24,
    backgroundColor: 'rgba(0,0,0,0)',
  },
  centered: {
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 16,
    zIndex: 1,
  },
  friendsList: {
    alignItems: 'center',
  },
});
