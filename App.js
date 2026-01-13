import React, { useEffect, useState } from 'react';
import {
  FlatList,
  StatusBar,
  Text,
  TextInput,
  View,
  Image,
  StyleSheet
} from 'react-native';

let originalData = [];

const App = () => {
  const [myData, setMyData] = useState([]);

  const myurl = "https://onlinecardappwebservice-rzei.onrender.com/allkpop";
  // or /allkpop if testing KPOP

  useEffect(() => {
    fetch(myurl)
        .then(response => response.json())
        .then(myJson => {
          setMyData(myJson);
          originalData = myJson;
        });
  }, []);

  const FilterData = (text) => {
    if (text !== '') {
      let filtered = originalData.filter(item =>
          item.card_name?.includes(text) ||
          item.group_name?.includes(text)
      );
      setMyData(filtered);
    } else {
      setMyData(originalData);
    }
  };

  const renderItem = ({ item }) => (
      <View style={styles.cardRow}>
        <Text style={styles.cardName}>
          {item.card_name || item.group_name}
        </Text>
        <Image
            source={{ uri: item.card_pic || item.group_pic }}
            style={styles.cardImage}
        />
      </View>
  );

  return (
      <View>
        <StatusBar />
        <Text>Search:</Text>
        <TextInput
            style={{ borderWidth: 1 }}
            onChangeText={FilterData}
        />
        <FlatList
            data={myData}
            renderItem={renderItem}
        />
      </View>
  );
};

export default App;

const styles = StyleSheet.create({
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    padding: 10,
    marginVertical: 6,
  },
  cardName: {
    flex: 1,
    fontWeight: 'bold',
    marginRight: 10,
  },
  cardImage: {
    width: 120,
    height: 160,
  },
});
