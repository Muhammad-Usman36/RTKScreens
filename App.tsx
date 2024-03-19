import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import DetailScreen from './DetailScreen';
import Get from './Get';
import { Provider } from 'react-redux';
import { store } from './store';
import CrudScreen from './CrudScreen';
import EditUserDataScreen from './EditUserDataScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name='Get' component={Get}/>
      <Stack.Screen name='EditUserDataScreen' component={EditUserDataScreen}/>
        <Stack.Screen name="CrudScreen" component={CrudScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
};

export default App;
