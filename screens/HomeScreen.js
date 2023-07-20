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
//import { BannerAd, BannerAdSize, MobileAds, TestIds, InterstitialAd } from 'react-native-google-mobile-ads';
// import {
//   InterstitialAd,
//   AdEventType,
//   TestIds,
// } from "react-native-google-mobile-ads";
import Onboarding from "react-native-onboarding-swiper";
import IconButton from "../components/ui/IconButton";
import { ScrollView } from "react-native-gesture-handler";
import {setFirstLaunch} from '../store/redux/auth';

// const interstitial = InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL, {
//   requestNonPersonalizedAdsOnly: true,
//   keywords: ["fashion", "clothing"],
// });

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

  // const dataExample = [
  //   { id: 1, title: "Add service" }

  // ]
  // useEffect(()=>{
  //  // const auth = useSelector((state)=> state.auth.token)

  // })
  const isFocused = useIsFocused();

  useLayoutEffect(() => {
    async function loadPlaces() {
    // const servicee = useSelector((state) => state.auth.email)
      // console.log("serviceeee" + JSON.stringify(servicee))
      const services = await fetchServices(email);
      console.log("services2" + JSON.stringify(services));
      if(services.lenght > 0){
      setIntro(false);
      }else{
        setIntro(true);
      }
     

      setLoadedServicess(services);
    }
    if (isFocused) {
      loadPlaces();
      //  setLoadedPlaces((curPlaces)=>[...curPlaces,route.params.place])

      // const unsubscribe = interstitial.addAdEventListener(
      //   AdEventType.LOADED,
      //   () => {
      //     setLoaded(true);
      //     interstitial.show();
      //   }
      // );

      // Start loading the interstitial straight away
      // interstitial.load();
      // Unsubscribe from events on unmount
      //return unsubscribe;
    }
  }, [isFocused]);

  function renderServiceDetails(itemData) {
    async function pressHandler() {
      fetchServiceDetails(itemData.index + 1).then((response) => {
        console.log(response);
        navigation.navigate("ManageService", {
          serviceId: response.id,
          fetchService: response,
        });
      });
    }
    function deleteOrder() {
      deleteChoseOrder(itemData.item.id).finally(async () => {
        const services = await fetchServices(email);
        console.log("services" + JSON.stringify(services));
        setLoadedServicess(services);
      });
    }
    function longPress() {
      function deleteItem() {
        deleteChoseOrder(itemData.item.id).finally(async () => {
          const services = await fetchServices(email);
          console.log("services" + JSON.stringify(services));
          setLoadedServicess(services);
        });
      }

      Alert.alert("alert", "Do you want delete this order ? ", [
        {
          text: "Cancel",
          //onPress: () => console.log("Cancel Pressed"),
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
  // useEffect(() => {

  //   const unsubscribe = interstitial.addAdEventListener(AdEventType.LOADED, () => {
  //     setLoaded(true);
  //   });

  //   // Start loading the interstitial straight away
  //   interstitial.load();

  //   // Unsubscribe from events on unmount
  //   return unsubscribe;
  // }, []);

  async function loadOrders() {
    const services = await fetchServices(email);
    setRefreshing(false);
    console.log("indicatos" + JSON.stringify(services));
    setLoadedServicess(services);
  }

  // if (!loaded) {
  //   return null;
  // }

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
        // refreshControl={
        //   <RefreshControl refreshing={refreshing} onRefresh={loadOrders} />
        // }
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


  {
    /* <InterstitialAd
    unitId={TestIds.BANNER}
     // unitId={"ca-app-pub-5936989251991214/8487680324"}
      size={BannerAdSize.LARGE_BANNER}
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
       // onAdFailedToLoad: (error) => {console.error(error)}
      }}
    /> */
  }
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
