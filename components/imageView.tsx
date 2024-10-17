import { Image } from "expo-image";
import { StyleSheet } from "react-native";


type Props = {
  imgSource: string;
};

export default function ImageViewer({ imgSource }: Props) {
  return <Image source={imgSource} style={styles.image1} />;

}

const styles = StyleSheet.create({
  image1: {
    borderRadius: 23,              // image box styling
    width: 350,
    height: 130,
    top: 180
  },
<<<<<<< HEAD
});
=======
});
>>>>>>> 8fe12426210e3b63720c5d47598736533970af0e
