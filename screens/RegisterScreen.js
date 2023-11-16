import { useContext, useState } from 'react';
import AuthContent from '../components/Auth/AuthContent';
import {createUser} from '../util/auth'
import LoadingOverlay from '../components/ui/LoadingOverlay'
import {authenticate} from '../store/redux/auth';
import {useSelector,useDispatch} from 'react-redux'
function RegisterScreen() {
  const [isAuthenticating,setIsAuthenticating] = useState(false);
  const dispatch = useDispatch();
  async function signUpUser({email,password}){
    setIsAuthenticating(true);

    try{

    const token =  await createUser(email,password);
    dispatch(authenticate({token:token[0]}))
      setIsAuthenticating(false);

    }catch(error){
      setIsAuthenticating(false);
      console.log("error:" + error)

    }

  }

  if(isAuthenticating){
    return <LoadingOverlay message="Creating user ..." />
  }
  return <AuthContent onAuthenticate={signUpUser}/>;
}

export default RegisterScreen;