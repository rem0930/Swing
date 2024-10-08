import React, { useState, useRef } from 'react';
import {
  Box, Button, FormControl, FormLabel, Input, Avatar, Stack, useToast, IconButton, Text,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
  Textarea, VStack
} from '@chakra-ui/react';
import { useUser } from '../../context/UserContext';
import axios from 'axios';
import { FiCamera } from 'react-icons/fi';

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const MAX_FILE_SIZE = 5 * 1024 * 1024;

const EditProfile = ({ user, setIsEditing }) => {
  const { setUser } = useUser();
  const [formData, setFormData] = useState({
    user_name: user.user_name,
    profile_photo: user.profile_photo_url,
    bio: user.bio,
    profile_photo_file: null,
  });
  const [fileError, setFileError] = useState('');
  const fileInputRef = useRef(null);
  const toast = useToast();
  const [isOpen, setIsOpen] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        setFileError('別の写真を選択してください。');
        e.target.value = null;
        return;
      }
      setFileError('');
      setFormData((prev) => ({ ...prev, profile_photo_file: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, profile_photo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileUpload = async () => {
    const token = localStorage.getItem('token');
    if (!formData.profile_photo_file) return;

    const formDataObj = new FormData();
    formDataObj.append('profile_photo', formData.profile_photo_file);

    try {
      const response = await axios.patch(`${apiUrl}/users/update_profile_photo`, formDataObj, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
        maxContentLength: MAX_FILE_SIZE,
        maxBodyLength: MAX_FILE_SIZE,
      });
      setUser(response.data);
      toast({
        title: 'プロフィール画像が更新されました。',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error uploading profile photo:', error);
      toast({
        title: 'プロフィール画像の更新に失敗しました。',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    try {
      const updatedData = {};
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== user[key] && key !== 'profile_photo_file') {
          updatedData[key] = formData[key] === '' ? null : formData[key];
        }
      });

      const response = await axios.put(`${apiUrl}/users/${user.id}`, { user: updatedData }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data);
      if (formData.profile_photo_file) {
        await handleProfileUpload();
      }
      setIsEditing(false);
      toast({
        title: 'プロフィールが更新されました。',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: 'プロフィールの更新に失敗しました。',
        description: error.response?.data?.message || 'エラーが発生しました。もう一度お試しください。',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleCancel = () => {
    setFormData({
      user_name: user.user_name,
      profile_photo: user.profile_photo_url,
      bio: user.bio,
      profile_photo_file: null,
    });
    setIsOpen(false);
    setIsEditing(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={handleCancel} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>プロフィールを編集</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4} align="center">
            <Box position="relative" display="inline-block">
              <Avatar size="2xl" name={user.user_name} src={formData.profile_photo} opacity={formData.profile_photo_file ? 0.6 : 1} />
              <IconButton
                icon={<FiCamera />}
                position="absolute"
                bottom="0"
                right="0"
                aria-label="Edit Profile Photo"
                onClick={() => fileInputRef.current.click()}
              />
              <Input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleProfileImageChange}
                style={{ display: 'none' }}
              />
            </Box>
            {fileError && <Text color="red.500">{fileError}</Text>}

            <FormControl>
              <FormLabel htmlFor="user_name">ユーザー名</FormLabel>
              <Input
                id="user_name"
                value={formData.user_name}
                name="user_name"
                onChange={handleChange}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="bio">Bio</FormLabel>
              <Textarea
                id="bio"
                value={formData.bio}
                name="bio"
                onChange={handleChange}
                rows={5}
              />
            </FormControl>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="teal" mr={3} onClick={handleSave}>
            保存
          </Button>
          <Button variant="ghost" onClick={handleCancel}>キャンセル</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditProfile;
