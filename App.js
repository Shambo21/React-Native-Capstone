import { useState, useEffect, useMemo, createContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AuthContext from './components/context/AuthContext';
import OnboardingScreen from './screens/Onboarding';
import ProfileScreen from './screens/Profile';
import SplashScreen from './screens/SplashScreen';
import HomeScreen from './screens/Home';
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

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('Onboarding')
        if (value !== null) {
          setState(JSON.parse(value))
        }
      }
      catch (e) {
      }
    }
    getData()
  }, [])

  const authContext = useMemo(
    () => ({
      logIn: () => {
        setState({
          isLoading: false,
          isOnboardingCompleted: true,
        })
      },
      logOut: () => setState({
        isLoading: false,
        isOnboardingCompleted: false,
      }),
    }),
    []
  );

  const LogoHeader = () => {
    return (
        <Image
          style={{ width: 200, resizeMode: 'contain' }}
          source={require("./assets/Logo.png")}
        />
    )
  }


  if (state.isLoading && !fontsLoaded) {
    // We haven't finished reading from AsyncStorage yet
    return <SplashScreen />;
  }
  if (fontsLoaded) return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <View style={styles.container}>
          <Stack.Navigator screenOptions={{}}>
            {state.isOnboardingCompleted ? (
              // Onboarding completed, user is signed in
              <>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Profile" component={ProfileScreen} />
              </>
            ) : (
              // User is NOT signed in
              <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ headerTitle: (props) => <LogoHeader {...props} /> }}/>
            )}
          </Stack.Navigator>
        </View>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333333',
    fontFamily: 'Karla'
  },

});
