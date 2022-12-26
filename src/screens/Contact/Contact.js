import {View, Text, StyleSheet, ScrollView, SafeAreaView} from 'react-native';
import {useState, useEffect} from 'react';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import axios from 'axios';
import Snackbar from 'react-native-snackbar';

// import {SafeAreaInsetsContext} from 'react-native-safe-area-context';
import FormInput from "../../components/FormInput"
import RoundButton from "../../components/RoundButton"
import TopNavBar from '../../components/TopNavBar';
import Footer from '../../components/Footer';
import Colors from '../../theme/Colors';
import * as Storage from '../../services/Storage';
import {BACKEND_URL} from '@env';

function Contact(props) {
  const [balance, setBalance] = useState(0);
  const [token, setToken] = useState('');
  const [faqs, setFAQs] = useState(null);
  const [alertOpen, setAlertOpen] = useState(false);
  const [user, setUser] = useState('');
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState('')
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [message, setMessage] = useState('');
  
  useEffect(() => {
    async function getBalance() {
      const token = await Storage.TOKEN.get();
      const authHeader = {Authorization: 'JWT ' + token};
      setToken(token);
      const res = await axios.get(BACKEND_URL + '/user/balance', {
        headers: authHeader,
      });
      const data = res.data;
      setBalance(data.balance);
    }
    async function getUser() {
      const token = await Storage.TOKEN.get();
      const authHeader = {Authorization: 'JWT ' + token};
      setToken(token);
      const res = await axios.get(BACKEND_URL + '/user/info', {
        headers: authHeader,
      });
      const data = res.data;
      setUser(data);
    }
    async function getFAQs() {
      const res = await axios.get(BACKEND_URL + '/info/faq');
      const data = res.data;
      console.log('data', data);
      setFAQs(data.faqs);
    }
    getUser();
    getFAQs();
    getBalance();
  }, []);

  
  async function handleSubmitMessage() {
    const userInput = {
      name: username,
      email: email,
      message: message,
      user_id: user.user_id
    }

    const res = await axios.post(BACKEND_URL + '/info/contact', userInput);
    if(res.data.success){
      Snackbar.show({
        text: "Thank you for your message! Our team will get back to you shortly :)",
        duration: Snackbar.LENGTH_INDEFINITE,
      })
    }else{
      Snackbar.show({
        text: "Error in the server, please retry later.",
        duration: Snackbar.LENGTH_INDEFINITE,
      })
    }
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <TopNavBar title="Contact US" balance={balance} />
      <ScrollView style={styles.container}>
        <View style={styles.contentView}>
          <Text style={styles.questionTitle}>Frequently Asked Questions</Text>
          {faqs ? (
            faqs.map((faq, i) => {
              return (
                <Collapse style={styles.collapseView} key={i}>
                  <CollapseHeader>
                    <View>
                      <Text style={styles.title}>{faq.question}</Text>
                    </View>
                  </CollapseHeader>
                  <CollapseBody style={styles.collapseBodyBiew}>
                    <Text style={styles.answer}>{faq.answer}</Text>
                  </CollapseBody>
                </Collapse>
              );
            })
          ) : (
            <></>
          )}
          <Text style={[styles.questionTitle, {marginTop: 10}]}>Still Need Help? Contact Us!</Text>
          <View style={styles.formView}>
            <FormInput
              label="Your Email"
              placeholder="test@test.com"
              type="email"
              value={email}
              errorMessage = {emailError}
              onChangeText={(text)=> setEmail(text)}/>
            <FormInput
              label="Your UserName"
              placeholder="Testuser"
              type="text"
              value={username}
              errorMessage = {usernameError}
              onChangeText={(text)=> setUsername(text)}/>
            <FormInput
              label="Your Message"
              placeholder="Testuser"
              type="textview"
              value={message}
              errorMessage = {usernameError}
              onChangeText={(text)=> setMessage(text)}/>
              <View style={[styles.centerView, {marginTop: 0}]}>
                <RoundButton
                  title="Submit"
                  theme="blue"
                  style={styles.loginButton}
                   onPress={() => handleSubmitMessage()}
                   />
              </View>
          </View>
        </View>
      </ScrollView>
      <Footer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentView: {
    paddingTop: 30,
    paddingHorizontal: 30,
  },
  questionTitle:{
    fontWeight: '400',
    marginBottom: 3,
    fontSize: 25,
    color: 'black',
    textAlign: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  collapseView:{
    borderColor: Colors.blackColor,
    borderRadius: 3,
    borderWidth: 1,
    paddingVertical: 2,
    marginTop: 3,
    marginBottom: 6,
    color: 'black'
  },
  collapseBodyBiew:{
    marginVertical: 3,
    backgroundColor: 'white'
  },
  title: {
    fontWeight: '400',
    marginBottom: 3,
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  answer: {
    fontWeight: '400',
    marginBottom: 3,
    fontSize: 15,
    color: Colors.subTextColor,
    textAlign: 'center',
    paddingRight: 10,
    backgroundColor: 'white',
    color:'black',
    borderColor: 'black'
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
});
export default Contact;
