import {
  Box, Flex, Heading, Text, Avatar, Button, useDisclosure, Input, Textarea, IconButton, useToast
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { FiCamera } from 'react-icons/fi';
import DeleteConfirmationModal from '../DeleteConfirmationModal';

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const TeamProfile = ({ team }) => {
  const [isOwner, setIsOwner] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [teamData, setTeamData] = useState({
    ...team,
    profile_photo_url: team.profile_photo_url || team.profile_photo,
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    const checkOwner = async () => {
      try {
        const response = await axios.get(`${apiUrl}/teams/${team.id}/owner_check`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setIsOwner(response.data.is_owner);
      } catch (error) {
        console.error('チーム所有者の確認中にエラーが発生しました:', error);
      }
    };

    checkOwner();
  }, [team.id]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${apiUrl}/teams/${team.id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      toast({
        title: 'チームが削除されました。',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      router.push('/');
    } catch (error) {
      console.error('チームの削除中にエラーが発生しました:', error);
      toast({
        title: 'チームの削除に失敗しました。',
        description: 'もう一度お試しください。',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append('team[name]', teamData.name);
      formData.append('team[details]', teamData.details);
      if (teamData.profile_photo_file) {
        formData.append('team[profile_photo]', teamData.profile_photo_file);
      }

      const response = await axios.patch(`${apiUrl}/teams/${team.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setTeamData(response.data);
      setIsEditing(false);
      toast({
        title: 'チーム情報が更新されました。',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('チーム情報の更新中にエラーが発生しました:', error);
      toast({
        title: 'チーム情報の更新に失敗しました。',
        description: 'もう一度お試しください。',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTeamData((prev) => ({ ...prev, profile_photo_url: reader.result, profile_photo_file: file }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="md" bg="white">
      <Box
        height="150px"
        bgImage={teamData.background_photo ? `url(${teamData.background_photo})` : null}
        bgSize="cover"
        bgPosition="center"
        bgColor={!teamData.background_photo ? "gray.200" : "transparent"}
      />
      <Flex justify="left" mt={-12} ml={4} position="relative">
        <Box position="relative">
          <Avatar
            size="xl"
            name={teamData.name}
            src={teamData.profile_photo_url}
            opacity={isEditing ? 0.6 : 1}
          />
          {isEditing && (
            <IconButton
              icon={<FiCamera />}
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              aria-label="Edit Profile Photo"
              onClick={() => document.getElementById('profile_photo_input').click()}
            />
          )}
        </Box>
        <Input
          type="file"
          accept="image/*"
          id="profile_photo_input"
          onChange={handleProfileImageChange}
          style={{ display: 'none' }}
        />
      </Flex>
      <Box textAlign="left" mt={1} p={4}>
        {isEditing ? (
          <>
            <Input
              name="name"
              value={teamData.name}
              onChange={(e) => setTeamData({ ...teamData, name: e.target.value })}
              placeholder="チーム名"
              mb={3}
            />
            <Textarea
              name="details"
              value={teamData.details}
              onChange={(e) => setTeamData({ ...teamData, details: e.target.value })}
              placeholder="チーム詳細"
              mb={3}
            />
            <Flex justify="center" gap={4}>
              <Button colorScheme="teal" onClick={handleSave}>
                保存
              </Button>
              <Button onClick={() => setIsEditing(false)}>
                キャンセル
              </Button>
            </Flex>
          </>
        ) : (
          <>
            <Heading size="md">{teamData.name}</Heading>
            <Text mt={2}>{teamData.details}</Text>
            {isOwner && (
              <Flex justify="left" gap={4} p={4}>
                <Button colorScheme="teal" onClick={handleEdit}>
                  編集
                </Button>
                <Button colorScheme="red" onClick={onOpen}>
                  削除
                </Button>
              </Flex>
            )}
          </>
        )}
      </Box>

      <DeleteConfirmationModal
        isOpen={isOpen}
        onClose={onClose}
        onDelete={handleDelete}
      />
    </Box>
  );
};

export default TeamProfile;
