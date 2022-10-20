import {View, StyleSheet, Text} from 'react-native';

function LessonQuestion(props){
    return(
        <View>
            <Text style={styles.title}>Question {props.num}</Text>
            <Text style={styles.content}>{props.content}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    title:{
        textAlign: 'center',
        marginBottom: 5,
        fontSize: 20,
    },
    content:{
        textAlign: 'center',
        marginBottom: 3,
        fontSize: 18,
    }
})
export default LessonQuestion;