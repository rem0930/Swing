import { Box, Input, Textarea, Button, Flex, Avatar, IconButton, Text, useToast } from '@chakra-ui/react';
import { useState, useRef } from 'react';
import { FiCamera } from 'react-icons/fi';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const EditTeamForm = ({ teamData, onSave, onCancel }) => {
  const [updatedTeamData, setUpdatedTeamData] = useState(teamData);
  const [fileError, setFileError] = useState('');
  const fileInputRef = useRef(null);
  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTeamData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        setFileError('他の画像を使用してください。');
        e.target.value = ''; // ファイル選択をリセット
        return;
      }
      setFileError('');
      const reader = new FileReader();
      reader.onloadend = () => {
        setUpdatedTeamData((prev) => ({ ...prev, profile_photo_url: reader.result, profile_photo_file: file }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (updatedTeamData.profile_photo_file) {
      const formData = new FormData();
      formData.append('profile_photo', updatedTeamData.profile_photo_file);
      updatedTeamData.profile_photo_file = formData;
    }
    onSave(updatedTeamData);
  };

  const handleFileButtonClick = () => {
    toast({
      title: "エラーが発生しました。",
      description: "他の画像を選択して下さい。",
      status: "info",
      duration: 3000,
      isClosable: true,
    });
    fileInputRef.current.click();
  };

  return (
    <Box>
      <Flex justify="center" mb={4}>
        <Box position="relative" display="inline-block">
          <Avatar size="xl" name={updatedTeamData.name} src={updatedTeamData.profile_photo_url} opacity={updatedTeamData.profile_photo_file ? 0.6 : 1} />
          <IconButton
            icon={<FiCamera />}
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            aria-label="Edit Profile Photo"
            onClick={handleFileButtonClick}
          />
          <Input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleProfileImageChange}
            style={{ display: 'none' }}
          />
        </Box>
      </Flex>
      {fileError && <Text color="red.500" textAlign="center" mb={2}>{fileError}</Text>}
      <Input
        name="name"
        value={updatedTeamData.name}
        onChange={handleChange}
        placeholder="チーム名"
        mb={3}
      />
      <Textarea
        name="details"
        value={updatedTeamData.details}
        onChange={handleChange}
        placeholder="チーム詳細"
        mb={3}
      />
      <Flex justify="center" gap={4}>
        <Button colorScheme="teal" onClick={handleSave}>
          保存
        </Button>
        <Button onClick={onCancel}>
          キャンセル
        </Button>
      </Flex>
    </Box>
  );
};

export default EditTeamForm;