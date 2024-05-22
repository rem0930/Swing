import { Box, IconButton } from '@chakra-ui/react';
import { FiPlus } from 'react-icons/fi';
import { useRouter } from 'next/router';

const CreateRecruitmentButton = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('http://localhost:8000/recruitments/new'); // 新規募集作成ページへのリンク
  };

  return (
    <Box position="fixed" bottom="20px" right="20px" zIndex="10">
      <IconButton
        icon={<FiPlus />}
        colorScheme="teal"
        aria-label="Create Recruitment"
        isRound
        size="lg"
        onClick={handleClick}
      />
    </Box>
  );
};

export default CreateRecruitmentButton;
