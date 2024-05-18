import { useState } from 'react';
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
import { useUser } from '../../context/UserContext';
import axios from 'axios';

const UserProfile = () => {
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

      const response = await axios.put(`http://localhost:3000/users/${user.id}`, updatedData, {
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

export default UserProfile;
