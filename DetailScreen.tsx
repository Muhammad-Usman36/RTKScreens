import React from 'react';
import { View, Text, Button } from 'react-native';
import Get from './Get';
import { Provider } from 'react-redux';
import { store } from './store';

const DetailScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Detail Screen</Text>
      <Provider store ={store}>
      <Get/>

      </Provider>
      <Button
        title="ADD Data"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
};

export default DetailScreen;
