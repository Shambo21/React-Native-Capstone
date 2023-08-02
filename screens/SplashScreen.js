import * as React from 'react';
import { View, Text, StyleSheet, Image} from 'react-native';

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <Image
                style={styles.logo}
                source={require("../assets/little-lemon-logo.png")}
            />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#C8C8C8'
  },
  logo: {
    height: '100%',
    width: '100%',
    marginTop: 10,
    resizeMode: "contain",
    marginLeft: 'auto',
    marginRight: 'auto',
},
});