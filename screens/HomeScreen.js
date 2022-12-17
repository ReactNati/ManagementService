import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View,FlatList } from 'react-native';
import GridServiceAdd from '../components/service/GridServiceAdd';
//import {AuthContext} from '../store/auth-context'
import GridServiceTitle from '../components/service/GridServiceTitle';
import {Colors} from '../constants/styles'
import {useSelector,useDispatch} from 'react-redux'

function HomeScreen({navigation}) {
  const [fetchMessage,setFetchMessage] = useState('');
const service = useSelector((state)=> state.service.service) 
  console.log("service" + JSON.stringify(service))
  const dataExample =[
    {id:1,title:"Add service"}

  ]
// useEffect(()=>{
//  // const auth = useSelector((state)=> state.auth.token) 
  
// })
  function renderServiceDetails(itemData){

    function pressHandler(){
      navigation.navigate("ServiceDetails",{
        serviceId: itemData.item.id

      })

    }

      return (
        
      <GridServiceTitle title={itemData.item.title} onPress={pressHandler}></GridServiceTitle>
      
      )
  }

  function navigateToManageServiceService(){
    navigation.navigate("ManageService");
  }
  //const authCtx = useContext(AuthContext);
  //const token = authCtx.token;
//   useEffect(()=>{
//     try{
//     axios.get("https://reactnativecours-default-rtdb.firebaseio.com/message.json?auth=" + token).then((response)=>{
//     console.log(response.data)
//     setFetchMessage(response.data)
//     })
//   } catch(error){
//     Alert.alert(error)
//   }
// },[token])

  return <View style={styles.rootContainer}>
      <Text>{fetchMessage}</Text>
      <GridServiceAdd title={"Add Service"} colorIcon={Colors.primary700} icon={'pluscircleo'} size={44} onPress={navigateToManageServiceService} ></GridServiceAdd>
      <FlatList
      data={dataExample}
      keyExtractor={dataExample.id}
      renderItem={renderServiceDetails}
      numColumns={1}
      horizontal={false}
      />
    </View>
  
}

export default HomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});
