import axios from 'axios';
//import Constants from 'expo-constants';
//import {API_KEY} from 'react-native-dotenv'
//const API_KEY = Constants.expoConfig.extra.API_KEY;
//import { API_KEY } from 'react-native-dotenv'
import { REACT_APP_API_KEY } from "@env"

const apiKey = REACT_APP_API_KEY;

export async function authenticate(mode,email,password){
    console.log("API_KEY2" + JSON.stringify( { REACT_APP_API_KEY }))

    console.log("API_KEY" + JSON.stringify(apiKey))
    let tokens = null;
    try{
    const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=` + apiKey,
        {
            email: email,
            password: password,
            returnSecureToken: true
        }
    )
    console.log(response.data)
    const emailResponse = response.data.email;
    const tokenId = response.data.idToken;
    const refreshToken = response.data.refreshToken;
    tokens= [tokenId,refreshToken,emailResponse]
    }catch(error){
        console.log(error)
    }
    return tokens;
        
}

export async function createUser(email,password){
    

    const response = await axios.post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + apiKey,
        {
            email: email,
            password: password,
            returnSecureToken: true
        }
    )
    const tokenId = response.data.idToken;
    const refreshToken = response.data.refreshToken;
    const tokens = [tokenId,refreshToken]
    return tokens;
}

export async function refreshToken(refreshToken){


    const response = await axios.post(
        'https://securetoken.googleapis.com/v1/token?key=' + apiKey,
        {
            grant_type: "refresh_token",
            refresh_token: refreshToken
        }
    )
console.log("repsonsedata" +response.data.refresh_token)
return response.data.id_token;
}

export  function createUse(email,password){
   return   authenticate('signUp',email,password)
}

export  function login(email,password){
      return authenticate('signInWithPassword',email,password)
 }

export function refreshSession(token){
    return refreshToken(token);

}