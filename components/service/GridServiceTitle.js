
import React, { useEffect, useState } from 'react';
import { FlatList, Pressable, View, Text, StyleSheet, Platform ,useWindowDimensions,Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Progress from 'react-native-progress';
import moment from 'moment/moment';
import * as Notifications from 'expo-notifications';
import { deleteChoseOrder, insertArchiveOrders } from '../../util/database';
// const { height, width } = useWindowDimensions();
Notifications.setNotificationHandler({
    handleNotification:async ()=>{
return {
    shouldPlaySound:true,
    shouldShowAlert:true,
    shouldSetBadge:true
}
    }
})

function GridServiceTitle({ title, color, onPress, order, longPress,deleteItem, isArchive}) {
    const navigation = useNavigation();
    const { height, width } = useWindowDimensions();
    const [progress,setProgress] = useState(()=>{
        if(!isArchive){
        const dateFrom = moment(order.date).format('YYYY-MM-DD HH:mm:ss');
        const dateTo = moment(new Date(order.dateEnd)).format('YYYY-MM-DD HH:mm:ss')
        const hoursDateEnd = Math.abs(moment(dateFrom).diff(dateTo)) / 36e5;
        const hoursDateTo = Math.abs(moment(new Date()).diff(dateFrom)) / 36e5;
       const progressHours = hoursDateTo/hoursDateEnd

       if(progressHours >= 1){

        insertArchiveOrders(order).then(async ()=>{
            Notifications.scheduleNotificationAsync({
                content: {
                    title:'Notifications',
                    body:`End ${order.category} order. Show in archive orders.`,
    
                },
                trigger:{seconds:5}
            })
            deleteItem();
        })
       
       }
    
       return progressHours;
    }
    });
    useEffect(()=>{
        if(!isArchive){
    async function calculateProgressBar(){
        return new Promise((resolve,reject)=>{
            try {
                
                const dateFrom = moment(order.date).format('YYYY-MM-DD HH:mm:ss');
                const dateTo = moment(new Date(order.dateEnd)).format('YYYY-MM-DD HH:mm:ss')
                const hoursDateEnd = Math.abs(moment(dateFrom).diff(dateTo)) / 36e5;
                const hoursDateTo = Math.abs(moment(new Date()).diff(dateFrom)) / 36e5;
               const progressHours = hoursDateTo/hoursDateEnd
                resolve(progressHours)
            } catch (error) {
                reject(false)
            }
        })
    }
    let interval = null;

    if(moment(new Date(order.dateEnd)).isAfter(moment(new Date()))){
        interval = setInterval(() => {
            
         calculateProgressBar().then((resolve) => {
            if(resolve){
                setProgress(resolve)
            }
        })
        
    },1800000)
    }else{

    clearInterval(interval)
    }

    return () => clearInterval(interval);
}
    },[progress])

    return (
        <View style={[styles.gridItem]}>
            <Pressable
                android_ripple={{ color: '#ccc' }}
                style={({ pressed }) => [styles.button, pressed ? styles.buttonPressed : null]}
                onPress={onPress}
                onLongPress={longPress}
            >
                 <View style={[styles.item, { backgroundColor: color },{width:width}]}

                >
                
                
                 <Image style={styles.image} source={{ uri: order.imageUri }} />
            <View style={styles.info}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.address}>Start: {order.date}</Text>
                <Text style={styles.address}>End: {order.dateEnd}</Text>

                {!isArchive && <Progress.Bar progress={progress}  />}
                </View>
            </View>
            </Pressable>
        </View>
    )
}

export default GridServiceTitle;

const styles = StyleSheet.create({
    gridItem: {
        
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
        // borderBottomLeftRadius: 4,
        // borderTopLeftRadius: 4,
        borderRadius:5,
        height: 100,
        margin:4
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