// components/CreateRecruitmentButton.jsx
import { Box, IconButton, Tooltip } from "@chakra-ui/react";
import { FiFeather } from "react-icons/fi";
import { useRouter } from "next/router";
import axios from 'axios';
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const CreateRecruitmentButton = () => {
  const router = useRouter();

  const handleClick = async () => {
    try {
      const response = await axios.get(`${apiUrl}/has_team`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.data.has_team) {
        router.push(`http://localhost:8000/teams/${response.data.team_id}/recruitments/new`);
      } else {
        router.push('http://localhost:8000/teams/create');
      }
    } catch (error) {
      console.error('Error checking team status', error);
    }
  };

  return (
    <Box position="fixed" bottom="20px" right="20px" zIndex="1000">
      <Tooltip label="募集作成" aria-label="募集作成">
        <IconButton
          colorScheme="teal"
          size="lg"
          icon={<FiFeather />}
          onClick={handleClick}
          isRound
          aria-label="新規募集作成"
        />
      </Tooltip>
    </Box>
  );
};

export default CreateRecruitmentButton;
