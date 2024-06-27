import React, { useState } from 'react';
import { Avatar, Heading, VStack, Button, Text } from '@chakra-ui/react';
import { useUser } from '../../context/UserContext';
import EditProfile from './EditProfile';

const UserInfo = () => {
  const { user } = useUser();
  const [isEditing, setIsEditing] = useState(false);

  return (
    <VStack spacing={4} align="start" w="100%" bg="white" p={6} borderRadius="md" boxShadow="lg" borderWidth="1px" borderColor="gray.200" mt={-4}>
      {isEditing ? (
        <EditProfile user={user} setIsEditing={setIsEditing} />
      ) : (
        <>
          <Avatar size="xl" name={user.user_name} src={user.profile_photo_url} />
          <Heading fontSize="xl" fontWeight="bold">
            {user.user_name}
          </Heading>
          <Text>{user.bio}</Text>
          <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
        </>
      )}
    </VStack>
  );
};

export default UserInfo;
