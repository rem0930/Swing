import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import {
  Box,
  Avatar,
  Text,
  VStack,
  Heading,
  Spinner,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const UserProfilePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUser = useCallback(async () => {
    if (!id) return;
    setIsLoading(true);
    try {
      const response = await axios.get(`${apiUrl}/users/${id}`);
      setUser(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError('Failed to load user profile. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <VStack spacing={4}>
          <Spinner size="xl" />
          <Text>Loading user profile...</Text>
        </VStack>
      </Box>
    );
  }

  if (error) {
    return (
      <Box maxW="600px" mx="auto" mt={8} p={4}>
        <Alert status="error">
          <AlertIcon />
          {error}
        </Alert>
      </Box>
    );
  }

  if (!user) {
    return (
      <Box maxW="600px" mx="auto" mt={8} p={4}>
        <Alert status="warning">
          <AlertIcon />
          User not found.
        </Alert>
      </Box>
    );
  }

  return (
    <Box maxW="600px" mx="auto" mt={8} p={4}>
      <VStack spacing={4}>
        <Avatar size="xl" name={user.user_name} src={user.profile_photo} />
        <Heading as="h1" size="xl">
          {user.user_name}
        </Heading>
        <Box w="100%">
          <Text>{user.bio}</Text>
        </Box>
      </VStack>
    </Box>
  );
};

export default UserProfilePage;