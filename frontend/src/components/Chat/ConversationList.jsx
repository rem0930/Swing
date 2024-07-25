import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Box, Text, Avatar, VStack, Spinner, Alert, AlertIcon, Button } from '@chakra-ui/react';
import axios from 'axios';
import { useRouter } from 'next/router';

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const ConversationList = ({ user }) => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  const fetchConversations = useCallback(async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`${apiUrl}/conversations`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Fetched Conversations: ", response.data);
      setConversations(response.data);
      setLoading(false);
    } catch (error) {
      console.error("There was an error fetching the conversations!", error);
      setError("会話の取得中にエラーが発生しました。");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchConversations();
    }
  }, [user, fetchConversations]);

  const handleSelectConversation = useCallback((conversationId) => {
    router.push(`/users/${user.id}/chat/${conversationId}`);
  }, [user, router]);

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    fetchConversations();
  };

  const renderedConversations = useMemo(() => {
    return conversations.map((conversation) => {
      const otherUsers = conversation.participants.filter(participant => participant.id !== user.id);

      return (
        <Box
          key={conversation.id}
          p={4}
          borderWidth="1px"
          borderRadius="lg"
          cursor="pointer"
          onClick={() => handleSelectConversation(conversation.id)}
        >
          {otherUsers.map(participant => (
            <Box key={participant.id} display="flex" alignItems="center">
              <Avatar 
                src={participant.profile_photo_url} 
                name={participant.user_name}
              />
              <Text ml={2}>{participant.user_name}</Text>
            </Box>
          ))}
          <Text fontSize="sm">{conversation.recruitment_title}</Text>
        </Box>
      );
    });
  }, [conversations, user, handleSelectConversation]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Spinner size="xl" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" minHeight="100vh">
        <Alert status="error">
          <AlertIcon />
          {error}
        </Alert>
        <Button mt={4} onClick={handleRetry}>再試行</Button>
      </Box>
    );
  }

  if (conversations.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Text>会話がありません</Text>
      </Box>
    );
  }

  return (
    <VStack align="stretch" spacing={4} p={4}>
      {renderedConversations}
    </VStack>
  );
};

export default ConversationList;
