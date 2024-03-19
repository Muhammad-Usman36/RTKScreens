import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useAddUserMutation, useGetUserQuery, useUpdateUserMutation } from './cdkCrud';

export default function CrudScreen({ route,navigation }) {
  const { item } = route.params ?? {}; 

  const [updateUser] = useUpdateUserMutation();
  const { refetch } = useGetUserQuery();

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [id, setId] = useState('');

  useEffect(() => {
    if (item) {
      setName(item.name);
      setPassword(item.password);
      setEmail(item.email);
      setId(item.id.toString());
    }
  }, [item]);

  const [addUser] = useAddUserMutation();

  const handleAddOrUpdateUser = () => {
    if (item) {
      // Perform update operation
      updateUser({
        "id": Number(id),
        "name": name,
        "email": email,
        "password": password
      }).then(() => {
        setName('');
        setPassword('');
        setEmail('');
        setId('');
        refetch();
      });
    } else {
      // Perform add operation
      if (name && email && password && id) {
        addUser({
          "id": id,
          "name": name,
          "email": email,
          "password": password 
        }).then(() => {
          setName('');
          setPassword('');
          setEmail('');
          setId('');
          refetch();
        });
      }
    }
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

      <Button
        title="See data"
        onPress={() => navigation.navigate('Get')}
      />
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
