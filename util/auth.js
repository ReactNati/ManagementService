import axios from 'axios';
import {API_KEY} from '@env'
export async function authenticate(mode,email,password){
    console.log("jestemtut2")
    console.log("ApiKey" + API_KEY);
    const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=` + API_KEY,
        {
            email: email,
            password: password,
            returnSecureToken: true
        }
    )
    console.log(response.data)
    const tokenId = response.data.idToken;
    const refreshToken = response.data.refreshToken;
    const tokens = [tokenId,refreshToken]
    return tokens;
        
}

export async function createUser(email,password){
    console.log("jestemtut1")
    console.log("ApiKey" + API_KEY);

    const response = await axios.post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + API_KEY,
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
    console.log("jestemtut")
    console.log("ApiKey" + API_KEY);

    const response = await axios.post(
        'https://securetoken.googleapis.com/v1/token?key=' + API_KEY,
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