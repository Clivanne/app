import React, { useState } from 'react';
import { StatusBar, View, Button, Text, TextInput, Alert } from 'react-native';

const Add = ({ navigation }) => {
    const [name, setName] = useState("");
    const [pic, setPic] = useState("");

    const addKpop = () => {
        let item = {
            group_name: name,
            group_pic: pic
        };

        fetch("https://onlinecardappwebservice-rzei.onrender.com/addkpop", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(item)
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error("Add failed");
                }
                return res.json();
            })
            .then(() => {
                navigation.navigate("Home");
            })
            .catch(err => {
                Alert.alert("Add error", err.message);
            });
    };

    return (
        <View style={{ paddingTop: 50 }}>
            <StatusBar />

            <Text>Group Name:</Text>
            <TextInput
                style={{ borderWidth: 1 }}
                onChangeText={setName}
            />

            <Text>Group Pic URL:</Text>
            <TextInput
                style={{ borderWidth: 1 }}
                onChangeText={setPic}
            />

            <Text> </Text>

            <Button title="Submit" onPress={addKpop} />
        </View>
    );
};

export default Add;
