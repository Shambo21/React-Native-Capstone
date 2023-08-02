import * as React from "react";
import { Pressable, Text, StyleSheet } from "react-native";

const Button = ({onPress, children, disabled, button2, button3}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.buttonWrapper, disabled && styles.disabled, button2 && styles.button2, button3 && styles.button3]}
      disabled={disabled}
    >
      <Text style={[styles.text, button2 && styles.text2, button3 && styles.text3]}>{children}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonWrapper: {
    borderRadius: 8,
    backgroundColor: '#495E57',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 8,
    minWidth:"48%"
  },
  disabled: {
    backgroundColor: 'grey',
    opacity: 0.5,
  },
  button2:{
    backgroundColor: 'white',
    borderWidth: 1,
  },
  button3:{
    backgroundColor: '#F4CE14',
  },
  text: {
    fontSize: 16,
    color: 'white',
  },
  text2:{
    color: 'black'
  },
  text3:{
    color:'black',
    fontWeight: '600',
  }
});

export default Button;