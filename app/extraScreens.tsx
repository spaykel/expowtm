import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CustomizePFP from './(tabs)/customize';
import PastReviewsScreen from './PastReviewsScreen';


export type RootStackParamList = {
    Customize: undefined;
    PastReviews: undefined;
  };

  const Stack = createStackNavigator<RootStackParamList>();

  const ExtraScreens: React.FC = () => {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Customize">
          <Stack.Screen name="Customize" component={CustomizePFP} />
          <Stack.Screen name="PastReviews" component={PastReviewsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  };
  
  export default ExtraScreens;
