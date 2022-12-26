import {View, StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import {useState, useEffect} from 'react';
import axios from 'axios';

import Footer from '../../components/Footer';
import TopNavBar from '../../components/TopNavBar';
import LessonCircle from '../../components/LessonCircle/LessonCircle'
import Colors from '../../theme/Colors';
import * as Storage from '../../services/Storage';
import {BACKEND_URL} from '@env';

function Learn(){
    const [lessonCount, setLessonCount] = useState(0);
    const [lessons, setLessons] = useState([]);
    const [balance, setBalance] = useState(0);

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
        async function getLessonCount() {
          const res = await axios.get(BACKEND_URL + "/lesson/count");
        //   const data = await res.data;
          setLessonCount(res.data.count);
        }
        getLessonCount();
        getBalance();
      }, []);


      useEffect(() => {
        const lessons = new Array(lessonCount).fill(0).map((ele, i) => {
          return <LessonCircle key={i} num={i + 1} />;
        });
        setLessons(lessons);
      }, [lessonCount]);

    return(
        <SafeAreaView style={{flex: 1}}>
            <TopNavBar title="Learn"  balance={balance} />
            <ScrollView style={styles.container}>
                <View style={styles.contentView}>
                    {
                        lessonCount >0? (
                            lessons.map((lesson, i)=> {
                                return (
                                    <View sytle={{flexBasis: "50%"}} key={i}>
                                    {lesson}
                                    </View>
                                )
                            } )
                        ):(<></>)
                    }
                </View>
            </ScrollView>
            <Footer/>
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
      display: "flex",
      flexDirection: "row",
      flex: 1, 
      flexWrap: 'wrap',
    },
    title: {
      fontWeight: '400',
      marginBottom: 3,
      fontSize: 20,
      color: Colors.blackColor,
      textAlign: 'center'
    },
  });

export default Learn;