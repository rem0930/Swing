import React, { useEffect, useState } from 'react';
import { Box, Text, Avatar, VStack, Spinner, HStack, Heading, Alert, AlertIcon } from '@chakra-ui/react';
import axios from 'axios';
import { useUser } from '../../context/UserContext';

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const ConversationList = ({ onSelectConversation }) => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useUser();

  useEffect(() => {
    if (user && user.token) {
      axios.get(`${apiUrl}/conversations`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      })
        .then(response => {
          setConversations(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error("There was an error fetching the conversations!", error);
          setError("会話データの取得中にエラーが発生しました。");
          setLoading(false);
        });
    }
  }, [user]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Spinner size="xl" />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        {error}
      </Alert>
    );
  }

  if (conversations.length === 0) {
    return (
      <Box w="30%" p={4} bg="white" boxShadow="sm" overflowY="auto">
        <Heading size="md" mb={4}>会話リスト</Heading>
        <Text>現在、会話はありません。</Text>
      </Box>
    );
  }

  return (
    <Box w="30%" p={4} bg="white" boxShadow="sm" overflowY="auto">
      <Heading size="md" mb={4}>会話リスト</Heading>
      <VStack spacing={4} align="stretch">
        {conversations.map(conversation => (
          <HStack
            key={conversation.id}
            p={4}
            bg="gray.100"
            borderRadius="md"
            _hover={{ bg: 'gray.200', cursor: 'pointer' }}
            onClick={() => onSelectConversation(conversation.id)}
          >
            <Avatar src={conversation.profile_photo_url} name={conversation.user_name} />
            <Box>
              <Text fontWeight="bold">{conversation.user_name}</Text>
              <Text fontSize="sm" color="gray.500">{conversation.recruitment_title}</Text>
            </Box>
          </HStack>
        ))}
      </VStack>
    </Box>
  );
};

export default ConversationList;
