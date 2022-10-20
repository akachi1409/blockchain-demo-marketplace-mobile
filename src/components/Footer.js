import {View, Text, StyleSheet} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import RoundButton from './RoundButton';
import ContextMenu from 'react-native-context-menu-view';

function Footer(props) {
    const navigation = useNavigation();

    onPress = () => {

    }

    onMove = (index) => {
        switch(index){
            case 0:
                navigation.navigate("Home")
                break;
            case 1:
                navigation.navigate("Contact Us");
                break;
            case 2: 
                navigation.navigate("Explore");
                break;
            case 3: 
                navigation.navigate("Learn");
                break;
        }
        
    }
    return(
        <ContextMenu
            actions={[{title: 'Home'}, {title: 'Contact'}, {title: 'Explore'}, {title: 'Learn'}]}
            onPress={e => {
            // console.warn(
            //     `Pressed ${e.nativeEvent.name} at index ${e.nativeEvent.index}`,
            // );
            onMove(e.nativeEvent.index)
            }}>
            <View style={[styles.centerView, {marginTop: 0}]}>
            <RoundButton
                title="Navigate"
                theme="no-border-gray"
                style={styles.navigateButton}
                onPress = {()=>onPress()}
            />
            </View>
        </ContextMenu>
    )
  
}

const styles = StyleSheet.create({
  navigateButton: {
    // marginTop: 25,
    // width: '95%',
  },
});
export default Footer;