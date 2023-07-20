
import { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View, FlatList,RefreshControl } from 'react-native';
import GridServiceAdd from '../components/service/GridServiceAdd';
//import {AuthContext} from '../store/auth-context'
import GridServiceTitle from '../components/service/GridServiceTitle';
import { Colors } from '../constants/styles'
import { useSelector, useDispatch } from 'react-redux'
import { deleteChoseOrder, fetchArchiveOrders, fetchCustomerDetails, fetchServices,deleteArchiveChoseOrder } from '../util/database';
import { useIsFocused } from '@react-navigation/native';
import { fetchServiceDetails, fetchCustomer } from '../util/database';
import { useNavigation } from '@react-navigation/native';

function ArchiveOrders() {
  const [fetchMessage, setFetchMessage] = useState('');
  const [services, setLoadedServicess] = useState([]);
  const [isdelete, setisdelete] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const navigation = useNavigation();

  const email = useSelector((state) => state.auth.email)

  const isFocused = useIsFocused();

  useLayoutEffect(() => {

    async function loadPlaces() {
      // const servicee = useSelector((state) => state.auth.email)
      // console.log("service" + JSON.stringify(servicee))
      const services = await fetchArchiveOrders(email);
      console.log("services" + JSON.stringify(services));
      setLoadedServicess(services);
    }
    if (isFocused) {
      loadPlaces();
      //  setLoadedPlaces((curPlaces)=>[...curPlaces,route.params.place])
    }
  }, [isFocused])

  function renderServiceDetails(itemData) {

    async function pressHandler() {

    //   fetchServiceDetails(itemData.index + 1).then((response) => {
    //     console.log(response)
    //     navigation.navigate("ManageService", {
    //       serviceId: response.id,
    //       fetchService: response

    //     })
    //   })


    }

    function longPress() {
      function deleteItem() {
        deleteArchiveChoseOrder(itemData.item.id).finally(async () => {
          const services = await fetchArchiveOrders(email);
          console.log("services" + JSON.stringify(services));
          setLoadedServicess(services);
        })
      }

      Alert.alert("alert", "Do you want delete this order ? ", [
        {
          text: "Cancel",
          //onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: deleteItem }
      ])
    }

    return (

      <GridServiceTitle title={itemData.item.category} onPress={pressHandler} order={itemData.item} longPress={longPress} isArchive={true} ></GridServiceTitle>

    )
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
  async function loadOrders(){
    const services = await fetchArchiveOrders(email)
    setRefreshing(false)
    console.log("indicatos" + JSON.stringify(services));
    setLoadedServicess(services);
  }

  return <View style={styles.rootContainer}>
    <Text>{fetchMessage}</Text>
    <FlatList
      data={services}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderServiceDetails}
      numColumns={1}
      horizontal={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={loadOrders} />
      }
    />
  </View>

}

export default ArchiveOrders;

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
