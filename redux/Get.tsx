import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, Button, TextInput, StyleSheet, Alert, ActivityIndicator, Image, Pressable } from 'react-native';
import { useAddUserMutation, useDeleteUserMutation, useGetUserQuery, useUpdateUserMutation } from './cdkCrud';

export default function Get({ navigation }) {
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

  const [isEditing, setIsEditing] = useState(false); // State to manage edit mode

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
      setDeleteUserId(null); // Reset deleteUserId after update
      setIsEditing(false); // Disable edit mode
      refetch();
    });
  };

  const handleEdit = (item) => {
    setName(item.name); // Populate name field with user's name
    setPassword(item.password); // Populate password field with user's password
    setEmail(item.email); // Populate email field with user's email
    setId(item.id.toString()); // Populate id field with user's id
    setDeleteUserId(item.id); // Set deleteUserId to the id of the user being edited
    setIsEditing(true); // Enable edit mode
  };


  const handleEdit2 = (item) => {
    navigation.navigate('CrudScreen', { item });
  };

  return (
    <ScrollView>
      <View style={{ flex: 1,alignItems:'center',marginHorizontal:20 }}>
        <TextInput
          placeholder="Search"
          style={styles.Tin}
        />
        <Button
        title="ADD Data"
        onPress={() => navigation.navigate('CrudScreen')}
      />

      

        {isFetching ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <>
            {data?.length > 0 ? users?.map((item) => {
              return (
                <View key={item.id}>
                  <View style={{ paddingVertical: 10 }}>
                    <View style={{ flexDirection: 'row' }}>
                      <View style={{ width: 280 }}>
                        <Text style={{ fontSize: 30 }}>Name: {item.name}</Text>
                        <Text>Email: {item.email}</Text>
                        <Text>Password: {item.password}</Text>
                        <Text>Id: {item.id}</Text>
                      </View>
                      <View style={{ marginLeft: 30 }}>
                        <Pressable onPress={() => handleEdit2(item)}>
                          <Image
                            style={{ height: 20, width: 20, marginTop: 20 }}
                            source={require('./Edit.png')}
                          />
                        </Pressable>
                        <Pressable onPress={() => handleDelete(item.id)}>
                          <Image
                            style={{ height: 20, width: 20, marginTop: 20 }}
                            source={require('./delete.png')}
                          />
                        </Pressable>
                      </View>
                    </View>
                    <View style={{ height: 1, backgroundColor: 'black' }}></View>
                  </View>

                  {isEditing && deleteUserId === item.id && ( // Render edit fields only if editing mode is enabled for this item
                    <>
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
                      <Button title='Update' onPress={handleUpdateUser} />
                    </>
                  )}
                </View>
              );
            }) :
              <Text>No User Found</Text>
            }
          </>
        )}
      </View>
    </ScrollView>
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