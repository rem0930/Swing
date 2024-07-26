import React from 'react';
import { Box, Flex, Heading, Text, Image, Link, Stack } from '@chakra-ui/react';

const TopPage = () => {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      height="100vh"
      bgGradient="linear(to-r, teal.200, teal.200)"
      color="gray.800"
      textAlign="center"
      p={4}
    >
      <Box mb={-5} ml={-6}>
        <Image src="/swing.logo.png" alt="Swing Logo" boxSize="200px" />
      </Box>
      <Text fontSize="xl" color="gray.700" mb={8}>
        草野球をもっと身近に、もっと楽しく。
        <br />
        新しい仲間と一緒にプレイしよう！
      </Text>
      <Link href="https://swi-ng.com" isExternal>
        <Box
          as="span"
          fontSize="xl"
          color="white"
          fontWeight="bold"
          p="10px 20px"
          px="30px"
          border="2px solid white"
          borderRadius="xl"
          transition="all 0.3s"
          _hover={{ textDecoration: 'none', bg: 'teal.700' }}
        >
          https://swi-ng.com
        </Box>
      </Link>
    </Flex>
  );
};

export default TopPage;
