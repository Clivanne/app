import React, { useState, useEffect } from 'react';
import {
    StatusBar,
    Button,
    FlatList,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity
} from 'react-native';

let originalData = [];

const Home = ({ navigation }) => {
    const [myData, setMyData] = useState([]);

    const myurl = "https://onlinecardappwebservice-rzei.onrender.com/allkpop";

    useEffect(() => {
        fetch(myurl)
            .then(res => res.json())
            .then(data => {
                setMyData(data);
                originalData = data;
            });
    }, []);

    const FilterData = (text) => {
        if (text !== '') {
            let filtered = originalData.filter(item =>
                item.group_name.toLowerCase().includes(text.toLowerCase())
            );
            setMyData(filtered);
        } else {
            setMyData(originalData);
        }
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            onPress={() =>
                navigation.navigate("Edit", {
                    id: item.id,
                    name: item.group_name,
                    pic: item.group_pic
                })
            }
        >
            <View style={{ flexDirection: "row", borderWidth: 1 }}>
                <View style={{ flex: 1 }}>
                    <Text style={{ fontWeight: "bold", margin: 10 }}>
                        {item.group_name}
                    </Text>
                </View>

                <View style={{ flex: 1 }}>
                    {item.group_pic ? (
                        <Image
                            source={{ uri: item.group_pic }}
                            style={{ width: 150, height: 200, margin: 10 }}
                        />
                    ) : (
                        <Text style={{ margin: 10 }}>No image</Text>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={{ flex: 1, paddingTop: 50 }}>
            <StatusBar />

            <Text style={{ fontWeight: "bold" }}>Search:</Text>
            <TextInput
                style={{ borderWidth: 1, margin: 10 }}
                onChangeText={FilterData}
            />

            <Button
                title="Add KPOP Group"
                onPress={() => navigation.navigate("Add")}
            />

            <FlatList
                data={myData}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    );
};

export default Home;
