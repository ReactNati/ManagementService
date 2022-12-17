
import React from 'react';
import { FlatList, Pressable, View, Text, StyleSheet, Platform ,useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// const { height, width } = useWindowDimensions();


function GridServiceTitle({ title, color, onPress }) {
    const navigation = useNavigation();
    const { height, width } = useWindowDimensions();
    return (
        <View style={[styles.gridItem]}>
            <Pressable
                android_ripple={{ color: '#ccc' }}
                style={({ pressed }) => [styles.button, pressed ? styles.buttonPressed : null]}
                onPress={onPress}
            >
                <View style={[styles.innerContainer, { backgroundColor: color },{width:width}]}

                >
                <View style={styles.innerTextContainer}>
                    <Text style={styles.textCategory}> {title}</Text>
                </View>
                </View>
            </Pressable>
        </View>
    )
}

export default GridServiceTitle;

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
        justifyContent: 'center',
        alignItems: 'center',
    },
    textCategory: {
        fontWeight: 'bold',
        fontSize: 18
    },
    button: {
        flex: 1
    }
})