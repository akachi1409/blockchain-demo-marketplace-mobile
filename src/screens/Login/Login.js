import {View, Text, Image, StyleSheet} from 'react-native';
import { useState, useEffect } from 'react';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import Colors from '../../theme/Colors';
import FormInput from "../../components/FormInput"
import RoundButton from "../../components/RoundButton"
import LoadingOverlay from "../../components/LoadingOverlay";
import Images from '../../theme/Images'
import Messages from '../../theme/Messages'
import * as Storage from "../../services/Storage"
import {BACKEND_URL } from "@env"

function Login(props){
  const [email, setEmail] = useState('Akachi');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('Akachi123');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState({});
  
  onChangeEmail = (text) => {
    
    if (text && text != "") {
      // this.setState({email: text, emailError: null});
      setEmail(text);
    } else {
      // this.setState({email: text})
      setEmail(text);
    }
  }

  onLogin = () => {
    // let email = email.trim();
    // let password = password.trim();
    var isValid = true;
    if (email == null || email.length <= 0 ) {
      setEmailError( Messages.InvalidEmail );
      isValid = false;
    }
    if (password == null || password.length <= 0) {
      setPasswordError( Messages.InvalidPassword);
      isValid = false;
    }
    if (isValid){
      setEmailError("");
      setPasswordError("");
      setIsLoading(true);
      const credentials = {
        username: email,
        password: password
      }
      axios.post(BACKEND_URL+"/auth/login", credentials)
      .then((res)=> {
        setIsLoading(false);
        setResponse(res.data);
      })
      .catch((err)=>{
        setIsLoading(false);
        Toast.show({
          type: 'error',
          text1: Messages.LoginError, 
          position: 'bottom'
        })
      })
    }
  }

  useEffect(()=>{
    if (response.success && response.token) {
      onMoveHome()
      Storage.TOKEN.set(response.token)
    }
  },[response])

  async function onMoveHome() {
    setEmail("");
    setPassword("");
    // var nextScreen = "Home";
    var nextScreen = "Explore";
    props.navigation.navigate(nextScreen);
  }
  
    return(
        <View style={styles.container}>
          <KeyboardAwareScrollView>
            <View style={styles.contentView}>
              <Image
                style={styles.logoImage}
                source={Images.logo01}
              />
               <View style={styles.formView}>
                <FormInput
                  label="Username"
                  placeholder="Testuser1"
                  type="text"
                  value={email}
                  errorMessage = {emailError}
                  onChangeText={(text)=> onChangeEmail(text)}/>
                <FormInput
                  label="Password"
                  placeholder="***********"
                  type="password"
                  value = {password}
                  errorMessage = {passwordError}
                  onChangeText={(text)=> setPassword(text)}
                  />
                  <View style={[styles.centerView, {marginTop: 0}]}>
                    <RoundButton
                      title="LOGIN"
                      theme="blue"
                      style={styles.loginButton}
                      onPress={() => onLogin()} />
                  </View>
               </View>
               
            </View>
          </KeyboardAwareScrollView>
          <Toast />
          {isLoading && <LoadingOverlay/>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        backgroundColor: 'white'
      },
    
      contentView: {
        flex: 1,
        alignItems: 'center',
        paddingLeft: 25,
        paddingRight: 25,
        backgroundColor: 'white'
        // ...ifIphoneX({
        //   marginTop: 20,
        // }, {
        //   marginTop: 0,
        // }),
      },
    
      logoImage: {
        marginTop: 100,
        marginBottom: 50,
        width: 250,
        height: 185,
        resizeMode: 'contain',
      },

      formView: {
        width: '100%',
        marginTop: 2
        // ...ifIphoneX({
        //   marginTop: 20,
        // }, {
        //   marginTop: 0,
        // }),
      },

      loginButton: {
        marginTop: 25,
        // width: '95%',
      },
})
export default Login