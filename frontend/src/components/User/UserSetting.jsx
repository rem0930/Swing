import React, { useState } from 'react';
import { Box, Button, Input, FormControl, FormLabel } from "@chakra-ui/react";
import { useUser } from '../../context/UserContext';
import axios from 'axios';

const UserSettings = () => {
  const user = useUser();
  const [name, setName] = useState(user ? user.name : '');
  const [email, setEmail] = useState(user ? user.email : '');
  const [profilePhoto, setProfilePhoto] = useState(user ? user.profilePhoto : '');

  const fetchUser = async () => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.get(`http://localhost:3000/users/${id}`,{
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        setUser(response.data);
        setFormData({
            user_name: response.data.user_name,
            email: response.data.email,
            bio: response.data.bio || '',
        });
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
};

  if (!user) return <div>Loading...</div>;

  return (
    <Box>
      <FormControl>
        <FormLabel>Name</FormLabel>
        <Input value={name} onChange={(e) => setName(e.target.value)} />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>Email</FormLabel>
        <Input value={email} onChange={(e) => setEmail(e.target.value)} />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>Profile Photo URL</FormLabel>
        <Input value={profilePhoto} onChange={(e) => setProfilePhoto(e.target.value)} />
      </FormControl>
      <Button mt={4} colorScheme="teal" onClick={handleSave}>Save</Button>
    </Box>
  );
};

export default UserSettings;
