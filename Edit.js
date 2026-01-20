import React,{useState} from 'react';
import { StatusBar, View, Button, Text, TextInput, Alert } from 'react-native';

const Edit = ({navigation, route}) => {
    const[name,setName] = useState(route.params.name);
    const[pic,setPic] = useState(route.params.pic);
    return (
        <View>
            <StatusBar/>
            <Text>Group Name:</Text>
            <TextInput
                style={{borderWidth:1}}
                value={name}
                onChangeText={(text)=>setName(text)}
            />
            <Text>Group Pic URL:</Text>
            <TextInput
                style={{borderWidth:1}}
                value={pic}
                onChangeText={(text)=>setPic(text)}
            />
            <Text> </Text>
            <Button title='Update'
                    onPress={()=>{
                        let item = {group_name:name, group_pic:pic};
                        fetch("https://onlinecardappwebservice-rzei.onrender.com/updatekpop/"+route.params.id,
                            {
                                method: "PUT",
                                headers:{"Content-Type":"application/json"},
                                body:JSON.stringify(item)
                            }
                        )
                            .then((response)=>{
                                navigation.navigate("Home");
                            })
                    }}
            />
            <Text> </Text>
            <Button title='Delete'
                    onPress={()=>{
                        fetch("https://onlinecardappwebservice-rzei.onrender.com/deletekpop/"+route.params.id,
                            {
                                method: "DELETE",
                            }
                        )
                            .then((response)=>{
                                navigation.navigate("Home");
                            })
                    }}
            />
        </View>
    );
};

export default Edit;
