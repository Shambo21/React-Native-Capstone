import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { SafeAreaView, View, Text, FlatList, StyleSheet, Image, Alert, TouchableHighlight} from 'react-native';
import debounce from 'lodash.debounce';
import { Searchbar } from 'react-native-paper';
import {
  createTable,
  getMenuItems,
  saveMenuItems,
  filterByQueryAndCategories,
} from '../components/Database';
import Filters from '../components/Filters';
import ProfilePic from '../components/ProfilePic';

import { useUpdateEffect } from '../utils';

const API_URL = 'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json'
const sections = ['mains', 'desserts', 'starters'];

export default HomeScreen = ({navigation}) => {

  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [searchBarText, setSearchBarText] = useState('');
  const [filterSelections, setFilterSelections] = useState(sections.map(() => false));

  const LogoHeader = () => {
    return (
      < >
        <Image
          style={{ width: 200, resizeMode: 'contain' }}
          source={require("../assets/Logo.png")}
        />
        <TouchableHighlight onPress={() => navigation.navigate('Profile')} >
          <ProfilePic size={40}/>
        </TouchableHighlight>
      </>
    )
  }

  const fetchData = async () => {
    try {
      const response = await fetch(API_URL);
      const json = await response.json()
      setData(json.menu)
      return json.menu;
    } catch (e) {
    } finally {
      setLoading(false);
    }
    return [];
  }

  useEffect(() => {
    (async () => {
      try {
        await createTable();
        let menuItems = await getMenuItems();
        if (!menuItems.length) {
          const menuItems = await fetchData();
          menuItems.forEach((o, i) => { o.id = i + 1; });
          setData(menuItems);
          saveMenuItems(menuItems);
        }
        else
          setData(menuItems);
      } catch (e) {
        // Handle error
        Alert.alert(e.message);
      }
    })();
    navigation?.setOptions({ headerTitle: (props) => <LogoHeader {...props} /> })
  }, []);

  useUpdateEffect(() => {
    (async () => {
      const activeCategories = sections.filter((s, i) => {
        // If all filters are deselected, all categories are active
        if (filterSelections.every((item) => item === false)) {
          return true;
        }
        return filterSelections[i];
      });
      try {
        const menuItems = await filterByQueryAndCategories(
          query,
          activeCategories
        );
        setData(menuItems);
      } catch (e) {
        console.log(e)
        Alert.alert(e.message);
      }
    })();
  }, [filterSelections, query]);

  const lookup = useCallback((q) => {
    setQuery(q);
  }, []);

  const debouncedLookup = useMemo(() => debounce(lookup, 500), [lookup]);

  const handleSearchChange = (text) => {
    setSearchBarText(text);
    debouncedLookup(text);
  };

  const handleFiltersChange = async (index) => {
    const arrayCopy = [...filterSelections];
    arrayCopy[index] = !filterSelections[index];
    setFilterSelections(arrayCopy);
  };



  return (
    <View style={styles.container}>

      <SafeAreaView style={styles.container}>
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
        <Searchbar
          placeholder="Search"
          placeholderTextColor="white"
          onChangeText={handleSearchChange}
          value={searchBarText}
          style={styles.searchBar}
          iconColor="black"
          containerStyle={{backgroundColor: 'white', borderWidth: 1, borderRadius: 5}}
          inputStyle={{ backgroundColor: 'white' }}
          elevation={0}
        />
        <Filters
          selections={filterSelections}
          onChange={handleFiltersChange}
          sections={sections}
        />
        {data ?
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <View styles={styles.row}>
                <Text style={styles.itemName}>{item.name}</Text>
                <View style={styles.row}>
                  <Text style={styles.descText}>{item.description}</Text>
                  <Image source={{ uri: `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${item.image}?raw=true` }} style={styles.image} />
                </View>
                <Text style={styles.price}>${item.price}</Text>
              </View>
            )}
            keyExtractor={(item) => item.id}
          /> : <></>
        }
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
    padding: 10
  },
  column: {
  },
  heroImage: {
    height: 150,
    width: 150,
    resizeMode: 'contain',
    marginBottom: 5
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingBottom: 10,
    marginBottom: 10,
    borderBottomWidth:1,
    borderColor: 'grey',
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
    width: '80%',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: 500,
    marginTop: 30,
    paddingLeft: 30
  },
  itemName: {
    color: 'black',
    fontFamily: 'Karla',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: 600,
    marginTop: 40,
    paddingLeft: 10,
  },
  descText: {
    color: 'black',
    fontFamily: 'Karla',
    width: '70%',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: 400,
    marginTop: 5,
    paddingLeft: 10,
    marginRight: 10
  },
  price: {
    color: 'black',
    fontFamily: 'Karla',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: 600,
    marginTop: -70,
    paddingLeft: 10,
  }
});