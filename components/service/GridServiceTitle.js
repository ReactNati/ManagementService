
import React from 'react';
import { FlatList, Pressable, View, Text, StyleSheet, Platform ,useWindowDimensions,Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Progress from 'react-native-progress';

// const { height, width } = useWindowDimensions();


function GridServiceTitle({ title, color, onPress, order}) {
    const navigation = useNavigation();
    const { height, width } = useWindowDimensions();
    return (
        <View style={[styles.gridItem]}>
            <Pressable
                android_ripple={{ color: '#ccc' }}
                style={({ pressed }) => [styles.button, pressed ? styles.buttonPressed : null]}
                onPress={onPress}
            >
                 <View style={[styles.item, { backgroundColor: color },{width:width}]}

                >
                {/* <View style={styles.innerTextContainer}>
                    <Text style={styles.textCategory}> {title}</Text>
                </View> */}
                
                 <Image style={styles.image} source={{ uri: order.imageUri }} />
            <View style={styles.info}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.address}>{order.date}</Text>
                <Progress.Bar progress={0.3}  />
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
    },
    image: {
        flex: 1,
        borderBottomLeftRadius: 4,
        borderTopLeftRadius: 4,
        height: 100
    },
    info: {
        flex: 2,
        padding:12
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        color: "gray"
    },
    address: {fontSize:12,color: "gray"}
})