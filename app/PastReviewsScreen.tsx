import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PastReviewsScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Past Reviews</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  
  export default PastReviewsScreen;