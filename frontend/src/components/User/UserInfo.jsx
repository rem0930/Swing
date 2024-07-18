import React, { useState } from 'react';
import { Avatar, Heading, VStack, Button, Text, Box, useColorModeValue } from '@chakra-ui/react';
import { useUser } from '../../context/UserContext';
import EditProfile from './EditProfile';

const UserInfo = () => {
  const { user } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [showFullBio, setShowFullBio] = useState(false);

  const MAX_BIO_LENGTH = 100;
  const bioExists = user.bio && user.bio.length > 0;
  const displayedBio = showFullBio || !bioExists ? user.bio : `${user.bio.substring(0, MAX_BIO_LENGTH)}...`;

  // 背景色とボーダー色をテーマに基づいて設定
  const bgColor = useColorModeValue('gray.50', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const buttonColor = useColorModeValue('teal.500', 'teal.200');

  return (
    <VStack spacing={4} align="start" w="100%" bg="white" p={6} borderRadius="xl" boxShadow="lg" borderWidth="xl" borderColor="gray.200" m={4}>
      {isEditing ? (
        <EditProfile user={user} setIsEditing={setIsEditing} />
      ) : (
        <>
          <Avatar size="xl" name={user.user_name} src={user.profile_photo_url} />
          <Heading fontSize="xl" fontWeight="bold">
            {user.user_name}
          </Heading>
          <Box>
            <Text>{displayedBio}</Text>
            {bioExists && user.bio.length > MAX_BIO_LENGTH && (
              <Button variant="link" colorScheme="teal" onClick={() => setShowFullBio(!showFullBio)}>
                {showFullBio ? '折りたたむ' : 'もっと読む'}
              </Button>
            )}
          </Box>
          <Button onClick={() => setIsEditing(true)} colorScheme="teal" mt={1}>編集</Button>
        </>
      )}
    </VStack>
  );
};

export default UserInfo;
