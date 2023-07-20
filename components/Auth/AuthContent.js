import { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import FlatButton from '../ui/FlatButton';
import AuthForm from './AuthForm';
import { Colors } from '../../constants/styles';
import { useNavigation } from '@react-navigation/native';
import { Video, AVPlaybackStatus } from "expo-av";
import { useEffect } from 'react';
import { useRef } from 'react';
function AuthContent({ isLogin, onAuthenticate }) {
  const navigation = useNavigation();
  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    password: false,
    confirmEmail: false,
    confirmPassword: false,
  });
  const video = useRef(null);

  useEffect(() => {
    if (video) {
      video.current.playAsync();
    }
  }, [video]);
 

  function switchAuthModeHandler() {
    if(isLogin){
      navigation.replace("Signup");
    }else{
      navigation.replace("Login");
    }
    // Todo
  }

  function submitHandler(credentials) {
    let { email, confirmEmail, password, confirmPassword } = credentials;

    email = email.trim();
    password = password.trim();

    const emailIsValid = email.includes('@');
    const passwordIsValid = password.length > 6;
    const emailsAreEqual = email === confirmEmail;
    const passwordsAreEqual = password === confirmPassword;

    if (
      !emailIsValid ||
      !passwordIsValid ||
      (!isLogin && (!emailsAreEqual || !passwordsAreEqual))
    ) {
      Alert.alert('Invalid input', 'Please check your entered credentials.');
      setCredentialsInvalid({
        email: !emailIsValid,
        confirmEmail: !emailIsValid || !emailsAreEqual,
        password: !passwordIsValid,
        confirmPassword: !passwordIsValid || !passwordsAreEqual,
      });
      return;
    }
    onAuthenticate({ email, password });
  }

  return (
    <>
    <View style={styles.container}>
    <Video
    ref={video}
    style={styles.video}
    source={
     require('../../assets/abstract.mp4' )    }
    isLooping
    resizeMode="cover"
  />
  </View>
    <View style={styles.authContent}>
    
      <AuthForm
        isLogin={isLogin}
        onSubmit={submitHandler}
        credentialsInvalid={credentialsInvalid}
      />
      <View style={styles.buttons}>
        <FlatButton onPress={switchAuthModeHandler}>
          {isLogin ? 'Create a new user' : 'Log in instead'}
        </FlatButton>
      </View>
    </View>
    </>
  );
}

export default AuthContent;

const styles = StyleSheet.create({
  authContent: {
   // flex:1,
    marginTop: 164,
    marginHorizontal: 32,
    padding: 16,
    borderRadius: 8,
    backgroundColor: Colors.primary800,
    elevation: 2,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },
  buttons: {
    marginTop: 8,
  },
  video: {
    
    alignSelf: "center",
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
    justifyContent: "center",
    resizeMode: "cover",
    position: "absolute",
    width: "100%",
    flexDirection: "column",
  },
});
