import { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Image, TextInput, Pressable, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Button from '../components/Button';
import { validateEmail, getRandomColor, getInitials } from "../utils";
import * as ImagePicker from 'expo-image-picker';
import AuthContext from '../components/context/AuthContext';
import ProfilePic from '../components/ProfilePic';

import AsyncStorage from "@react-native-async-storage/async-storage";



export default function ProfileScreen({ route, navigation, onLogout }) {


    let fullName = ['', '']
    let eAddress = ''
    if (route.params) {
        let { name, emailAddress } = route.params;
        if (name) fullName = name.split(' ')
        eAddress = emailAddress
    }

    const[isLoading, setIsLoading] = useState(true)
    const [selectedImage, setSelectedImage] = useState('');
    const [firstName, setFirstName] = useState(fullName[0])
    const [lastName, setLastName] = useState(fullName[1])
    const [email, setEmail] = useState(eAddress);
    const [phone, setPhone] = useState('')
    const [check1, setCheck1] = useState(true)
    const [check2, setCheck2] = useState(true)
    const [check3, setCheck3] = useState(true)
    const [check4, setCheck4] = useState(true)
    const [initials, setInitials] = useState('')


    const onChangeNumber = (text) => {
        let formattedNo = formatMobileNumber(text);
        setPhone(formattedNo)
    }

    const formatMobileNumber = (text) => {
        var cleaned = ("" + text).replace(/\D/g, "");
        var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            var intlCode = match[1] ? "+1 " : "",
                number = [intlCode, "(", match[2], ") ", match[3], "-", match[4]].join(
                    ""
                );
            return number;
        }
        return text;
    }

    const {logOut} = useContext(AuthContext)

    const getData = async () => {
        try {
            const response = await AsyncStorage.getItem('Profile')
            const value = response != null ? JSON.parse(response) : null
            if (value !== null) {
                setSelectedImage(value.selectedImage)
                setFirstName(value.firstName)
                setLastName(value.lastName)
                setEmail(value.email)
                setPhone(value.phone)
                setCheck1(value.check1)
                setCheck2(value.check2)
                setCheck3(value.check3)
                setCheck4(value.check4)
                setIsLoading(false)
            } else {
                setIsLoading(false)
                getOnboardingData()
            }
        } catch (e) {
            Alert.alert("could not read existing data")
        }
    }
    const getOnboardingData = async () => {
        try {
            const response = await AsyncStorage.getItem('Onboarding')
            const value = response != null ? JSON.parse(response) : null
            if (value !== null) {
                let name = value.name.split(' ')
                setFirstName(name[0])
                if (name.length > 1)
                    setLastName(name[1])
                setEmail(value.email)
            }
        } catch (e) {
            Alert.alert("could not read existing data")
        }
    }

    const setData = async () => {
        try {
            const obj = {
                image: selectedImage,
                firstName: firstName,
                lastName: lastName,
                email: email,
                phone: phone,
                check1: check1,
                check2: check2,
                check3: check3,
                check4: check4
            }
            await AsyncStorage.setItem('Profile', JSON.stringify(obj))
            Alert.alert("Profile has been saved")
        }
        catch (e) {
            Alert.alert("could not save data" + e.message)
        }
    }

    const pickImage= async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          quality: 1,
        });

        if (!result.canceled) {
          setSelectedImage(result.assets[0].uri);
        } else {
          alert('You did not select any image.');
        }
      };

    const removeImage = () => {
        setSelectedImage('')
    }

    useEffect(() => {
        getData();
    }, [])

