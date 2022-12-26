import React from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import Colors from "../theme/Colors"
// import Fonts from "../theme/Fonts"

export default class RoundButton extends React.Component {
  render() { 
    return (
	    <TouchableOpacity style={this.props.style} onPress={() => this.props.onPress()}>
			<View style={styles.container}>
	    	{
	    		this.props.theme == "blue" 
	    		? <View style={[styles.buttonContainer, styles.mainButton]}>
					<Text style={[styles.buttonText, styles.whiteText]}>{this.props.title}</Text>
	    		  </View>
	    		: null
	    	}
	    	{	
	    		this.props.theme == "red" 
	    		? <View style={[styles.buttonContainer, styles.redButton]}>
					<Text style={[styles.buttonText, styles.whiteText]}>{this.props.title}</Text>
	    		  </View>
	    		: null
	    	}
	    	{
	    		this.props.theme == "outline" 
	    		? <View style={[styles.buttonContainer, styles.outlineButton]}>
					<Text style={[styles.buttonText, styles.outlineText]}>{this.props.title}</Text>
	    		  </View>
	    		: null	
	    	}

	    	{
	    		this.props.theme == "white" 
	    		? <View style={[styles.buttonContainer, styles.whiteButton]}>
					<Text style={[styles.buttonText, styles.whiteText]}>{this.props.title}</Text>
	    		  </View>
	    		: null
	    	}

	    	{ 
	    		this.props.theme == "orange"
	    		? <View style={[styles.buttonContainer, styles.orangeButton]}>
					<Text style={[styles.buttonText, styles.whiteText]}>{this.props.title}</Text>
	    		  </View>
	    		: null
	    	}

	    	{ 
	    		this.props.theme == "black"
	    		? <View style={[styles.buttonContainer, styles.blackButton]}>
					<Text style={[styles.buttonText, styles.whiteText]}>{this.props.title}</Text>
	    		  </View>
	    		: null
	    	}

	    	{
	    		this.props.theme == "no-border"
	    		? <View style={[styles.buttonContainer, styles.noBorderButton]}>
					<Text style={[styles.buttonText, styles.whiteText]}>{this.props.title}</Text>
	    		  </View>
	    		: null
	    	}

	    	{
	    		this.props.theme == "no-border-gray"
	    		? <View style={[styles.buttonContainer, styles.noBorderButton]}>
					<Text style={[styles.buttonText, styles.grayText]}>{this.props.title}</Text>
	    		  </View>
	    		: null
	    	}
    		</View>
	    </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({

	container: {

	},

	buttonContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		// borderRadius: 25,
		height: 44,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 3,
		},
		shadowOpacity: 0.1,
		shadowRadius: 10,
		elevation: 5,
	}, 

	outlineButton: {
		backgroundColor: 'white',
		borderWidth: 2,
		borderColor: Colors.appButton,
	},

	mainButton: {
		backgroundColor: Colors.appButton,
		borderWidth: 2,
		borderColor: Colors.appButton,
		
	},

	blueButton: {
		backgroundColor: '#2357f7',
		borderWidth: 2,
		borderColor: '#2357f7',
	},

	redButton: {
		backgroundColor: Colors.redColor,
		borderWidth: 2,
		borderColor: Colors.redColor,	
	},

	whiteButton: {
		backgroundColor: 'transparent',
		borderWidth: 2,
		borderColor: 'white',
	},

	orangeButton: {
		backgroundColor: '#CCCC00',
		borderWidth: 2,
		borderColor: '#CCCC00',
	},

	blackButton: {
		backgroundColor: '#000',
		borderWidth: 2,
		borderColor: '#000',
	},

	noBorderButton: {

	},

	buttonText: {
		// fontFamily: Fonts.regular,
		fontSize: 16,
		letterSpacing: 1,
	},

	outlineText: {
		color: Colors.appButton,
	},

	whiteText: {
		color: '#FFFFFF',
	},

	blackText: {
		color: 'black',	
	},

	grayText: {
		color: '#939393',
	},
});