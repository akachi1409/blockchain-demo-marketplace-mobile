import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { createDrawerNavigator } from '@react-navigation/drawer';

const Stack = createNativeStackNavigator();
// const Drawer = createDrawerNavigator();

import Contact from "./screens/Contact/Contact"
import Login from "./screens/Login/Login"
import Home from "./screens/Home/Home"
import Explore from "./screens/Explore/Explore"
import Crypto from "./screens/Crypto/Crypto"
import Learn from "./screens/Learn/Learn";
import Lesson from "./screens/Lesson/Lesson"
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name = "Contact Us" component={Contact}/>
        <Stack.Screen name = "Login" component={Login}/>
        <Stack.Screen name = "Home" component={Home}/>
        <Stack.Screen name = "Explore" component={Explore}/>
        <Stack.Screen name = "Crypto" component={Crypto}/>
        <Stack.Screen name = "Learn" component={Learn}/>
        <Stack.Screen name = "Lesson" component={Lesson}/>
      </Stack.Navigator>
      {/* <Drawer.Navigator useLegacyImplementation initialRouteName="Login">
        <Drawer.Screen name = "Login" component={Login}/>
        <Drawer.Screen name = "Home" component={Home}/>
      </Drawer.Navigator> */}
    </NavigationContainer>
  );
};

export default AppNavigator;