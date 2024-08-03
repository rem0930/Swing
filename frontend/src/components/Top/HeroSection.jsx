import { Box, Container, Heading, Text, Button } from "@chakra-ui/react";

const HeroSection = () => {
  return (
    <Box as="section" position="relative" height="100vh" display="flex" alignItems="center" justifyContent="center" overflow="hidden">
      <video autoPlay loop muted playsInline style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', zIndex: '-1' }}>
        <source src="/swing.hero.mp4" type="video/mp4" />
      </video>
      <Box position="absolute" top="0" left="0" right="0" bottom="0" opacity="0.7" zIndex="0" bg="rgba(0,0,0,0.5)"></Box>
      <Container maxW="container.lg" position="relative" zIndex="1" textAlign="left" color="white" ml={6}>
        <Heading as="h1" size="2xl" mb={4} fontWeight="bold" letterSpacing="tight">野球を通じて新たな出会いを</Heading>
        <Text fontSize="xl" mb={8} fontWeight="medium">
          Swing はユーザーがチームや募集を簡単に作成、管理、参加できるプラットフォームです。
          <br></br>リアルタイムでのコミュニケーションや位置情報を活用した検索機能を提供します。
          <br></br>ぜひログインして同じ趣味を持つ仲間と楽しんでください。
        </Text>
        <Button size="lg" colorScheme="teal" mb={4} _hover={{ bg: "teal.300" }}>今すぐ始める</Button>
      </Container>
    </Box>
  );
};


export default HeroSection;
