// // import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
// // import React, {useState, useEffect, use} from 'react';
// // import Api from './Components/Api';
// // import {getData} from './Components/ApiService';

// // export default function HomeScreen({navigation}) {
// //   const [users, setUsers] = useState([]); // Store users here

// //   useEffect(() => {
// //     // Fetch users when the component is mounted
// //     const fetchUsers = async () => {
// //       try {
// //         const userData = await getData(Api.GET_USER); // Fetch data from the API
// //         setUsers(userData); // Set the users to state
// //       } catch (error) {
// //         console.error('Failed to fetch users:', error);
// //       }
// //     };

// //     fetchUsers();
// //   }, []); // Empty dependency array to fetch once when the component mounts

// //   // Render each user's name and chat button
// //   const renderItem = ({item}) => (

// //     <View style={styles.userContainer}>
// //       <Text style={styles.user}>{item.name}</Text>
// //       {/* Chat Button */}
// //       <TouchableOpacity
// //         style={styles.chatButton}
// //         onPress={() => navigation.navigate('ChatScreen', {userId: item._id,username:item.name})}>
// //         <Text style={styles.chatButtonText}>Chat</Text>
// //       </TouchableOpacity>
// //     </View>

// //   );

// //   return (
// //     <View style={styles.container}>
// //       {/* <Text style={styles.title}>ChatScreen</Text> */}

// //       {/* Display the list of users */}
// //       <FlatList
// //         data={users}
// //         renderItem={renderItem} // Render each user's name and chat button
// //         keyExtractor={item => item._id} // Unique key for each user
// //       />
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     padding: 20,
// //     flex: 1,
// //     backgroundColor: '#f5f5f5',
// //   },
// //   title: {
// //     fontSize: 24,
// //     fontWeight: 'bold',
// //     marginBottom: 20,
// //   },
// //   userContainer: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     justifyContent: 'space-between',
// //     marginBottom: 20,
// //     paddingBottom: 10,
// //   },
// //   user: {
// //     fontSize: 18,
// //     fontWeight: 'bold',
// //     flex: 1,
// //   },
// //   separator: {
// //     height: 1,
// //     backgroundColor: '#ccc',
// //     marginVertical: 10,
// //     flex: 1,
// //   },
// //   chatButton: {
// //     backgroundColor: '#007bff',
// //     paddingVertical: 8,
// //     paddingHorizontal: 16,
// //     borderRadius: 5,
// //   },
// //   chatButtonText: {
// //     color: '#fff',
// //     fontWeight: 'bold',
// //   },
// // });
// import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
// import React, { useState, useEffect } from 'react';
// import Api from './Components/Api';
// import { getData } from './Components/ApiService';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// export default function HomeScreen({ route,navigation }) {
//   const [users, setUsers] = useState([]); // Store users here
//   const [currentUserId, setCurrentUserId] = useState(''); // Store current user ID here
//   console.log('Route Params:', route.params);  // Log the entire route object

//   // const { token, userId } = route.params;
//   // console.log("Received token:", token); // Log token
//   // console.log("Received userId:", userId); // Log userId

//   // useEffect(() => {
//   //   // Fetch users when the component is mounted
//   //   const fetchUsers = async () => {
//   //     try {
//   //       const userData = await getData(Api.GET_USER); // Fetch data from the API
//   //       setUsers(userData); // Set the users to state

//   //       // Retrieve the current user's data from AsyncStorage
//   //       const userDataFromAsyncStorage = await AsyncStorage.getItem('userData');

//   //       // Check if the userData exists and set the currentUserId
//   //       if (userDataFromAsyncStorage) {
//   //         const parsedUserData = JSON.parse(userDataFromAsyncStorage);
//   //         setCurrentUserId(parsedUserData._id); // Set the current user ID
//   //         console.log("Current User ID:", parsedUserData._id);
//   //       }
//   //     } catch (error) {
//   //       console.error('Failed to fetch users:', error);
//   //     }
//   //   };

