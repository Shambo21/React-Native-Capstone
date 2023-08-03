import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const Filters = ({ onChange, selections, sections }) => {
  return (
    <>
    <Text style={styles.headerText}>ORDER FOR DELIVERY!</Text>
    <View style={styles.filtersContainer}>
      {sections.map((section, index) => (
        <TouchableOpacity
          onPress={() => {
            onChange(index);
          }}
          style={{
            flex: 1 / sections.length,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 12,
            backgroundColor: selections[index] ? '#495E57' : '#DCDCDC',
            borderWidth: 1,
            borderRadius:30,
            borderColor: 'white',
          }}>
          <View>
            <Text style={{ color: selections[index] ? 'white' : 'black', fontSize: 16 }}>
              {section}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  filtersContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerText:{
    color: 'black',
    fontSize: 20,
    fontFamily: 'Karla',
    fontStyle: 'normal',
    fontWeight: 800,
    marginTop: 20,
    marginBottom: 5,
    paddingLeft: 10,
  }
});

export default Filters;