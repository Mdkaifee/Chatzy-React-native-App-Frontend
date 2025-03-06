import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import Api from './Components/Api';
import {getData} from './Components/ApiService';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({navigation}) {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [users, setUsers] = useState([]); // Store users here

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Retrieve the token and userId from AsyncStorage
        const savedToken = await AsyncStorage.getItem('token');
        const savedUserId = await AsyncStorage.getItem('userId');

        if (savedToken && savedUserId) {
          setToken(savedToken);
          setUserId(savedUserId);
        } else {
          console.error('No token or userId found in AsyncStorage');
        }

        // Fetch users from API
        const userData = await getData(Api.GET_USER);
        setUsers(userData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, []);

  // Render each user's name and chat button
  const renderItem = ({item}) => (
    <View style={styles.userContainer}>
      <Text style={styles.user}>{item.name}</Text>
      <TouchableOpacity
        style={styles.chatButton}
        onPress={() =>
          navigation.navigate('ChatScreen', {
            userId, // Pass userId to ChatScreen
            username: item.name, // Name of the target user
            receiverId: item._id, // Receiver's ID (the other user's ID)
          })
        }>
        <Text style={styles.chatButtonText}>Chat</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {token && userId ? (
        <>
          {/* <Text>Token: {token}</Text> 
          <Text>UserID: {userId}</Text> Display userId */}
        </>
      ) : (
        <Text>Loading...</Text> // Show a loading message while fetching data
      )}

      {/* Display the list of users */}
      <FlatList
      showsVerticalScrollIndicator={false}
        data={users}
        renderItem={renderItem}
        keyExtractor={item => item._id}
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
