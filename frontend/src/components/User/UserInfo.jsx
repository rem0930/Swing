import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Avatar, Text, Stack, VStack, Heading, useToast } from '@chakra-ui/react';
import { useUser } from '../../context/UserContext';
import axios from 'axios';
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const UserInfo = () => {
  const { user, setUser } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    user_name: user ? user.user_name : '',
    profile_photo: user ? user.profile_photo : '',
    bio: user ? user.bio : '',
  });
  const toast = useToast();

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

      const response = await axios.put(`${apiUrl}/users/${user.id}`, { user: updatedData }, {
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

  const handleCancel = () => {
    setFormData({
      user_name: user.user_name,
      profile_photo: user.profile_photo,
      bio: user.bio,
    });
    setIsEditing(false);
  };

  return (
    <VStack spacing={4} align="start" w="100%" bg="white" p={6} borderRadius="md" boxShadow="lg" borderWidth="1px" borderColor="gray.200" mt={-4}>
      <Avatar size="xl" name={user.user_name} src={user.profile_photo} />
      {isEditing ? (
        <Input
          fontSize="xl"
          fontWeight="bold"
          value={formData.user_name}
          name="user_name"
          onChange={handleChange}
        />
      ) : (
        <Heading fontSize="xl" fontWeight="bold">
          {user.user_name}
        </Heading>
      )}
      <Box w="100%">
        <FormControl>
          <FormLabel htmlFor="bio">Bio</FormLabel>
          {isEditing ? (
            <Input id="bio" value={formData.bio} name="bio" onChange={handleChange} />
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
          <Button onClick={handleCancel}>Cancel</Button>
        </Stack>
      ) : (
        <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
      )}
    </VStack>
  );
};

export default UserInfo;
