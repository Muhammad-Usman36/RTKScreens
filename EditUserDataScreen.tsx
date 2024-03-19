// EditUserDataScreen.js

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useUpdateUserMutation } from './cdkCrud';

export default function EditUserDataScreen({ route, navigation }) {

  const [updateUser, { data: updateUserData, error: updateError, isLoading: isUpdating }] = useUpdateUserMutation();
  console.log(updateUserData, updateError);

  const { item } = route.params;
  const [name, setName] = useState(item.name);
  const [password, setPassword] = useState(item.password);
  const [email, setEmail] = useState(item.email);
  const [id, setId] = useState(item.id.toString());
  
  const [deleteUserId, setDeleteUserId] = useState();
  console.log("deleteUserId", deleteUserId);

  const [isEditing, setIsEditing] = useState(false); // State to manage edit mode

  const handleUpdateUser = () => {
    // Implement the update user functi
    setName(item.name); // Populate name field with user's name
    setPassword(item.password); // Populate password field with user's password
    setEmail(item.email); // Populate email field with user's email
    setId(item.id.toString()); // Populate id field with user's id
    setDeleteUserId(item.id); // Set deleteUserId to the id of the user being edited
    setIsEditing(true); //onality here
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Name"
        style={styles.input}
        value={name}
        onChangeText={text => setName(text)}
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        value={password}
        onChangeText={text => setPassword(text)}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={text => setEmail(text)}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="ID"
        style={styles.input}
        value={id}
        onChangeText={text => setId(text)}
        keyboardType="numeric"
      />
      <Button title="Update" onPress={handleUpdateUser} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    width: '80%'
  }
});
