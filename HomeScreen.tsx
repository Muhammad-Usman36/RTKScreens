import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useAddUserMutation, useGetUserQuery, useUpdateUserMutation } from './cdkCrud';

export default function CrudScreen({ route,navigation }) {
  const { item } = route.params; // Fetch the passed item from the route params

  const [updateUser, { data: updateUserData, error: updateError, isLoading: isUpdating }] = useUpdateUserMutation();
  const { data, isLoading: isFetching, error: getUserError, refetch } = useGetUserQuery();

  const [name, setName] = useState(item ? item.name : ''); // Initialize state with item data if available
  const [password, setPassword] = useState(item ? item.password : '');
  const [email, setEmail] = useState(item ? item.email : '');
  const [id, setId] = useState(item ? item.id.toString() : '');

  const [addUser] = useAddUserMutation();

  const handleAddOrUpdateUser = () => {
    // Implement add or update logic here
  };

  return (
    <View>
      <TextInput
        placeholder="Name"
        style={styles.Tin}
        value={name}
        onChangeText={text => setName(text)}
      />
      <TextInput
        placeholder="Password"
        style={styles.Tin}
        value={password}
        onChangeText={text => setPassword(text)}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Email"
        style={styles.Tin}
        value={email}
        onChangeText={text => setEmail(text)}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="ID"
        style={styles.Tin}
        value={id}
        onChangeText={text => setId(text)}
        keyboardType="numeric"
      />
      <Button title={item ? 'Update' : 'Add'} onPress={handleAddOrUpdateUser} />
    </View>
  );
}

const styles = StyleSheet.create({
  Tin: {
    borderColor: 'black',
    borderWidth: 2,
    padding: 10,
    borderRadius: 50,
    width: 350,
    alignSelf: 'center',
    marginVertical: 5
  }
});
