import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
// import {useState, useEffect} from 'react';
import { useNavigation } from '@react-navigation/native';

import Colors from '../../theme/Colors';

function TradeCard(item){
    const navigation = useNavigation();

    const onMove=() =>{
        // console.warn("--", item)
        navigation.navigate("Margin", {coin: item.item.symbol});
    }
    
    return(
        <View style={styles.contentView} 
            >
            <TouchableOpacity style={styles.cardView} onPress={()=> onMove()}>
                <Image
                    style={styles.cardImage}
                    source={{uri: item.item.pic}}
                />
                <Text style={styles.cardText}>{item.item.symbol}</Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({

    contentView: {
        paddingTop: 30,
        paddingHorizontal: 30,
        // backgroundColor: 'white'
    },
    cardView:{
        paddingVertical: 10,
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        cursor: 'pointer',
        backgroundColor: 'grey',
        borderRadius: 16,
        display: 'flex',
        flexDirection: 'row',
    },
    cardImage:{
        marginRight: 'auto',
        width: 40,
        height: 40,
        verticalAlign: 'middle',
        flex: 1,
        resizeMode: 'contain',
    },
    cardText:{
        flex:1,
        textAlgin: 'center',
        color: 'white'
    },
    title: {
      fontWeight: '400',
      marginBottom: 3,
      fontSize: 20,
      color: Colors.blackColor,
      textAlign: 'center'
    },
  });
export default TradeCard