
import React from 'react';
import { FlatList, Pressable, View, Text, StyleSheet, Platform ,useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 
import {Colors} from '../../constants/styles'
// const { height, width } = useWindowDimensions();


function GridServiceAdd({icon,size, title,colorIcon, color, onPress }) {
    const navigation = useNavigation();
    const { height, width } = useWindowDimensions();
    return (
        <View style={[styles.gridItem,{width:width-70}]}>
            <Pressable
                android_ripple={{ color: '#ccc' }}
                style={({ pressed }) => [styles.button, pressed ? styles.buttonPressed : null]}
                onPress={onPress}
            >
                <View style={[styles.innerContainer, { backgroundColor: color }]}

                >
                {/* <View style={styles.innerTextContainer}> */}
                    <View style={styles.titleContainer}>
                    <AntDesign name={icon} color={colorIcon} size={size} />
                    <Text style={styles.textCategory}> {title}</Text>

                {/* </View> */}
                </View>
                </View>
            </Pressable>
        </View>
    )
}

export default GridServiceAdd;

const styles = StyleSheet.create({
    titleContainer:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        textAlign:'center',
    },
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
        height:120,
        margin:5,
        borderRadius:8,
        overflow:'hidden',
        backgroundColor:'white',
        elevation:4,
        shadowColor:'black',
        shadowOffset:{width:0,height:0},
        shadowOpacity:0.35,
        shadowRadius:8,
        overflow:'scroll'
    },
    buttonPressed: {
        opacity: 0.5
    },
    innerContainer: {

        flex: 1,
        padding: 16,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',

    },
    innerTextContainer:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textCategory: {
        fontWeight: 'bold',
        fontSize: 34,
        color:Colors.primary700
    },
    button: {
        flex: 1
    }
})