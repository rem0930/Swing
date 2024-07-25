import React, { useState, useEffect } from 'react';
import { Box, Text, VStack, HStack, Spinner } from '@chakra-ui/react';
import axios from 'axios';
import { useUser } from '../../context/UserContext';

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const MessageList = ({ conversationId }) => {
  const { user } = useUser();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`${apiUrl}/conversations/${conversationId}/messages`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        setMessages(response.data);
        setLoading(false);
      } catch (error) {
        console.error("There was an error fetching the messages!", error);
        setLoading(false);
      }
    };

    fetchMessages();
  }, [conversationId]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Spinner size="xl" />
      </Box>
    );
  }

  if (messages.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Text>メッセージがありません</Text>
      </Box>
    );
  }

  return (
    <VStack align="stretch" spacing={4} p={4}>
      {messages.map((message) => {
        const isOwnMessage = message.sender_id === user.id;
        return (
          <HStack
            key={message.id}
            p={4}
            borderWidth="1px"
            borderRadius="lg"
            bg={isOwnMessage ? "teal.100" : "gray.100"}
            alignSelf={isOwnMessage ? "flex-end" : "flex-start"}
          >
            <Text>{message.content}</Text>
          </HStack>
        );
      })}
    </VStack>
  );
};

export default MessageList;
