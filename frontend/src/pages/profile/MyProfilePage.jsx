import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Avatar,
  Text,
  Stack,
  VStack,
  Heading,
  Spinner,
  useToast,
} from '@chakra-ui/react';
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const MyProfilePage = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    user_name: '',
    profile_photo: '',
    bio: '',
  });
  const toast = useToast();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`${apiUrl}/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data);
      setFormData({
        user_name: response.data.user_name,
        profile_photo: response.data.profile_photo,
        bio: response.data.bio || '',
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    try {
      const updatedData = {};
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== user[key]) {
          updatedData[key] = formData[key] === '' ? null : formData[key];
        }
      });

      const response = await axios.put(`${apiUrl}/users/${user.id}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data);
      setIsEditing(false);
      toast({
        title: 'Profile updated.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: 'Error updating profile.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
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
          {isEditing ? (
            <Input
              value={formData.user_name}
              name="user_name"
              onChange={handleChange}
            />
          ) : (
            user.user_name
          )}
        </Heading>
        <Box w="100%">
          <FormControl>
            <FormLabel>Bio</FormLabel>
            {isEditing ? (
              <Input value={formData.bio} name="bio" onChange={handleChange} />
            ) : (
              <Text>{user.bio}</Text>
            )}
          </FormControl>
        </Box>
        {isEditing ? (
          <Stack direction="row" spacing={4}>
            <Button colorScheme="teal" onClick={handleSave}>
              Save
            </Button>
            <Button onClick={() => setIsEditing(false)}>Cancel</Button>
          </Stack>
        ) : (
          <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
        )}
      </VStack>
    </Box>
  );
};

export default MyProfilePage;
