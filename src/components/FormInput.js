import {
    Text,
    View,
    StyleSheet,
    TextInput,
    Image,
    TouchableOpacity,
    ScrollView, Platform
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import Images from '../theme/Images'

function FormInput (props) {
    // console.warn("data", props.data)
    return(
        <View>
            <View>
                {props.label && <Text style={styles.labelText}>{props.label}</Text>}
                    {
                        (props.type === "email")
                        ? <TextInput
                            autoCapitalize='none'
                            autoCorrect={false}
                            // editable={editable}
                            keyboardType="email-address"
                            style={styles.textInput}
                            placeholderTextColor="#c9c9c9"
                            underlineColorAndroid='transparent'
                            onChangeText={props.onChangeText}
                            value={props.value}
                            placeholder={props.placeholder}
                            ref={props.onRefInput}
                            returnKeyType={props.returnKeyType}
                            onSubmitEditing={props.onSubmitEditing}
                        />
                        : null
                    }
                    {
                        (props.type === "text")
                        ? <TextInput
                            // style={[styles.textInput, {fontFamily: font}]}
                            style={styles.textInput}
                            // editable={editable}
                            placeholderTextColor="#c9c9c9"
                            underlineColorAndroid='transparent'
                            onChangeText={props.onChangeText}
                            value={props.value}
                            placeholder={props.placeholder}
                            ref={props.onRefInput}
                            returnKeyType={props.returnKeyType}
                            onSubmitEditing={props.onSubmitEditing}
                        />
                        : null
                    }
                    {
                        (props.type === "textview")
                        ? <TextInput
                            disabled={props.disabled}
                            // style={[styles.textView, {fontFamily: font}]}
                            style={styles.textView}
                            editable={props.editable}
                            numberOfLines={3}
                            multiline={true}
                            allowFontScaling={false}
                            placeholderTextColor="#c9c9c9"
                            underlineColorAndroid='transparent'
                            onChangeText={props.onChangeText}
                            value={props.value}
                            placeholder={props.placeholder}
                            ref={props.onRefInput}
                            returnKeyType={props.returnKeyType}
                            onSubmitEditing={props.onSubmitEditing}
                        />
                        : null
                    }

{
                        (props.type === "dropdown")
                        ? <View style={styles.dropdownBox}>
                            <Picker
                                useNativeAndroidPickerStyle={false}
                                style={{
                                    ...pickerSelectStyles,
                                    iconContainer: {
                                        top: Platform.OS === 'ios' ? 4 : 20,
                                        right: -9,
                                    },
                                    inputIOS: {
                                        // fontFamily: font,
                                        color: 'black',
                                    },
                                    inputAndroid: {
                                        // fontFamily: font,
                                        color: 'black',
                                    }
                                }}
                                // value={props.value}
                                selectedValue={props.value}
                                ref={props.onRefInput}
                                onValueChange={(value) => props.onChangeText(value)}
                                items={props.data}
                                Icon={() => {
                                    return <Image
                                        style={styles.dropdownIcon}
                                        source={Images.dropdown_icon}
                                    />;
                                }}
                            >
                                {
                                    props.data.length !== 0 && 
                                        props.data.map((item, index) => (
                                            <Picker.item label={item.symbol} value={item.label} key={index}/>
                                        ))
                                    
                                    
                                }
                            </Picker>
                        </View>
                        : null
                    }
                    {
                        (props.type === "password")
                        ? <View>
                            <TextInput
                                secureTextEntry={true}
                                autoCapitalize='none'
                                autoCorrect={false}
                                // editable={editable}
                                style={[styles.textInput]}
                                placeholderTextColor="#c9c9c9"
                                underlineColorAndroid='transparent'
                                onChangeText={props.onChangeText}
                                value={props.value}
                                placeholder={props.placeholder}
                                ref={props.onRefInput}
                                returnKeyType={props.returnKeyType}
                                onSubmitEditing={props.onSubmitEditing}
                            />
                        </View>
                        : null
                    }
            </View>
            {
                props.errorMessage
                ? <Text style={styles.errorMessage}>{props.errorMessage}</Text>
                : null
            }
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },

    containerGray: {
        backgroundColor: '#E7E7E7',
        borderWidth: 1,
        borderColor: '#979797',
        borderRadius: 21,
        paddingLeft: 20,
        paddingRight: 20,
        height: 42,
    },

    labelText: {
        color: '#989898',
        // fontFamily: Fonts.bold,
        fontSize: 14,
        marginBottom: 10,
        marginBottom: 5,
    },

    textInput: {
        paddingHorizontal: 20,
        borderRadius: 25,
        // fontFamily: Fonts.bold,
        backgroundColor: '#f8f8f8',
        fontSize: 16,
        height: 43,
        color: 'black',
    },

    dropdownBox: {
        paddingVertical: Platform.OS == 'ios' ? 11 : 0,
        paddingHorizontal: 20,
        borderRadius: 25,
        // fontFamily: Fonts.bold,
        backgroundColor: '#e7ebed',
        fontSize: 16,
        color: 'black',
    },

    textView: {
        paddingHorizontal: 20,
        borderRadius: 20,
        backgroundColor: 'white',
        fontSize: 16,
        height: 150,
        color: 'black',
        paddingTop: 10,
        textAlignVertical: "top",
    },

    hasShowButtonTextInput: {
        fontSize: 16,
        height: '100%',
        marginRight: 30,
        height: 42,
    },

    forgotTextInput: {
        color: '#474747',
        paddingLeft: 5,
        fontSize: 17,
        paddingRight: 70,
        position: 'relative',
    },

    forgotButton: {
        position: 'absolute',
        right: 0,
    },

    forgotButtonText: {
        fontSize: 11,
        backgroundColor: '#0d4e6c',
        textTransform: 'uppercase',
        color: 'white',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 5,
    },

    formField: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    iconView: {
        left: 0,
        top: 7,
        position: 'absolute',
    },

    iconImage: {
        width: 25,
        height: 25,
        resizeMode: 'cover',
    },

    showPasswordButton: {
        position: 'absolute',
        right: 10,
        top: 5,
        zIndex: 10,
        width: 35,
        height: 35,
    },

    errorMessage: {
        // fontFamily: Fonts.regular,
        fontStyle: 'italic',
        color: 'red',
        fontSize: 11,
        marginTop: 3,
        marginLeft: 15,
    },

    centerText: {
        textAlign: 'center'
    },

    eye_icon: {
        width: 25,
        height: 25,
        resizeMode: 'contain',
        position: 'absolute',
        top: 5,
        right: 5,
    },

    addressInput: {
        paddingHorizontal: 20,
        borderRadius: 25,
        // fontFamily: Fonts.bold,
        backgroundColor: '#e7ebed',
        fontSize: 16,
        height: '100%',
        height: 50,
        color: 'black',
    },

    dropdownIcon: {
        width: 17,
        height: 10,
    },
});


const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 16,
      color: 'black',
      zIndex: 10,
      paddingRight: 15,
    },
    inputAndroid: {
      fontSize: 16,
      color: 'black',
      zIndex: 10,
    },
});


export default FormInput;