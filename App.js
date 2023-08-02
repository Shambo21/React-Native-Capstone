import { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage';

import LittleLemonHeader from './components/LittleLemonHeader';
import LittleLemonFooter from './components/LittleLemonFooter';
import WelcomeScreen from './screens/WelcomeScreen';
import MenuScreen from './screens/MenuScreen';
import LoginScreen from './screens/LoginScreen';
import FeedbackForm from './components/FeedbackForm';
import OnboardingScreen from './screens/Onboarding';
import ProfileScreen from './screens/Profile';
import SplashScreen from './screens/SplashScreen';
import { useFonts } from 'expo-font';


const Stack = createNativeStackNavigator();

export default function App() {

  const [state, setState] = useState({
    isLoading: true,
    isOnboardingCompleted: false,
  })
  let [fontsLoaded] = useFonts({
    'Markazi': require('./assets/fonts/MarkaziText-Regular.ttf'),
    'Karla': require('./assets/fonts/Karla-Regular.ttf')
  });

  const [onBoarding, setOnboarding] = useState(true)

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('Onboarding')
      if (value !== null) {
        setOnboarding(false)
        setState(JSON.parse(value))
      }
      else {
        setOnboarding(true)
        setState({
          isLoading: false,
          isOnboardingCompleted: false,
        })
      }
    }
    catch (e) {
    }
  }
  useEffect(() => {
    getData()
  }, [])


  if (state.isLoading&& !fontsLoaded) {
    console.log(fontsLoaded)
    // We haven't finished reading from AsyncStorage yet
    return <SplashScreen />;
  }
    return (
      <>
        <NavigationContainer>
          <View style={styles.container}>
            <LittleLemonHeader />
            <Stack.Navigator initialRouteName={onBoarding ? 'Onboarding':'Profile'}>
              <Stack.Screen name="Profile" component={ProfileScreen} />
              <Stack.Screen name="Onboarding" component={OnboardingScreen}  />
            </Stack.Navigator>
          </View>
          <View style={styles.footerContainer}>
            <LittleLemonFooter />
          </View>
        </NavigationContainer>
      </>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333333',
    fontFamily: 'Karla'
  },
  footerContainer: { backgroundColor: '#333333' },

});
