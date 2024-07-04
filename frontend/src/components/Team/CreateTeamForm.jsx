import React from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useColorModeValue,
} from '@chakra-ui/react';

function CreateTeamForm({ onSubmit, name, setName, details, setDetails }) {
  const formBackgroundColor = useColorModeValue('gray.100', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');

  return (
    <Box
      p={8}
      maxWidth="500px"
      borderWidth={1}
      borderRadius={8}
      boxShadow="lg"
      bg={formBackgroundColor}
      mx="auto"
      my={12}
    >
      <form onSubmit={onSubmit}>
        <FormControl isRequired>
          <FormLabel htmlFor="name" color={textColor}>チーム名</FormLabel>
          <Input
            id="name"
            placeholder=""
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel htmlFor="details" color={textColor}>チーム詳細</FormLabel>
          <Textarea
            id="details"
            placeholder="東京の江東区を中心に活動中！楽しみながら真剣に野球をしませんか？20代後半〜30代の初心者・経験者混合チームです。何卒宜しくお願いします。"
            rows="4"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />
        </FormControl>

        <Button
          type="submit"
          colorScheme="teal"
          width="full"
          mt={4}
        >
          チームを作成
        </Button>
      </form>
    </Box>
  );
}

export default CreateTeamForm;
