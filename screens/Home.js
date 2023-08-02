import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, FlatList, StyleSheet, Image } from 'react-native';

export default HomeScreen = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json')
            .then((response) => response.json())
            .then((data) => {
                setData(data);
            });
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.heroContainer}>
                <View >
                    <Text style={styles.headerText}>Little Lemon</Text>
                    <Text style={styles.subheader}>Chicago</Text>
                    <View style={styles.row}>
                        <Text style={styles.subtext}>We are a family owned Mediterranean restaurant focused on traditional recipes served with a modern twist</Text>
                        <Image style={styles.heroImage} source={require('../assets/Hero-image.png')} />
                    </View>
                </View>

            </View>
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={data.menu}
                    renderItem={({ item }) => (
                        <View styles={styles.row}>
                            <Text style={styles.itemName}>{item.name}</Text>
                            <View style={styles.row}>
                                <Text style={styles.descText}>{item.description}</Text>
                                <Image source={{uri: `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${item.image}?raw=true`}} style={styles.image} />
                            </View>
                            <Text style={styles.price}>${item.price}</Text>
                        </View>
                    )}
                    keyExtractor={(item) => item.id}
                />
            </SafeAreaView>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        color: 'black'
    },
    heroContainer: {
        backgroundColor: '#495E57',
        flexDirection: 'row',
        padding:10
    },
    column: {
    },
    heroImage: {
        height: 150,
        width: 150,
        resizeMode: 'contain',
        marginBottom: 32,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingBottom: 10,
        marginBottom: 10
    },
    title: {
        color: "#333333",
        textAlign: "center",
        fontSize: 20,
    },
    image: {
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
    headerText: {
        color: '#F4CE14',
        fontFamily: 'Markazi',
        fontSize: 64,
        fontStyle: 'normal',
        fontWeight: 500,
        marginTop: 10,
    },
    subheader: {
        color: '#FFF',
        fontFamily: 'Markazi ',
        fontSize: 30,
        fontStyle: 'normal',
        fontWeight: 400,
        marginTop: 5,
    },
    subtext: {
        color: '#FFF',
        fontFamily: 'Karla',
        width:'80%',
        fontSize: 20,
        fontStyle: 'normal',
        fontWeight: 500,
        marginTop: 30,
        paddingLeft:30
    },
    itemName:{
        color: 'black',
        fontFamily: 'Karla',
        fontSize: 20,
        fontStyle: 'normal',
        fontWeight: 600,
        marginTop: 30,
        paddingLeft:10,
    },
    descText: {
        color: 'black',
        fontFamily: 'Karla',
        width:'70%',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: 400,
        marginTop: 5,
        paddingLeft:10,
        marginRight:10
    },
    price: {
        color: 'black',
        fontFamily: 'Karla',
        fontSize: 20,
        fontStyle: 'normal',
        fontWeight: 600,
        marginTop: -70,
        paddingLeft:10,
    }
});