import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
//import AppLoading from 'expo-app-loading'
import LoginOwnerScreen from './screens/LoginOwnerScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import { Colors } from './constants/styles';
//import AuthContextProvider, { AuthContext } from './store/auth-context';
import { useEffect, useState } from 'react';
import IconButton from './components/ui/IconButton'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Provider,useSelector,useDispatch} from 'react-redux'
import {store} from './store/redux/store'
import {logout} from './store/redux/auth';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ServiceDetails from './screens/ServiceDetails';
import ManageService from './screens/ManageService';
import AppLoading from 'expo-app-loading';
import { init } from './util/database';
import LoadingOverlay from './components/ui/LoadingOverlay';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Login" component={LoginOwnerScreen} />
      <Stack.Screen name="Signup" component={RegisterScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
//  const authCtx = useContext(AuthContext)
const dispatch = useDispatch();
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Drawer.Screen name="Welcome" component={HomeScreen} options={{
        headerRight:({tintColor})=>{return <IconButton icon='exit' color={tintColor} size={20} 
        onPress={()=> dispatch(logout())}
        />}
      }}/>
      <Drawer.Screen name="ManageService" component={ManageService} options={{
        // headerRight:({tintColor})=>{return <IconButton icon='exit' color={tintColor} size={20} 
        // onPress={()=> dispatch(logout())}
        // />}
      }}/>
    </Drawer.Navigator>
  );
}
function Root(){
  const [isTryingLogin,setIsTryingLogin] = useState(true);
 // const authCtx = useContext(AuthContext);
//   useEffect(() =>{
//     async function fetchToken(){
//         const storedToken = await AsyncStorage.getItem('token');
//         if(storedToken) {
//        //   authCtx.authenticate(storedToken)
//            // setAuthToken(storedToken);
//         }
//     }
//     fetchToken();
// },[])

// if(isTryingLogin){
//   return <AppLoading />
// }

return (<Navigation></Navigation>)
}
function Navigation() {
  const isAuthenticated = useSelector((state)=> state.auth.isAuthenticated) 
 // const authCtx = useContext(AuthContext)
// console.log("ads"+ authCtx.isAuthenticated)
  return (
    <NavigationContainer>
      
     {!isAuthenticated && <AuthStack />}
     {isAuthenticated && <AuthenticatedStack />}

    </NavigationContainer>
  );
}

export default function App() {
  const [dbInitialized,setDbInitialized]= useState(); // to do initialized "spinner,loading"

  useEffect(()=>{
    init().then(()=>{
      setDbInitialized(true)
    }).catch((error) =>{
      console.log(error)
    });
  },[])

  if(!dbInitialized){return <LoadingOverlay message="Creating database ..." />
}

  return (
    <>
      <StatusBar style="dark" />
      <Provider store={store}>

      <Root/>
      </Provider>

    </>
  );
}
