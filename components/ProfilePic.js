import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { Avatar, Colors } from "react-native-paper"
import AsyncStorage from "@react-native-async-storage/async-storage";

export default ProfilePic = (props) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [firstName, setFirstName] = useState(' ')
    const [lastName, setLastName] = useState(' ')

    const getData = async () => {
        try {
            const response = await AsyncStorage.getItem('Profile')
            const value = response != null ? JSON.parse(response) : null
            if (value !== null) {
                setSelectedImage(value.selectedImage)
                setFirstName(value.firstName)
                setLastName(value.lastName)
            }
            else{
                getFromOnboarding()
            }
        } catch (e) {
            Alert.alert(e)
        }
    }

    const getFromOnboarding = async () => {
        try {
            const response = await AsyncStorage.getItem('Onboarding')
            const value = response != null ? JSON.parse(response) : null
            if (value !== null) {
                let name = value.name.split(' ')
                setFirstName(name[0])
                if (name.length > 1)
                    setLastName(name[1])
            }
        } catch (e) {
            Alert.alert(e)
        }
    }

    useEffect(() => {
        getData();
    }, [])
    return (
        <>
            {selectedImage ?
                <Avatar.Image source={{ uri: selectedImage }}/> :
                <Avatar.Text size={props.size} label={firstName[0] + lastName[0]} style={{backgroundColor:'#F4CE14'}} />}
        </>
    )
}