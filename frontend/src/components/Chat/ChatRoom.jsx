import React, { useState, useEffect } from 'react';
import { Box, Flex, Text, VStack, Input, Button, Heading } from '@chakra-ui/react';
import axios from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const ChatRoom = ({ chatId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get(`${apiUrl}/chats/${chatId}/messages`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(response => {
      setMessages(response.data);
    }).catch(error => {
      console.error("Failed to load messages:", error);
    });
  }, [chatId]);

  const handleSendMessage = () => {
    const token = localStorage.getItem('token');
    axios.post(`${apiUrl}/chats/${chatId}/messages`, {
      content: newMessage,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }).then(response => {
      setMessages([...messages, response.data]);
      setNewMessage('');
    }).catch(error => {
      console.error("Failed to send message:", error);
    });
  };

  return (
    <Flex direction="column" height="100%">
      <Heading p={4} bg="teal.500" color="white">チャットルーム</Heading>
      <Flex flex="1" p={4} direction="column" overflowY="auto">
        {messages.map((message, index) => (
          <Box key={index} p={3} bg="teal.100" mb={3} borderRadius="md">
            <Text>{message.content}</Text>
          </Box>
        ))}
      </Flex>
      <Box p={4} bg="gray.200">
        <Flex>
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="メッセージを入力..."
            bg="white"
          />
          <Button ml={2} onClick={handleSendMessage} colorScheme="teal">送信</Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default ChatRoom;
