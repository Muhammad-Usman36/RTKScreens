import React from 'react';
import { View, Text, Button } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './store';
import CrudScreen from './CrudScreen';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Provider store={store}>
        {/* {pokemon.map((poke, index) => (
          <Hom key={index} name={poke}/>
        ))} */}
<CrudScreen/>
        {/* <Home/> */}
  </Provider>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Detail')}
      />
    </View>
  );
};

export default HomeScreen;
