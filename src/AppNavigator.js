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
import Transaction from "./screens/Transaction/Transaction"
import Setting from "./screens/Settings/Settings";
import Portolio from "./screens/Portfolio/Portfolio";
import Trade from "./screens/Trade/Trade";
import Margin from "./screens/Margin/Margin";

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
        <Stack.Screen name = "Transaction" component={Transaction}/>
        <Stack.Screen name = "Setting" component={Setting}/>
        <Stack.Screen name = "Portfolio" component={Portolio}/>
        <Stack.Screen name = "Trade" component={Trade}/>
        <Stack.Screen name = "Margin" component={Margin}/>
      </Stack.Navigator>
      {/* <Drawer.Navigator useLegacyImplementation initialRouteName="Login">
        <Drawer.Screen name = "Login" component={Login}/>
        <Drawer.Screen name = "Home" component={Home}/>
      </Drawer.Navigator> */}
    </NavigationContainer>
  );
};

export default AppNavigator;