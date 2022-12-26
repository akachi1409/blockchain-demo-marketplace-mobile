import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import {useState, useEffect} from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Snackbar from 'react-native-snackbar';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

import FormInput from "../../components/FormInput";
import RoundButton from "../../components/RoundButton";
import TopNavBar from '../../components/TopNavBar';
import Colors from '../../theme/Colors';
import Footer from "../../components/Footer"
import * as Storage from '../../services/Storage';
import {BACKEND_URL, COIN_PLACEHOLDER, COIN_LOGO} from '@env';

function Setting(){
    const navigation = useNavigation();
    const [firstName, setFirstName] = useState('')
    const [firstNameError, setFirstNameError] = useState('')
    const [lastName, setLastName] = useState('')
    const [lastNameError, setLastNameError] = useState('')
    const [username, setUsername] = useState('')
    const [usernameError, setUsernameError] = useState('')
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordError, setNewPasswordError] = useState('')
    const [rePassword, setRePassword] = useState('');
    const [rePasswordError, setRePasswordError] = useState('')
    const [balance, setBalance] = useState(0);
    const [user, setUser] = useState({});
    useEffect(() => {
        async function getBalanceAndHistory() {
            const token = await Storage.TOKEN.get();
            const authHeader = {Authorization: 'JWT ' + token};
            const res = await axios.get(BACKEND_URL + '/user/balance', {
                headers: authHeader,
            });
            const data = res.data;
            const resUser = await axios.get(BACKEND_URL + '/user/info', {
                headers: authHeader,
            })
            const dataUser = resUser.data;
            // console.log(dataUser);
            setUser(dataUser)
            setBalance(data.balance);
        }
        getBalanceAndHistory();
    }, []);

    async function handleSubmitInfo() {
        const credentials = {
            username: username,
            firstName: firstName,
            lastName: lastName,
            email: email
        }
        const token = await Storage.TOKEN.get();
        const authHeader = {Authorization: 'JWT ' + token};
        try{
            await axios.post(BACKEND_URL + '/user/update/info', credentials, {
                headers: authHeader,
            });
            Snackbar.show({
                text: "Success updating user info",
                duration: Snackbar.LENGTH_SHORT,
            })
            navigation.replace("Setting")
        }catch(err){
            Snackbar.show({
                text: "Error updating user info",
                duration: Snackbar.LENGTH_SHORT,
            })
        }
    }

    async function handleSubmitCredentials() {
        if (newPassword !== rePassword){
            setNewPasswordError("Password unmatch!");
            setRePasswordError("Password unmatch!");
            return;
        }
        const userInput = {
            currentPassword: password,
            newPassword:newPassword,
            rePassword: rePassword,
        }
        try{
            await axios.post(BACKEND_URL + '/user/update/credentials', userInput, {
                headers: authHeader,
            });
            Snackbar.show({
                text: "Success updating user credential.",
                duration: Snackbar.LENGTH_SHORT,
            })
            navigation.replace("Setting")
        }catch(err){
            Snackbar.show({
                text: "Error updating user credential",
                duration: Snackbar.LENGTH_SHORT,
            })
        }
    }
    return(
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
            <TopNavBar title="Setting"  balance={balance} />
            <View style={styles.container}>
                <KeyboardAwareScrollView>
                    <View style={styles.contentView}>
                        <View style={styles.formView}>
                            <Text style={styles.title}>Personalize</Text>
                            <FormInput
                                label="Username"
                                placeholder={user.username}
                                type="text"
                                value={username}
                                errorMessage = {usernameError}
                                onChangeText={(text)=> setUsername(text)}/>
                            <FormInput
                                label="First Name"
                                placeholder={user.firstName}
                                type="text"
                                value={firstName}
                                errorMessage = {firstNameError}
                                onChangeText={(text)=> setFirstName(text)}/>
                            <FormInput
                                label="Last Name"
                                placeholder={user.lastName}
                                type="text"
                                value={lastName}
                                errorMessage = {lastNameError}
                                onChangeText={(text)=> setLastName(text)}/>
                            <FormInput
                                label="Email"
                                placeholder={user.email}
                                type="text"
                                value={email}
                                errorMessage = {emailError}
                                onChangeText={(text)=> setEmail(text)}/>
                            <RoundButton
                                title="Submit"
                                theme="blue "
                                style={styles.submitButton}
                                onPress={() => handleSubmitInfo()} 
                            />
                        </View>
                        <View style={styles.formView}>
                            <Text style={styles.title}>Security</Text>
                            <FormInput
                                label="Current Password"
                                placeholder=''
                                type="password"
                                value={password}
                                errorMessage = {passwordError}
                                onChangeText={(text)=> setPassword(text)}/>
                            <FormInput
                                label="New Password"
                                placeholder=''
                                type="password"
                                value={newPassword}
                                errorMessage = {newPasswordError}
                                onChangeText={(text)=> setNewPassword(text)}/>
                            <FormInput
                                label="Re-enter Password"
                                placeholder=''
                                type="password"
                                value={rePassword}
                                errorMessage = {rePasswordError}
                                onChangeText={(text)=> setRePassword(text)}/>
                            <RoundButton
                                title="Submit"
                                theme="blue"
                                style={styles.submitButton}
                                onPress={() => handleSubmitCredentials()} 
                            />
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </View>
            <Footer/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white'
    },
    contentView: {
        paddingTop: 30,
        paddingHorizontal: 30,
    },
    formView: {
        width: '100%',
        marginVertical: 20,

        // ...ifIphoneX({
        //   marginTop: 20,
        // }, {
        //   marginTop: 0,
        // }),
    },
    title: {
        fontWeight: '400',
        marginBottom: 3,
        fontSize: 20,
        color: Colors.blackColor,
        textAlign: 'center',
        paddingLeft: 10,
        paddingRight: 10,
    },
    submitButton: {
        marginTop: 10
    }
})
export default Setting;
