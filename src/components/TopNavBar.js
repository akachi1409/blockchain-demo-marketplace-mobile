import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
export default function TopNavBar(props){
    return(
        <View style={[styles.container]}>
            <Text style = {styles.titleText}>{props.title}</Text>
            <Text style = {styles.rightValueText}>{"Balance" + props.balance.toFixed(2)}</Text>
        </View>
    )
} 

const styles = StyleSheet.create({
	container: {
		zIndex: 3,
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'white',
        color: '#d1d1d1',
        fontSize: '2.3em',
        alignItems: 'center',
        fontWeight: 'bold',
        justifyContent: 'space-between',
        fontFamily: 'Segoe UI',
        padding: 2
        // paddingBottom: '5px',
        // height: '10vh',
		// ...ifIphoneX({
		// 	paddingVertical: 20
		//  }, {
		// 	paddingVertical: 10
		// }),
	},

	titleText: {
		textAlign: 'center',
		// fontFamily: Fonts.bold,
		fontSize: 26,
		color: '#d1d1d1',
	},


	rightValueText: {
		// fontFamily: Fonts.bold,
		fontSize: 18,
		textAlign: 'right',
        position:'absolute',
        right: 30,
		color: 'black',
	},
});