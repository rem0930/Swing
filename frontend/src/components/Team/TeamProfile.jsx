import {
  Box, Flex, Heading, Text, Avatar, Button, useDisclosure, Input, Textarea, useToast,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { FiCamera } from 'react-icons/fi';
import DeleteConfirmationModal from '../DeleteConfirmationModal';

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const TeamProfile = ({ team }) => {
  const [isOwner, setIsOwner] = useState(false);
  const [teamData, setTeamData] = useState({
    ...team,
    profile_photo_url: team.profile_photo_url || team.profile_photo,
  });
  const [showFullBio, setShowFullBio] = useState(false);
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
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
      onEditClose();
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
    <Box maxWidth="600px" margin="auto" borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="md" bg="white">
      <Box
        height="160px"
        bgImage={`src`}
        bgSize="cover"
        bgPosition="center"
        bgColor={!teamData.background_photo ? "gray.200" : "transparent"}
      />
      <Flex direction="column" align="left" mt={-16} position="relative" px={4}>
        <Avatar
          size="xl"
          name={teamData.name}
          src={teamData.profile_photo_url}
          border="4px solid white"
        />
      </Flex>
      <Box textAlign="left" p={4}>
        <Heading size="l" mb={4}>{teamData.name}</Heading>
        <Text mt={2} whiteSpace="pre-wrap" maxWidth="600px" margin="auto">
          {showFullBio ? teamData.details : `${teamData.details.slice(0, 100)}...`}
        </Text>
        {teamData.details.length > 100 && (
          <Button variant="link" colorScheme="teal" onClick={() => setShowFullBio(!showFullBio)}>
            {showFullBio ? '折りたたむ' : 'もっと読む'}
          </Button>
        )}
        {isOwner && (
          <Flex justify="left" gap={4} mt={6}>
            <Button colorScheme="teal" onClick={onEditOpen}>
              編集
            </Button>
            <Button colorScheme="gray" onClick={onDeleteOpen}>
              削除
            </Button>
          </Flex>
        )}
      </Box>

      <Modal isOpen={isEditOpen} onClose={onEditClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>チーム情報の編集</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction="column" align="left" mb={4}>
              <Avatar
                size="xl"
                name={teamData.name}
                src={teamData.profile_photo_url}
                mb={2}
              />
              <Button
                leftIcon={<FiCamera />}
                onClick={() => document.getElementById('profile_photo_input').click()}
              >
                プロフィール画像を変更
              </Button>
              <Input
                type="file"
                accept="image/*"
                id="profile_photo_input"
                onChange={handleProfileImageChange}
                style={{ display: 'none' }}
              />
            </Flex>
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
              minHeight="200px"
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={handleSave}>
              保存
            </Button>
            <Button variant="ghost" onClick={onEditClose}>キャンセル</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <DeleteConfirmationModal
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
        onDelete={handleDelete}
      />
    </Box>
  );
};

export default TeamProfile;
