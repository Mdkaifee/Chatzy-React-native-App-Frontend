import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import Api from './Components/Api';
import {postData, getData} from './Components/ApiService';

export default function ChatScreen({route, navigation}) {
  const {userId, username, receiverId} = route.params; // Access senderId, receiverId, and username
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]); // To store sent messages
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const scrollViewRef = useRef(); // Ref for ScrollView

  // Handle input change
  const handleMessageChange = text => {
    setMessage(text);
  };

  const handleSend = async () => {
    if (message.trim()) {
      const payload = {
        senderId: userId, // Current logged-in user
        receiverId: receiverId, // Receiver's ID
        message: message,
      };

      console.log('Sending message with payload:', payload); // Log the message payload

      try {
        const response = await postData(Api.SEND_MESSAGE, payload);
        console.log('Response from backend:', response); // Log the response from the backend
        if (response.message === 'Message sent successfully!') {
          // Add the new message directly to the state without relying on the previous state
          setMessages(prevMessages => [
            ...prevMessages,
            {message, isUserMessage: true, timestamp: new Date()}, // Mark it as a user message
          ]);
          setMessage(''); // Clear the input after sending the message
        }
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const fetchMessages = async () => {
    try {
      const params = {senderId: userId, receiverId: receiverId};
      console.log('Params:', params); // Log the params to verify they are correct
      const response = await getData(Api.GET_MESSAGES, params);
      console.log('Fetched data:', response);

      if (response && response.length) {
        // Filter out the messages that are already in the state to avoid duplication
        const newMessages = response.filter(
          msg =>
            !messages.some(
              existingMsg => existingMsg.timestamp === msg.timestamp,
            ),
        );

        // Update the state with the fetched messages, ensuring we don't overwrite the sent messages
        setMessages(prevMessages => [
          ...newMessages.map(msg => ({
            ...msg,
            isUserMessage: msg.senderId === userId, // Mark whether the message is from the user
          })),
          ...prevMessages,
        ]);
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching messages:', error);
      setIsLoading(false); // Stop loading if there's an error
    }
  };

  useEffect(() => {
    fetchMessages(); // Fetch the messages when the screen loads
    console.log('Messages inside useEffect:', messages);
  }, [userId, receiverId]); // Ensure the effect runs when userId or receiverId changes

  useEffect(() => {
    // Add a small delay to allow the rendering to finish before scrolling to the end
    const timer = setTimeout(() => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollToEnd({animated: true});
      }
    }, 200); // Adjust this delay if needed

    // Cleanup timer
    return () => clearTimeout(timer);
  }, [messages]); // Trigger when messages change

  // Helper function to format the timestamp
  const formatTimestamp = timestamp => {
    const date = new Date(timestamp);
    return date.toLocaleString(); // You can format this as needed
  };

  return (
    <View style={styles.container}>
      {/* Top bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../Src/Icon/back.png')} style={styles.icon} />
        </TouchableOpacity>
        <Text style={styles.username}>{username}</Text>
      </View>

      {/* Chat container */}
      <ScrollView 
      showsVerticalScrollIndicator={false}
        style={styles.chatContainer} 
        ref={scrollViewRef} // Set ref for ScrollView
      >
        {isLoading ? (
          <ActivityIndicator size="large" color="#007bff" /> // Loader while fetching messages
        ) : messages.length > 0 ? (
          messages.map((msg, index) => (
            <View
              key={index}
              style={[
                styles.messageContainer,
                msg.isUserMessage ? styles.userMessage : styles.otherMessage, // Conditional styling based on isUserMessage
              ]}>
              <Text style={styles.message}>{msg.message}</Text>
              <Text style={styles.timestamp}>
                {formatTimestamp(msg.timestamp)}
              </Text>
            </View>
          ))
        ) : (
          <Text>No messages</Text> // Display "No messages" if there are no messages
        )}
      </ScrollView>

      {/* Text Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={message}
          onChangeText={handleMessageChange}
          placeholder="Type something to chat ..."
          placeholderTextColor="#ccc"
        />
        <TouchableOpacity onPress={handleSend}>
          <Image
            source={require('../Src/Icon/send.png')}
            style={styles.sendIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#007bff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  icon: {
    width: 25,
    height: 25,
    marginRight: 15,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1, // Ensures the username is aligned to the left
  },
  chatContainer: {
    flex: 1,
    padding: 15,
  },
  messageContainer: {
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
    maxWidth: '80%',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#007bff',
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#21c17c',
  },
  message: {
    fontSize: 16,
    color: '#fff', // White for user message
  },
  timestamp: {
    fontSize: 12,
    color: '#ccc',
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingLeft: 15,
    height: 40,
  },
  sendIcon: {
    width: 25,
    height: 25,
    marginLeft: 10,
  },
});
