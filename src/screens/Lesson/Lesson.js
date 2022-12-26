import {View, StyleSheet, SafeAreaView, ScrollView, Text} from 'react-native';
import {useState, useEffect} from 'react';
import axios from 'axios';

import Footer from '../../components/Footer';
import LessonQuiz from '../../components/LessonQuiz/LessonQuiz'
import TopNavBar from '../../components/TopNavBar';
import Colors from '../../theme/Colors';
import * as Storage from '../../services/Storage';
import {BACKEND_URL} from '@env';

function Lesson({props, route}){
    const [lesson, setLesson] = useState({});
    const [questions, setQuestions] = useState(null);
    const [balance, setBalance] = useState(0)
    const [lessonId, setLessonId] = useState(route.params?.num);
    useEffect(() => {
        async function getBalance() {
          const token = await Storage.TOKEN.get();
          const authHeader = {Authorization: 'JWT ' + token};
        //   setToken(token);
          const res = await axios.get(BACKEND_URL + '/user/balance', {
            headers: authHeader,
          });
          const data = res.data;
          setBalance(data.balance);
        }
        async function getCurrentLesson() {
            const res = await axios.get(BACKEND_URL + "/lesson/id/" + lessonId);
            // const data = await res.json();
            // console.log("data", res);
            setLesson(res.data);
        }
        getCurrentLesson();
        getBalance();
    }, [])
    useEffect(() => {
        if (lesson !== undefined) {
          if (lesson.questions) {
            setQuestions(lesson.questions);
          }
        }
      }, [lesson]);
    return(
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
            <TopNavBar title="Lesson"  balance={balance} />
            <ScrollView>
                <View style={styles.contentView}>
                    <View style={styles.titleView}>
                        <Text style={styles.questionTitle}>{lesson.title}</Text>
                        <Text style={styles.content}>{lesson.content}</Text>
                    </View>
                    {questions ?
                    (
                        <LessonQuiz lessonId={lessonId} questions={questions} />
                    ) : (<></>)}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
    contentView: {
      paddingTop: 30,
      paddingHorizontal: 30,
      backgroundColor: 'white',
    },
    titleView:{
        paddingBottom: 10,
        borderBottomColor: 'black', 
        borderBottomWidth: StyleSheet.hairlineWidth,  
        marginBottom: 10
    },
    questionTitle:{
      fontWeight: '400',
      marginBottom: 3,
      fontSize: 22,
      color: 'black',
      textAlign: 'center',
      paddingLeft: 10,
      paddingRight: 10,
    },
    content: {
        fontWeight: '400',
        marginBottom: 3,
        fontSize: 18,
        color: 	'black',
        textAlign: 'center',
        paddingRight: 10,
        backgroundColor: 'white',
      },
})
export default Lesson