import React, { useState } from 'react';
import { StatusBar, View, Button, Text, TextInput, Alert } from 'react-native';

const Edit = ({ navigation, route }) => {
    const [name, setName] = useState(route.params.name);
    const [pic, setPic] = useState(route.params.pic);

    const updateKpop = async () => {
        try {
            const res = await fetch(
                "https://onlinecardappwebservice-rzei.onrender.com/updatekpop/" + route.params.id,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        group_name: name,
                        group_pic: pic
                    })
                }
            );

            const text = await res.text();
            console.log("UPDATE STATUS:", res.status);
            console.log("UPDATE RESPONSE:", text);

            if (!res.ok) {
                throw new Error("Update failed");
            }

            navigation.navigate("Home");
        } catch (err) {
            Alert.alert("Update error", err.message);
        }
    };

    const deleteKpop = async () => {
        try {
            const res = await fetch(
                "https://onlinecardappwebservice-rzei.onrender.com/deletekpop/" + route.params.id,
                { method: "DELETE" }
            );

            const text = await res.text();
            console.log("DELETE STATUS:", res.status);
            console.log("DELETE RESPONSE:", text);

            if (!res.ok) {
                throw new Error("Delete failed");
            }

            navigation.navigate("Home");
        } catch (err) {
            Alert.alert("Delete error", err.message);
        }
    };

    return (
        <View style={{ paddingTop: 50 }}>
            <StatusBar />

            <Text>Group Name:</Text>
            <TextInput
                style={{ borderWidth: 1 }}
                value={name}
                onChangeText={setName}
            />

            <Text>Group Pic URL:</Text>
            <TextInput
                style={{ borderWidth: 1 }}
                value={pic}
                onChangeText={setPic}
            />

            <Text> </Text>

            <Button title="Update" onPress={updateKpop} />
            <Text> </Text>
            <Button title="Delete" onPress={deleteKpop} />
        </View>
    );
};

export default Edit;
