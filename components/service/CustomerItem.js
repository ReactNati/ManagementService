
import React, { useEffect, useState } from 'react';
import { Pressable, View, Text, StyleSheet, Platform, useWindowDimensions, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';


// const { height, width } = useWindowDimensions();


function CustomerItem({ title, color, customer , pressCustomerId,choseUpdateCustomer }) {
    const navigation = useNavigation();
    const { height, width } = useWindowDimensions();
    const [isPressed,setIsPressed] = useState(false);
    function onPress(){
        setIsPressed(!isPressed);
        if(isPressed){
            pressCustomerId(0)
        }else{
            pressCustomerId(customer.idCustomer)
        }
    }

    useEffect(()=>{
        
        if(choseUpdateCustomer != null && customer.idCustomer === choseUpdateCustomer){
            setIsPressed(!isPressed)
        }else{
            setIsPressed(false)

        }
        
    },[choseUpdateCustomer])

    return (
        <View style={[styles.gridItem]}>
            <Pressable
                android_ripple={{ color: '#ccc' }}
                style={({ pressed }) => [isPressed && [styles.button,{backgroundColor:'#b9b1b1c9'}], pressed ? styles.buttonPressed : null]}
                onPress={onPress}
            >
                
                <View style={styles.info}>
                <View style={styles.contactContainer}>
                <Ionicons name={'person-outline'} color={"black"} size={22} />
                    <Text style={styles.title}>{customer.name}</Text>
                    <Text style={styles.title}>{customer.lastName}</Text>
                </View>
                <View style={styles.contactContainer}>
                    <Ionicons name={'home-outline'} color={"black"} size={22} />
                    <Text style={styles.title}>{customer.adress}</Text>
                    </View>
                    <View style={styles.contactContainer}>
                    <Ionicons name={'call-outline'} color={"black"} size={22} />
                    <Text style={styles.title}>{customer.contact}</Text>
                    </View>
                </View>
            </Pressable>
        </View>
    )
}

export default CustomerItem;

const styles = StyleSheet.create({
    gridItem: {
        // flex: 1,
        // margin: 16,
        // height: 150,
        // borderRadius: 8,
        // elevation: 4,

        // shadowColor: 'black',
        // shadowOffset: { width: 0, height: 3 },
        // shadowOpacity: 0.25,
        // shadowRadius: 8,
        // overflow: Platform.OS === 'android' ? 'hidden' : 'visible'
        margin: 5,
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: 'white',
        elevation: 4,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.35,
        shadowRadius: 8,
        overflow: 'scroll'
    },
    buttonPressed: {
        opacity: 0.5,
        backgroundColor:'gray'
    },
    contactContainer:{
        flexDirection: 'row',
        alignItems:'center',
        marginVertical: 2
    },
    innerContainer: {

        flex: 1,
        padding: 16,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',

    },
    item: {
        flexDirection: "row",
        alignItems: 'flex-start',
        borderRadius: 6,
        marginVertical: 12,
        backgroundColor: 'white',
        // elevation: 2,
        // shadowColor: 'black',
        // shadowOpacity: 0.15,
        // shadowOffset: { width: 1, height: 1 },
        // shadowRadius: 2
    },
    innerTextContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    textCategory: {
        fontWeight: 'bold',
        fontSize: 18
    },
    button: {
        flex: 1
    },
    image: {
        flex: 1,
        // borderBottomLeftRadius: 4,
        // borderTopLeftRadius: 4,
        borderRadius: 5,
        height: 100,
        margin: 4
    },
    info: {
        flex: 2,
        padding: 12
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        color: "gray",
        marginHorizontal:10
    },
    address: { fontSize: 12, color: "gray" }
})