import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';

export default function ChatScreen({ route, navigation }) {
  const { userId, username } = route.params;  // Access the userId and username passed from HomeScreen
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]); // To store sent messages

  // Handle input change
  const handleMessageChange = (text) => {
    setMessage(text);
  };

  // Handle send button press
  const handleSend = () => {
    if (message.trim()) {
      // Add the message to the list of messages
      setMessages([...messages, { text: message, isUserMessage: true }]);
      setMessage(''); // Clear the input after sending the message
    }
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

      {/* Chat content */}
      <ScrollView style={styles.chatContainer}>
        {messages.map((msg, index) => (
          <View
            key={index}
            style={[
              styles.messageContainer,
              msg.isUserMessage ? styles.userMessage : styles.otherMessage,
            ]}
          >
            <Text style={styles.message}>{msg.text}</Text>
          </View>
        ))}
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
          <Image source={require('../Src/Icon/send.png')} style={styles.sendIcon} />
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
    backgroundColor: '#f1f1f1',
  },
  message: {
    fontSize: 16,
    color: '#fff', // White for user message
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
