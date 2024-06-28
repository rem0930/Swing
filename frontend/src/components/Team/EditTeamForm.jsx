import { Box, Input, Textarea, Button, Flex, Avatar, IconButton } from '@chakra-ui/react';
import { useState } from 'react';
import { FiCamera } from 'react-icons/fi';  // 編集アイコンとして使用

const EditTeamForm = ({ teamData, onSave, onCancel }) => {
  const [updatedTeamData, setUpdatedTeamData] = useState(teamData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTeamData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
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
            onClick={() => document.getElementById('edit_team_profile_photo_input').click()}
          />
          <Input
            type="file"
            accept="image/*"
            id="edit_team_profile_photo_input"
            onChange={handleProfileImageChange}
            style={{ display: 'none' }}
          />
        </Box>
      </Flex>
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
