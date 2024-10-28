import { Image, View, StyleSheet, Platform, Text, TextInput } from 'react-native';
import { useState } from 'react';
import ImageViewer from "@/components/imageView";



export default function barProfile() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/WTM-Logo.png')}
        style={styles.WTMLogo}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  WTMLogo: {
    height: 78,
    width: 190,
    bottom: 720,
    left: -50,
    position: 'absolute',
  },
});
