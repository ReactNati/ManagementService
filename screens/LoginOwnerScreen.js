import AuthContent from '../components/Auth/AuthContent';
import { useState,useContext } from 'react';
import {login} from '../util/auth'
import LoadingOverlay from '../components/ui/LoadingOverlay'
import { Alert } from 'react-native';
import {authenticate} from '../store/redux/auth';
import {useSelector,useDispatch} from 'react-redux'
function LoginOwnerScreen() {

  const [isAuthenticating,setIsAuthenticating] = useState(false);
  //const authCtx = useContext(AuthContext)
  //const auth = useSelector((state)=> state.auth.token) 
  const dispatch = useDispatch();
  async function loginHandler({email,password}){

    try{
    setIsAuthenticating(true);
    const token = await login(email,password);
   // authCtx.authenticate(token);
    dispatch(authenticate({token:token[0],email:token[2],firstLaunch:true}))
    setIsAuthenticating(false);

    }catch(error){
      console.log("error:" + error)
      
      setIsAuthenticating(false)
      Alert.alert("Authentication failed!","Please check your credential or try again later." + JSON.stringify(error))
    }
  }

  if(isAuthenticating){
    
      return <LoadingOverlay message="Logging you in ..." />

   
  }
  
  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginOwnerScreen;
