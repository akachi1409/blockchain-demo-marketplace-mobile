import {View, ScrollView, StyleSheet, Text} from 'react-native';
import {useState, useEffect} from 'react';
import axios from 'axios';
import { LinearProgress } from "@rneui/themed";
import Snackbar from 'react-native-snackbar';
import Icon from 'react-native-vector-icons/FontAwesome'
import { useNavigation } from '@react-navigation/native';

import FormInput from "../../components/FormInput"
import RoundButton from "../../components/RoundButton"
import LessonQuestion from "../../components/LessonQuestion/LessonQuestion"
import Colors from '../../theme/Colors';
import * as Storage from '../../services/Storage';
import {BACKEND_URL} from '@env';

function LessonQuiz(props){
    const navigation = useNavigation();
    const [progress, setProgress] = useState(null);
    const [questions, setQuestions] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState({});
    const [correctCount, setCorrectCount] = useState(0);
    const [complete, setComplete] = useState(false);

    const [answer, setAnswer] = useState('')
    const [answerOnly, setAnswerOnly] = useState(false)
    const [showCheck, setShowCheck] = useState(true);
    const [leftShow, setLeftShow] = useState(false);
    const [rightShow, setRightShow] = useState(true);

    async function getProgress() {
        const token = await Storage.TOKEN.get();
        const authHeader = {Authorization: 'JWT ' + token};
        const res = await axios.get(BACKEND_URL+ "/user/progress/" + props.lessonId, {headers: authHeader});
        const data = res.data;
        console.log("quiz", props, "progress", data.progress);
        setProgress(data.progress);
    }

    useEffect(() => {
        getProgress();
        setQuestions(props.questions);
    }, []);

    useEffect(() => {
        if (questions) {
          setCurrentQuestion(questions[0]);
        }
    }, [questions]);

    useEffect(()=>{
        if (progress) {
          setCorrectCount(Object.keys(progress).length)
          const questionNum = currentQuestion.number;
          console.log("questionNum", progress[questionNum], complete)
          if (progress[questionNum]) {
            setAnswer(currentQuestion.answer);
            setAnswerOnly(true)
            if (!complete) {
                setShowCheck(false)
            }
          }else{
            setAnswer('')
            setAnswerOnly(false)
            setShowCheck(true)
          }

          if (questionNum === questions[0].number) {
            setLeftShow(false);
          }else if (questionNum === questions.slice(-1)[0].number) {
            setRightShow(false);
          }else{
            setRightShow(true);
            setLeftShow(true);
          }
        }
    }, [progress, currentQuestion])

    useEffect(() => {
        if (questions) {
          if (correctCount === questions.length) {
            // setCompleteOpen(true);
            setComplete(true);
            setShowCheck(true);
            setShowCheck(true);
          }
        }
      }, [correctCount]);

    async function checkAnswer() {
        const userAnswer = answer.toLowerCase();
        const isCorrect = (userAnswer === currentQuestion.answer.toLowerCase());
        if (isCorrect) {
            const token = await Storage.TOKEN.get();
            const authHeader = {Authorization: 'JWT ' + token};
            await axios.post(BACKEND_URL+ "/user/update/progress/" + props.lessonId, 
                {questionNumber: currentQuestion.number}, 
                {headers: authHeader}
            );
            getProgress();
            setShowCheck(false);
            setAnswer(currentQuestion.answer)
            Snackbar.show({
                text: "Correct!",
                duration: Snackbar.LENGTH_SHORT,
            })
        }else{
            Snackbar.show({
                text: "Incorrect! Try Again.",
                duration: Snackbar.LENGTH_SHORT,
            })
        }
    }

    function advanceLessons(){
        navigation.replace("Lesson", {num: parseInt(props.lessonId)+1})
    }
    function getQuestionIndex(questionNum) {
        return questionNum - 1 - 3 * (props.lessonId - 1);
    }

    function prevQuestion() {
        setCurrentQuestion(questions[getQuestionIndex(currentQuestion.number) - 1]);
      }
    function nextQuestion() {
        // console.log(currentQuestion.number)
        setCurrentQuestion(questions[getQuestionIndex(currentQuestion.number) + 1]);
    }
      
    return(
        <ScrollView style={styles.contentView} >
            <Text style={styles.title}>Quiz</Text>
            
            <LessonQuestion num={currentQuestion.number} content={currentQuestion.text} />
            <View style={styles.answerView}>

                <FormInput 
                    type="text"
                    label="Information:"
                    placeholder={""}
                    editable={!answerOnly}
                    disabled={answerOnly}
                    backgroundColor="#f8f8f8"
                    placeholderTextColor="#c9c9c9"
                    value={answer}
                    onChangeText = {(text)=>{
                        setAnswer(text)
                    }}
                    />
                 {questions ? (
                    <LinearProgress variant="determinate" value={100}/>
                    ):(<></>)}
            </View>
            
            <View style={styles.buttonView}>
                {
                    leftShow ? (
                        <Icon 
                        name="arrow-left"
                        size={30}
                        color="#0362fc"
                        onPress={()=>prevQuestion()}  />
                    ):(
                        <Icon 
                        name="arrow-left"
                        size={30}
                        color="#FFF"/>
                    )
                }
                {
                    showCheck && complete && (
                        <RoundButton
                            title="Continue"
                            theme="blue"
                            style={styles.checkButton}
                            onPress={() => advanceLessons()}
                        />
                    )
                }
                {
                    showCheck && !complete && (
                        <RoundButton
                            title="Check"
                            theme="blue"
                            style={styles.checkButton}
                            onPress={() => checkAnswer()}
                        />
                    )
                }
                {
                    rightShow ? (
                        <Icon.Button
                        name="arrow-right"
                        size={30}
                        color="#0362fc"
                        backgroundColor="#FFF"
                        onPress={()=>nextQuestion()}  />
                    ):(
                        <Icon 
                        name="arrow-right"
                        size={30}
                        color="#FFF"  />
                    )
                }
                
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    contentView: {
        paddingTop: 30,
        paddingHorizontal: 30,
    },
    title:{
        fontWeight: '400',
        marginBottom: 3,
        fontSize: 20,
        color: 'black',
        textAlign: 'center',
        paddingLeft: 10,
        paddingRight: 10,
    },
    answerView:{
        display: 'flex',
        flexDirection: 'column',
        marginLeft:'auto',
        marginRight:'auto',
    },
    answerText:{
        backgroundColor: Colors.pageColor,
        paddingHorizontal: 40,
        color: Colors.blackColor,
    },
    buttonView:{
        marginVertical: 10,
        justifyContent: 'space-between',
        display: 'flex',
        flexDirection: 'row',
    },
    checkButton:{
        fontWeight: '700',
        borderRadius: 8, 
        width: '70%', 
        height: 50,
        cursor: 'pointer',
        
    }
})
export default LessonQuiz;


