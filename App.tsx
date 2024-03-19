import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Get from './redux/Get';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import CrudScreen from './redux/CrudScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name='Get' component={Get}/>
        <Stack.Screen name="CrudScreen" component={CrudScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
};

export default App;
