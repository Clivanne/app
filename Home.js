import React,{useState, useEffect} from 'react';
import {StatusBar, Button, FlatList, StyleSheet, Text, View, Image, TextInput, TouchableOpacity} from 'react-native';

let originalData = [];

const Home = ({navigation}) => {
    const [myData, setMyData] = useState([]);

    // please set your allkpop endpoint url here
    const myurl = "https://onlinecardappwebservice-rzei.onrender.com/allkpop"

    useEffect(()=>{
        fetch(myurl)
            .then((response)=>{
                return response.json();
            })
            .then((myJson)=>{
                setMyData(myJson);
                originalData = myJson;
            })
    },[]);

    const FilterData = (text) => {
        if(text!='') {
            let myFilteredData = originalData.filter((item) =>
                item.group_name.toLowerCase().includes(text.toLowerCase()));
            setMyData(myFilteredData);
        }
        else {
            setMyData(originalData);
        }
    }

    const renderItem = ({item, index}) => {
        return (
            <TouchableOpacity
                onPress={()=>{
                    navigation.navigate("Edit",{
                        id:item.id,
                        name:item.group_name,
                        pic:item.group_pic
                    })
                }}
            >
                <View style={{flexDirection:"row", alignItems:"center", borderWidth:1}}>
                    <View style={{flex:1}}>
                        <Text style={{fontWeight:"bold", margin:10}}>
                            {item.group_name}
                        </Text>
                    </View>
                    <View style={{flex:1}}>
                        <Image
                            source={{uri:item.group_pic}}
                            style={{width:150, height:200, margin:10}}
                        />
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={{flex:1, paddingTop:50}}>
            <StatusBar translucent={false}/>
            <Text style={{fontWeight:"bold"}}>Search:</Text>
            <TextInput
                style={{borderWidth:1, margin:10}}
                onChangeText={(text)=>{FilterData(text)}}
            />
            <Button title='Add KPOP Group' onPress={()=>{navigation.navigate("Add")}}/>
            <FlatList style={{margin:10}} data={myData} renderItem={renderItem} />
        </View>
    );
};

export default Home;
