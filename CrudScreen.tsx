import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useAddUserMutation, useDeleteUserMutation, useGetUserQuery, useUpdateUserMutation } from './cdkCrud';
import RNRestart from 'react-native-restart';

export default function CrudScreen() {
  const [updateUser, { data: updateUserData, error: updateError, isLoading: isUpdating }] = useUpdateUserMutation();
  console.log(updateUserData, updateError);

  const { data, isLoading: isFetching, error: getUserError, refetch } = useGetUserQuery();

  const [deleteUserId, setDeleteUserId] = useState();
  console.log("deleteUserId", deleteUserId);

  const [deleteUser, { data: deleteUserResponse, isLoading: isDeleting, error: deleteUserError }] = useDeleteUserMutation();
  console.log(deleteUserError, deleteUserResponse, isDeleting);

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [id, setId] = useState('');

  const [addUser, { isLoading: isAdding }] = useAddUserMutation();

  const handleAddUser = () => {
    console.log("Add");
    if (name && email && password && id) {
      addUser({
        "id": id, // Assigned ID
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
  };

  const [users, setUsers] = useState([]);
  useEffect(() => {
    if (data) {
      setUsers(data);
    }
  }, [data]);

  const handleDelete = (item) => {
    deleteUser(Number(item)).then(() => {
      refetch();
    });
  };

  const handleUpdateUser = () => {
    updateUser({
      "id": Number(deleteUserId), 
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
  };

  return (
    <View style={{ flex: 1, justifyContent: 'space-between' }}>
      {isAdding || isFetching || isUpdating || isDeleting ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          {data?.length > 0 ? users?.map((item) => {
            return (
              <View key={item.id}>
                <Text style={{ fontSize: 30 }}>Name: {item.name}</Text>
                <Text>Email: {item.email}</Text>
                <Text>Password: {item.password}</Text>
                <Text>Id: {item.id}</Text>
                <Button
                  title='Delete'
                  onPress={() => handleDelete(item.id)}
                />
                <Button
                  title='Edit'
                  onPress={() => { Alert.alert('Write the data you want to edit'), setDeleteUserId(item.id) }}
                />
              </View>
            );
          }) :
            <Text>No User Found</Text>
          }

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
          <Button title='Add' onPress={handleAddUser} />
          <Button title='Update' onPress={handleUpdateUser} />
        </>
      )}
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