//   //   fetchUsers();
//   // }, []); // Empty dependency array to fetch once when the component mounts
//   // useEffect(() => {
//   //   const fetchUsers = async () => {
//   //     try {
//   //       const userData = await getData(Api.GET_USER); // Fetch data from the API
//   //       setUsers(userData); // Set the users to state

//   //       // Retrieve the current user's data from AsyncStorage
//   //       const userDataFromAsyncStorage = await AsyncStorage.getItem('userData');

//   //       if (userDataFromAsyncStorage) {
//   //         const parsedUserData = JSON.parse(userDataFromAsyncStorage);
//   //         setCurrentUserId(parsedUserData._id); // Set the current user ID
//   //         console.log("Current User ID:", parsedUserData._id); // Log the currentUserId
//   //       }
//   //     } catch (error) {
//   //       console.error('Failed to fetch users:', error);
//   //     }
//   //   };

//   //   fetchUsers();
//   // }, []);
//   // useEffect(() => {
//   //   const fetchUsers = async () => {
//   //     try {
//   //       const userData = await getData(Api.GET_USER); // Fetch users from API
//   //       setUsers(userData); // Set the users to state

//   //       // Retrieve the current user's data from AsyncStorage
//   //       const userDataFromAsyncStorage = await AsyncStorage.getItem('userData');
//   //       console.log("AsyncStorage User Data:", userDataFromAsyncStorage); // Debug AsyncStorage value

//   //       if (userDataFromAsyncStorage) {
//   //         const parsedUserData = JSON.parse(userDataFromAsyncStorage);
//   //         setCurrentUserId(parsedUserData._id); // Set the current user ID
//   //         console.log("Current User ID:", parsedUserData._id); // Log current user ID
//   //       }
//   //     } catch (error) {
//   //       console.error('Failed to fetch users:', error);
//   //     }
//   //   };

//   //   fetchUsers();
//   // }, []);

//   useEffect(() => {
//   const fetchUsers = async () => {
//     try {
//       const userData = await getData(Api.GET_USER); // Fetch users from API
//       setUsers(userData); // Set the users to state

//       // Retrieve the current user's data from AsyncStorage
//       const userIdFromAsyncStorage = await AsyncStorage.getItem('userId');
//       if (userIdFromAsyncStorage) {
//         setCurrentUserId(userIdFromAsyncStorage); // Set the current user ID
//         console.log("Current User ID:", userIdFromAsyncStorage); // Log the currentUserId
//       }
//     } catch (error) {
//       console.error('Failed to fetch users:', error);
//     }
//   };

//   fetchUsers();
// }, []);
// // Render each user's name and chat button
//   const renderItem = ({ item }) => (
//     <View style={styles.userContainer}>
//       <Text style={styles.user}>{item.name}</Text>
//       {/* Chat Button */}
//       <TouchableOpacity
//         style={styles.chatButton}
//         onPress={() =>
//           navigation.navigate('ChatScreen', {
//             userId: currentUserId,    // Logged-in user's ID
//             username: item.name,       // Name of the target user
//             receiverId: item._id,      // Receiver's ID (the other user's ID)
//           })
//         }
//       >
//         <Text style={styles.chatButtonText}>Chat</Text>
//       </TouchableOpacity>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       {/* Display the list of users */}
//       <FlatList
//         data={users}
//         renderItem={renderItem} // Render each user's name and chat button
//         keyExtractor={item => item._id} // Unique key for each user
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   userContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginBottom: 20,
//     paddingBottom: 10,
//   },
//   user: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     flex: 1,
//   },
//   separator: {
//     height: 1,
//     backgroundColor: '#ccc',
//     marginVertical: 10,
//     flex: 1,
//   },
//   chatButton: {
//     backgroundColor: '#007bff',
//     paddingVertical: 8,
//     paddingHorizontal: 16,
//     borderRadius: 5,
//   },
//   chatButtonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
// });
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
