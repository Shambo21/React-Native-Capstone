import { useState } from "react";
import { Alert, Image, StyleSheet, Text, TextInput, View } from "react-native";
import Button from "../components/Button";
import { validateEmail } from "../utils";

const OnboardingScreen = ({navigation}) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('');

    const isEmailValid = validateEmail(email);

    return (
        <View style={styles.container}>
            <Image
                style={styles.logo}
                source={require("../assets/logo.png")}
            />
            <Text style={styles.title}>
                Let us get to know you
            </Text>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                textContentType="text"
                placeholder={"Type your name"}
            />
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                textContentType="emailAddress"
                placeholder={"Type your email"}
            />
            <Button
                onPress={() => navigation.navigate('Welcome')}
                disabled={!isEmailValid}
            >
                Next
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30,
        backgroundColor: "white",
    },
    title: {
        color: "#333333",
        textAlign: "center",
        fontSize: 20,
    },
    logo: {
        height: 100,
        width: '100%',
        resizeMode: "contain",
        marginBottom: 32,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    input: {
        height: 40,
        marginVertical: 24,
        borderRadius: 8,
        borderWidth: 1,
        padding: 10,
        fontSize: 16,
        borderColor: "#EDEFEE",
    },
});

export default OnboardingScreen;
