import {View, Text, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import {useState, useEffect} from 'react';
import { useNavigation } from '@react-navigation/native';

function LessonCircle(props){
    const navigation = useNavigation();

    const [color, setColor] = useState(0)
    useEffect(() =>{
        setColor(props.num%4)
    },[])

    const onMove=() =>{
        // console.warn("--", item)
        navigation.navigate("Lesson", {num: props.num});
    }

    const showColor = () =>{
        switch (color){
            case 1: 
                return (
                    <View style={[styles.mapButton, styles.color1]}>
                        <TouchableOpacity onPress = {()=> onMove()}>
                            <Text>Lesson {props.num}</Text>
                        </TouchableOpacity>
                    </View>
                )
            case 2: 
                return (
                    <View style={[styles.mapButton, styles.color2]}>
                        <TouchableOpacity onPress = {()=> onMove()}>
                            <Text>Lesson {props.num}</Text>
                        </TouchableOpacity>
                    </View>
                )
            case 3: 
                return (
                    <View style={[styles.mapButton, styles.color3]}>
                        <TouchableOpacity onPress = {()=> onMove()}>
                            <Text>Lesson {props.num}</Text>
                        </TouchableOpacity>
                    </View>
                )
            case 4: 
                return (
                    <View style={[styles.mapButton, styles.color4]}>
                        <TouchableOpacity onPress = {()=> onMove()}>
                            <Text>Lesson {props.num}</Text>
                        </TouchableOpacity>
                    </View>
                )
        }
    }
    return(
        
       showColor()
    )
}
const styles = StyleSheet.create({
    mapButton :{
        aspectRatio: 1/1,
        width: Dimensions.get('window').width * 0.4,
        height: Dimensions.get('window').width * 0.4,
        borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        color: '#514e58',
        fontWeight: 'bold',
        borderColor: '#373a47',
        borderWidth: 1,
        marginVertical: 5,
        marginHorizontal: 5
    },
    
    color1 :{
        backgroundColor: '#d2cbdc',
    },
    
    color2 :{
        backgroundColor: '#e6b5b6',
    },
    
    color3 :{
        backgroundColor: '#d3eaf5',
    },
    
    color4 :{
        backgroundColor: '#B7CADB',
    }
})
export default LessonCircle