import * as React from 'react';
import {View,Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/Screens/Home';
import ChooseLocation from './src/Screens/ChooseLocation';

const Stack = createStackNavigator();


function App(){

  return(
    <NavigationContainer>

      <Stack.Navigator>
        <Stack.Screen name="home" component={Home}/>
        <Stack.Screen name="chooseLocation" component={ChooseLocation}/>
      </Stack.Navigator>
    </NavigationContainer>


  );
}

export default App;