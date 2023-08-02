import * as React from 'react';
import { View, Text, StyleSheet, Image} from 'react-native';

export default function LittleLemonHeader() {
  return (
    <View style={styles.container}>
      <Image
                style={styles.logo}
                source={require("../assets/Logo.png")}
            />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#C8C8C8'
  },
  logo: {
    height: 80,
    width: '70%',
    marginTop: 10,
    resizeMode: "contain",
    marginLeft: 'auto',
    marginRight: 'auto',
},
});