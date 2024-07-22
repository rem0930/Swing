import React, { useEffect, useState } from 'react';
import { Box, Text } from '@chakra-ui/react';
import axios from 'axios';
import { useUser } from '../../context/UserContext';

const MessageList = ({ conversationId }) => {
  const { user } = useUser();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`/api/v1/conversations/${conversationId}/messages`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setMessages(response.data);
      } catch (error) {
        console.error('Failed to fetch messages', error);
      }
    };

    if (user && conversationId) {
      fetchMessages();
    }
  }, [user, conversationId]);

  return (
    <Box>
      {messages.map((message) => (
        <Box key={message.id} p={3} mb={2} bg={message.senderId === user.id ? 'teal.100' : 'gray.100'}>
          <Text>{message.content}</Text>
        </Box>
      ))}
    </Box>
  );
};

export default MessageList;
