import { Image, View, StyleSheet, Platform, Text} from 'react-native';
import ImageViewer from "@/components/imageView";

const PlaceholderImage1 = require('@/assets/images/ontherox.png');
const PlaceholderImage2 = require('@/assets/images/Mate-bare.jpg');  //images
const PlaceholderImage3 = require('@/assets/images/ice-bar.jpg');


export default function favorites() {
  return (
    
    <View style={styles.container}>
        <Image
          source={require('@/assets/images/WTM-Logo.png')}
          style={styles.WTMLogo}
        />
        <Text style={styles.text}>Favorites</Text> 
        <View style={styles.imageContainer}>
            <ImageViewer imgSource={PlaceholderImage1} />     
            <Text style={styles.textBox}>Closes: 2:00</Text>
        </View> 
        <View style={styles.imageContainer}>
            <ImageViewer imgSource={PlaceholderImage2} />
            <Text style={styles.textBox1}>Closes: 1:30</Text>
        </View> 
        <View style={styles.imageContainer}>
            <ImageViewer imgSource={PlaceholderImage3} />
            <Text style={styles.textBox2}>Closes: 1:30</Text>
        </View> 
  </View>
   
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  text: {
    left: -150,
    bottom: -10,
    fontSize: 24,
    color: '#fff'
  },
  WTMLogo: {
    height: 78,
    width: 190,
    bottom: 720,
    left: -50,
    position: 'absolute',
  },
  container:{
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    flex: 0.25,
    bottom: 150
    },
    image: {
    width: 320,
    height: 440,
    borderRadius: 18,
    },
  textBox: {
    position: 'absolute', 
    fontSize: 20, 
    color: 'white', 
    top: 270,                          //textbox are within the image container and have a black background
    left: 10, 
    backgroundColor: 'black', 
    borderRadius: 23,
    width: 180,
    height: 25,
    textAlign: 'center',
  },
  textBox1: {
    position: 'absolute', 
    fontSize: 20, 
    color: 'white', 
    top: 270, 
    left: 10, 
    backgroundColor: 'black', 
    borderRadius: 23,
    width: 180,
    height: 25,
    textAlign: 'center',
  },
  textBox2: {
    position: 'absolute', 
    fontSize: 20, 
    color: 'white', 
    top: 270, 
    left: 10, 
    backgroundColor: 'black', 
    borderRadius: 23,
    width: 180,
    height: 25,
    textAlign: 'center',
  }
});
