import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View, FlatList } from 'react-native';
import GridServiceAdd from '../components/service/GridServiceAdd';
//import {AuthContext} from '../store/auth-context'
import GridServiceTitle from '../components/service/GridServiceTitle';
import { Colors } from '../constants/styles'
import { useSelector, useDispatch } from 'react-redux'
import { fetchServices } from '../util/database';
import { useIsFocused } from '@react-navigation/native';

function HomeScreen({ navigation }) {
  const [fetchMessage, setFetchMessage] = useState('');
  const [services, setLoadedServicess] = useState([]);
  
  const email = useSelector((state) => state.auth.email)


  // const dataExample = [
  //   { id: 1, title: "Add service" }

  // ]
  // useEffect(()=>{
  //  // const auth = useSelector((state)=> state.auth.token) 

  // })
  const isFocused = useIsFocused();

  useEffect(() => {

    async function loadPlaces() {
      // const servicee = useSelector((state) => state.auth.email)
      // console.log("service" + JSON.stringify(servicee))
      const services = await fetchServices(email);
      setLoadedServicess(services);
    }
    if (isFocused) {
      loadPlaces();
      //  setLoadedPlaces((curPlaces)=>[...curPlaces,route.params.place])
    }
  }, [isFocused])

  function renderServiceDetails(itemData) {
    console.log(itemData)
    function pressHandler() {
      navigation.navigate("ServiceDetails", {
        serviceId: itemData.item.id

      })

    }

    return (

      <GridServiceTitle title={itemData.item.category} onPress={pressHandler} order={itemData.item}></GridServiceTitle>

    )
  }

  function navigateToManageServiceService() {
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
      data={services}
      keyExtractor={(item) => item.id}
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
