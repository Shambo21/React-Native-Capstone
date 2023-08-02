import { useEffect, useState, useContext } from "react";
import { Alert, Image, StyleSheet, Text, TextInput, View, Pressable } from "react-native";
import Button from "../components/Button";
import { validateEmail } from "../utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import AuthContext from "../components/context/AuthContext";

const OnboardingScreen = ({ navigation, toProfile }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('');

    const isEmailValid = validateEmail(email);

    const {logIn} = useContext(AuthContext)

    const getData = async () => {
        try {
            const response = await AsyncStorage.getItem('Onboarding')
            const value = response != null ? JSON.parse(response) : null
            if (value !== null) {
                setName(value.name)
                setEmail(value.email)
            }
        } catch (e) {
            Alert.alert("could not read existing data")
        }
    }
    const setData = async () => {
        try {
            const obj = {
                isLoading: false,
                isOnboardingCompleted: true,
                name: name,
                email: email
            }
            await AsyncStorage.setItem('Onboarding', JSON.stringify(obj))

        }
        catch (e) {
        }
    }
    const isFocused = useIsFocused();

    useEffect(() => {
        getData();
    }, [isFocused])

    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <Text style={styles.title}>
                    Let us get to know you
                </Text>
                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                    textContentType="name"
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
            </View>
            <Button
                onPress={() => {setData(); logIn()}}
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
    buttonWrapper: {
        borderRadius: 8,
        backgroundColor: '#495E57',
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 8,
        minWidth:"48%"
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
    innerContainer: {
        justifyContent: "space-between"
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
