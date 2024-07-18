import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

function CreateTeamForm({ onSubmit, name, setName, details, setDetails }) {
  const formBackgroundColor = useColorModeValue('gray.50', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');
  const inputBackgroundColor = useColorModeValue('white', 'gray.700');
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    setCharCount(details.length);
  }, [details]);

  const handleDetailsChange = (e) => {
    const input = e.target.value;
    if (input.length <= 1000) {
      setDetails(input);
    }
  };

  return (
    <Box
      p={8}
      maxWidth="600px"
      borderWidth={1}
      borderRadius="lg"
      boxShadow="2xl"
      bg={formBackgroundColor}
      mx="auto"
      my={12}
    >
      <form onSubmit={onSubmit}>
        <FormControl isRequired mb={6}>
          <FormLabel htmlFor="name" color={textColor}>チーム名</FormLabel>
          <Input
            id="name"
            placeholder="チーム名を入力してください"
            value={name}
            onChange={(e) => setName(e.target.value)}
            bg={inputBackgroundColor}
            borderColor="gray.300"
            _placeholder={{ color: 'gray.500' }}
            _hover={{ borderColor: 'teal.200' }}
            _focus={{
              borderColor: 'teal',
              boxShadow: '0 0 0 1px teal',
              outline: 'none'
            }}
          />
        </FormControl>

        <FormControl mb={6}>
          <FormLabel htmlFor="details" color={textColor}>チーム詳細</FormLabel>
          <Textarea
            id="details"
            placeholder="東京の江東区を中心に活動中！楽しみながら真剣に野球をしませんか？20代後半〜30代の初心者・経験者混合チームです。何卒宜しくお願いします。"
            rows={10}
            value={details}
            onChange={handleDetailsChange}
            resize="vertical"
            bg={inputBackgroundColor}
            borderColor="gray.300"
            _placeholder={{ color: 'gray.500' }}
            _hover={{ borderColor: 'teal.200' }}
            _focus={{
              borderColor: 'teal',
              boxShadow: '0 0 0 1px teal',
              outline: 'none'
            }}
            whiteSpace="pre-wrap"
          />
          <Text fontSize="sm" textAlign="right" mt={2} color={textColor}>
            {charCount}/1000
          </Text>
        </FormControl>

        <Button
          type="submit"
          colorScheme="teal"
          width="full"
          mt={4}
          isDisabled={charCount > 1000}
          _hover={{ bg: 'teal.400' }}
        >
          チームを作成
        </Button>
      </form>
    </Box>
  );
}

export default CreateTeamForm;
