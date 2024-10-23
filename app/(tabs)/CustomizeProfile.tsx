import Ionicons from '@expo/vector-icons/Ionicons';
import {View, StyleSheet, Image, Platform } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';



// change these later
let name = "Enter your name";
let age = "Enter your age";
let numBarsVisited = "Enter the number of bars you have visited";

export default function TabTwoScreen() {
  return (
    // <ParallaxScrollView
    <View style={styles.container}>
      {/* headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }} */}
      {/* headerImage={<Ionicons size={310} name="code-slash" style={styles.headerImage} />}> */}
        {/* //headerImage={<Image source={headerImage} style={styles.headerImage} />} */}

      <ThemedView style={styles.titleContainer}>
        {/* need to change this to actually be centered and not have the spaces */}
        <View style={styles.centered}>
          <ThemedText type="title">Customize Profile</ThemedText>
        </View>
      </ThemedView>
      <Image source={require('@/assets/images/mobile_app_pfp.jpg')} style={{ alignSelf: 'center' }} />
      <ThemedText>Name: {name} </ThemedText> 
      <ThemedText>Age: {age}</ThemedText>
      <ThemedText>Number of Bars Visited: {numBarsVisited}</ThemedText>
      <Collapsible title="Favorite Bars/Clubs">
        <ThemedText>
          1. {' '}
        <ExternalLink href="https://www.facebook.com/people/On-the-rox-trastevere/100068124642409/">
          <ThemedText type="link">On The Rox</ThemedText> {'\n'}
        </ExternalLink>
        2. {' '}
        <ExternalLink href="https://www.facebook.com/matebartrastevere/">
          <ThemedText type="link">Mate Bar</ThemedText> {'\n'}
        </ExternalLink>
      3. {' '}
        <ExternalLink href="https://www.iceclubroma.it/">
          <ThemedText type="link">Ice Club</ThemedText>
        </ExternalLink>
          {/* <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> and{' '}
          <ThemedText type="defaultSemiBold">app/(tabs)/explore.tsx</ThemedText> */}
        </ThemedText>
        {/* <ThemedText>
          The layout file in <ThemedText type="defaultSemiBold">app/(tabs)/_layout.tsx</ThemedText>{' '}
          sets up the tab navigator.
        </ThemedText> */}
      </Collapsible>
      <Collapsible title="Past Reviews">
        <ThemedText>
        {'\n'} On The Rox last night was so much fun!!!{'\n'}{'\n'}
          Mate Bar is for sure the move tonight! {'\n'}{'\n'}
          The Ice Club could have been a little bit better, but it was still fun.
        </ThemedText>
      </Collapsible>
      <Collapsible title="Past Ratings">
        <ThemedText>
        {'\n'}On The Rox Rating: 5/5 stars {'\n'}{'\n'}
          Mate Bar Rating: 4.5/5 stars {'\n'}{'\n'}
          The Ice Club Rating 3/5: stars
          {/* For static images, you can use the <ThemedText type="defaultSemiBold">@2x</ThemedText> and{' '}
          <ThemedText type="defaultSemiBold">@3x</ThemedText> suffixes to provide files for
          different screen densities */}
        </ThemedText>
        {/* <Image source={require('@/assets/images/react-logo.png')} style={{ alignSelf: 'center' }} />
        <ExternalLink href="https://reactnative.dev/docs/images">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink> */}
      </Collapsible>
      <Collapsible title="Friends">
        <ThemedText>
        <ExternalLink href="https://www.instagram.com/fxt_miguel?igsh=MWQ1ZGUxMzBkMA==">
          <ThemedText type="link">Miguel</ThemedText> {'\n'}
        </ExternalLink>
        <ExternalLink href="https://www.instagram.com/nicholas_carboni?igsh=MWQ1ZGUxMzBkMA==">
          <ThemedText type="link">Nick</ThemedText> {'\n'}
        </ExternalLink>
        <ExternalLink href="https://www.instagram.com/sameerpaykel?igsh=MWQ1ZGUxMzBkMA==">
          <ThemedText type="link">Sammy</ThemedText>
        </ExternalLink>
          

          {/* Open <ThemedText type="defaultSemiBold">app/_layout.tsx</ThemedText> to see how to load{' '}
          <ThemedText style={{ fontFamily: 'SpaceMono' }}>
            custom fonts such as this one.
          </ThemedText> */}
        </ThemedText>
      </Collapsible>
      {/* <Collapsible title="Light and dark mode components">
        <ThemedText>
          This template has light and dark mode support. The{' '}
          <ThemedText type="defaultSemiBold">useColorScheme()</ThemedText> hook lets you inspect
          what the user's current color scheme is, and so you can adjust UI colors accordingly.
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Animations">
        <ThemedText>
          This template includes an example of an animated component. The{' '}
          <ThemedText type="defaultSemiBold">components/HelloWave.tsx</ThemedText> component uses
          the powerful <ThemedText type="defaultSemiBold">react-native-reanimated</ThemedText> library
          to create a waving hand animation.
        </ThemedText>
        {Platform.select({
          ios: (
            <ThemedText>
              The <ThemedText type="defaultSemiBold">components/ParallaxScrollView.tsx</ThemedText>{' '}
              component provides a parallax effect for the header image.
            </ThemedText>
          ),
        })}
      </Collapsible> */}
    </View>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#A020F0',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  // headerImage: {
  //   width: 310,
  //   height: 310,
  //   resizeMode: 'contain',
  // }
  container:{
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  centered: {
    alignItems: 'center',
  },
});
