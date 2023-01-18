import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const App = () => {
    const [collectionsData, setCollectionsData] = useState([]);
    const [isFocus, setIsFocus] = useState(false)
    const [value, setValue] = useState(null);

        const sendCredentials = (selectedCollection) => {
            console.log(selectedCollection)
            fetch("http://10.132.86.149:4000/api/collections/start", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "name": selectedCollection,
                })
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                })
                .catch(e => {
                    console.log(e)})

        }
    const getCollections = ( ) => {
        fetch("http://10.132.86.149:4000/api/collections/nft-read",{
            method: "GET",
        })
            .then((res) => res.json())
            .then(resJson => {
                let collectionsArray=[];
                const name =[...new Set(resJson.map((item) => item.name))]
                for (let i = 0; i < name.length; i++) {

                    collectionsArray.push({
                        value: name[i],
                        label: name[i],
                    });
                }
                setCollectionsData(collectionsArray);

            }).catch(e => {
            console.log(e)
        })
    }
    useEffect(()=>{
        getCollections();
    },[])


    return (
        <View style={styles.container}>
    <View style={{backgroundColor:'#fff',padding:20,borderRadius:15}}>
       <Text >NFT Collections</Text>
            <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={collectionsData}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Select collection' : '...'}
                searchPlaceholder="Search..."
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                    console.log(item.value);
                    sendCredentials(item.value);
                    setIsFocus(false);
                }}
            />
    </View>
        </View>
    );
}
export default App;

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#533483',
        padding: 16,
        justifyContent:'center',
        alignContent:'center'
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});