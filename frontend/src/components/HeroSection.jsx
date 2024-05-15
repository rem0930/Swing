import { Box, Heading, Text, Button, Image } from "@chakra-ui/react";

const HeroSection = () => {
  return (
    <Box
    //   bgImage="url('/images/background.jpg')"
      bgSize="cover"
      bgPosition="center"
      color="white"
      textAlign="center"
      py={20}
    >
      <Heading as="h1" size="2xl" mb={4}>
        草野球愛好者のためのプラットフォーム
      </Heading>
      <Text fontSize="xl" mb={8}>
        草野球をもっと楽しもう！
      </Text>
      <Button colorScheme="teal" size="lg">
        始める
      </Button>
    </Box>
  );
};

export default HeroSection;