if(!isLoading)
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.text}>Personal Information</Text>
            <View style={styles.imageContainer}>
                <ProfilePic size={80}/>
            </View>
            <View style={styles.row}>
                <Button name="Change" onPress={pickImage}>Change</Button>
                <Button button2={true} name="Remove" onPress={removeImage}> Remove</Button>
            </View>
            <View>
                <Text style={styles.label}>First name</Text>
                <TextInput
                    style={styles.input}
                    value={firstName}
                    onChangeText={setFirstName}
                    textContentType="givenName"
                    placeholder={"Type your name"}
                />
                <Text style={styles.label}>Last name</Text>
                <TextInput
                    style={styles.input}
                    value={lastName}
                    onChangeText={setLastName}
                    textContentType="familyName"
                    placeholder={"Type your last name"}
                />
                <Text style={styles.label}>Email address</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    placeholder={"Type your email"}
                />
                <Text style={styles.label}>Phone number</Text>
                <TextInput
                    style={styles.input}
                    value={phone}
                    onChangeText={onChangeNumber}
                    keyboardType="phone-pad"
                    textContentType="telephoneNumber"
                    placeholder={"(000) 000-0000"}
                />
            </View>
            <View style={styles.checkboxContainer}>
                <Pressable
                    style={[styles.checkboxBase, check1 && styles.checkboxChecked]}
                    onPress={() => setCheck1(!check1)}>
                    {check1 && <Ionicons name="checkmark" size={24} color="white" />}
                </Pressable>
                <Text style={styles.cbLabel}>Order statuses</Text>
            </View>
            <View style={styles.checkboxContainer}>
                <Pressable
                    style={[styles.checkboxBase, check2 && styles.checkboxChecked]}
                    onPress={() => setCheck2(!check2)}>
                    {check2 && <Ionicons name="checkmark" size={24} color="white" />}
                </Pressable>
                <Text style={styles.cbLabel}>Password changes</Text>
            </View>
            <View style={styles.checkboxContainer}>
                <Pressable
                    style={[styles.checkboxBase, check3 && styles.checkboxChecked]}
                    onPress={() => setCheck3(!check3)}>
                    {check3 && <Ionicons name="checkmark" size={24} color="white" />}
                </Pressable>
                <Text style={styles.cbLabel}>Special offers</Text>
            </View>
            <View style={styles.checkboxContainer}>
                <Pressable
                    style={[styles.checkboxBase, check4 && styles.checkboxChecked]}
                    onPress={() => setCheck4(!check4)}>
                    {check4 && <Ionicons name="checkmark" size={24} color="white" />}
                </Pressable>
                <Text style={styles.cbLabel}>Newsletter</Text>
            </View>
            <View style={styles.row}>
                <Button name="Logout" button3={true} onPress={() => { AsyncStorage.clear(); logOut() }}>Log out</Button>
            </View>
            <View style={styles.row}>
                <Button name="SaveChanges" onPress={() => {setData(); navigation.navigate('Home')} }>Save Changes</Button>
                <Button button2={true} name="DiscardChanges" onPress={() => getData()} >Discard Changes</Button>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    imageContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        paddingBottom: 10
    },
    profilePic: {
        height: 100,
        marginTop: 10,
        resizeMode: "contain",
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    text: {
        padding: 5,
        fontSize: 20,
        color: 'black',
        textAlign: 'center',
    },
    label: {
        marginLeft: 10,
        fontSize: 10,
        fontWeight: '600'
    },
    cbLabel: {
        marginLeft: 10,
        fontSize: 14,
        fontWeight: '600',
        alignItems: 'center'
    },
    input: {
        height: 40,
        marginVertical: 10,
        borderRadius: 8,
        borderWidth: 1,
        margin: 10,
        padding: 5,
        fontSize: 16,
        borderColor: "#989898",
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
    },
    checkboxBase: {
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#495E57',
        backgroundColor: 'transparent',
    },
    checkboxChecked: {
        backgroundColor: '#495E57',
    },
    headerText: {
        fontSize: 20,
        textAlign: "center",
        margin: 10,
        fontWeight: "bold",
    },
    CircleShape: {
        width: 125,
        height: 125,
        borderRadius: 125 / 2,
        backgroundColor: getRandomColor(),
        justifyContent: "center",
        alignItems: "center",
    },
    circleText: {
        fontSize: 60,
        color: 'white'
    }

});