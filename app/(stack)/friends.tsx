import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const PastReviewsScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <ThemedView style={styles.titleContainer}>
        {/* need to change this to actually be centered and not have the spaces */}
        <View style={styles.centered}>
          <ThemedText type="title">Friends{'\n'}</ThemedText>
        </View>
      </ThemedView>
      <ThemedText>{'\n'} Your Friends: </ThemedText> 
      <ThemedText>{'\n'} Miguel </ThemedText> 
      <ThemedText>{'\n'} Sammy </ThemedText> 
      <ThemedText>{'\n'} Nick </ThemedText> 


    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 1, // Adds space at the top
    },  titleContainer: {
      flexDirection: 'row',
      gap: 1000,
      backgroundColor: 'rgba(0,0,0,0)',
    //   marginBottom: 20, // Adds space below the title

    },
    centered: {
      alignItems: 'center',
    },
  });
  
  export default PastReviewsScreen;