import { useContext, useEffect, useLayoutEffect, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  View,
  FlatList,
  RefreshControl,
} from "react-native";
import GridServiceAdd from "../components/service/GridServiceAdd";
//import {AuthContext} from '../store/auth-context'
import GridServiceTitle from "../components/service/GridServiceTitle";
import { Colors } from "../constants/styles";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteChoseOrder,
  fetchCustomerDetails,
  fetchServices,
} from "../util/database";
import { useIsFocused } from "@react-navigation/native";
import { fetchServiceDetails, fetchCustomer } from "../util/database";
import { useNavigation } from "@react-navigation/native";

import Onboarding from "react-native-onboarding-swiper";
import IconButton from "../components/ui/IconButton";
import { ScrollView } from "react-native-gesture-handler";
import {setFirstLaunch} from '../store/redux/auth';



function HomeScreen() {
  const [fetchMessage, setFetchMessage] = useState("");
  const [services, setLoadedServicess] = useState([]);
  const [isdelete, setisdelete] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [intro, setIntro] = useState(true);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const email = useSelector((state) => state.auth.email);
  const firstLaunch = useSelector((state) => state.auth.firstLaunch);


  const isFocused = useIsFocused();

  useLayoutEffect(() => {
    async function loadPlaces() {
   
      const services = await fetchServices(email);
      if(services.lenght > 0){
      setIntro(false);
      }else{
        setIntro(true);
      }
     

      setLoadedServicess(services);
    }
    if (isFocused) {
      loadPlaces();
    
    }
  }, [isFocused]);

  function renderServiceDetails(itemData) {
    async function pressHandler() {
      fetchServiceDetails(itemData.index + 1).then((response) => {
        navigation.navigate("ManageService", {
          serviceId: response.id,
          fetchService: response,
        });
      });
    }
    function deleteOrder() {
      deleteChoseOrder(itemData.item.id).finally(async () => {
        const services = await fetchServices(email);
        setLoadedServicess(services);
      });
    }
    function longPress() {
      function deleteItem() {
        deleteChoseOrder(itemData.item.id).finally(async () => {
          const services = await fetchServices(email);
          setLoadedServicess(services);
        });
      }

      Alert.alert("alert", "Do you want delete this order ? ", [
        {
          text: "Cancel",
          //onPress: () => // TO DO onPress 
          style: "cancel",
        },
        { text: "OK", onPress: deleteItem },
      ]);
    }

    return (
      
      <GridServiceTitle
        title={itemData.item.category}
        onPress={pressHandler}
        order={itemData.item}
        longPress={longPress}
        deleteItem={deleteOrder}
        isArchive={false}
      ></GridServiceTitle>
    );
  }

  function navigateToManageServiceService() {
    navigation.navigate("ManageService");
  }


  async function loadOrders() {
    const services = await fetchServices(email);
    setRefreshing(false);
    setLoadedServicess(services);
  }

 

  return (
     
   <View style={styles.rootContainer}>
       
      { !firstLaunch ? 
      <View>
     <Text>{fetchMessage}</Text>
     {!services && <GridServiceAdd
        title={"Add Service"}
        colorIcon={Colors.primary700}
        icon={"pluscircle"}
        size={44}
        onPress={navigateToManageServiceService}
      ></GridServiceAdd>}
      <FlatList
        data={services}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderServiceDetails}
        numColumns={1}
        horizontal={false}
       
      />
      </View>
      
     :
      (
      <Onboarding
        onSkip={() => {
          dispatch(setFirstLaunch({firstLaunch:false}))
        }}
        onDone={() => {
          dispatch(setFirstLaunch({firstLaunch:false}))

          // navigate to main app experience
        }}
        titleStyles={{ fontSize: 44, fontWeight: "800" }}
        subTitleStyles={{ fontSize: 24 }}
        pages={[
          {
            backgroundColor: "black",
            image: (
              <IconButton
                icon="reorder-four-outline"
                size={104}
                color="white"
              />
            ),
            title: "Get Starting",
            subtitle: "Add service, everywhere ",
          },
          {
            backgroundColor: "black",
            image: (
              <IconButton icon="calendar-outline" size={104} color="white" />
            ),
            title: "The best calendar experience.",
            subtitle: "You always meet the deadlines of orders",
          },
        ]}
      />
    )
      }
    </View>
    
    
  );


}

export default HomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
