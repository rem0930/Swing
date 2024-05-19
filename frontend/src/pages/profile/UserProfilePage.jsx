import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import {
  Box,
  Avatar,
  Text,
  VStack,
  Heading,
  Spinner,
} from '@chakra-ui/react';

const UserProfilePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (id) {
      fetchUser();
    }
  }, [id]);

  const fetchUser = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/users/${id}`);
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  if (!user) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Spinner size="xl" />
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
