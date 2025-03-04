import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import React, {useState, useEffect, use} from 'react';
import Api from './Components/Api';
import {getData} from './Components/ApiService';

export default function HomeScreen({navigation}) {
  const [users, setUsers] = useState([]); // Store users here

  useEffect(() => {
    // Fetch users when the component is mounted
    const fetchUsers = async () => {
      try {
        const userData = await getData(Api.GET_USER); // Fetch data from the API
        setUsers(userData); // Set the users to state
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    fetchUsers();
  }, []); // Empty dependency array to fetch once when the component mounts

  // Render each user's name and chat button
  const renderItem = ({item}) => (
  
    <View style={styles.userContainer}>
      <Text style={styles.user}>{item.name}</Text>
      {/* Chat Button */}
      <TouchableOpacity
        style={styles.chatButton}
        onPress={() => navigation.navigate('ChatScreen', {userId: item._id,username:item.name})}>
        <Text style={styles.chatButtonText}>Chat</Text>
      </TouchableOpacity>
    </View>
    
  );

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>ChatScreen</Text> */}

      {/* Display the list of users */}
      <FlatList
        data={users}
        renderItem={renderItem} // Render each user's name and chat button
        keyExtractor={item => item._id} // Unique key for each user
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingBottom: 10,
  },
  user: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
    flex: 1,
  },
  chatButton: {
    backgroundColor: '#007bff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
  chatButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
