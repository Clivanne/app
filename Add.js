import React,{useState} from 'react';
import { StatusBar, View, Button, Text, TextInput, Alert } from 'react-native';

const Add = ({navigation}) => {
    const[name,setName] = useState("");
    const[pic,setPic] = useState("");
    return (
        <View>
            <StatusBar/>
            <Text>Group Name:</Text>
            <TextInput style={{borderWidth:1}} onChangeText={(text)=>setName(text)}/>
            <Text>Group Pic URL:</Text>
            <TextInput style={{borderWidth:1}} onChangeText={(text)=>setPic(text)}/>
            <Text> </Text>
            <Button title='Submit'
                    onPress={()=>{
                        let item = {group_name:name, group_pic:pic};
                        fetch("https://onlinecardappwebservice-rzei.onrender.com/addkpop",
                            {
                                method: "POST",
                                headers:{"Content-Type":"application/json"},
                                body:JSON.stringify(item)
                            }
                        )
                            .then((response)=>{
                                navigation.navigate('Home');
                            })
                    }}
            />
        </View>
    );
};

export default Add;
