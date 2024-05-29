import { Box, Heading, Text, Button, VStack, SlideFade } from "@chakra-ui/react";

const HeroSection = () => {
  return (
    <Box
      bg="teal.300"
      color="white"
      textAlign="center"
      py={20}
      px={4}
    >
      <SlideFade in offsetY="20px">
        <VStack spacing={6}>
          {/* <Image src="/images/logo.png" alt="Logo" boxSize="100px" /> */}
          <Heading as="h1" size="2xl" mb={4}>
            草野球愛好者のためのプラットフォーム
          </Heading>
          <Text fontSize="xl" maxW="2xl">
            草野球をもっと楽しもう！参加希望者とチームのマッチングをサポートします。
          </Text>
          <Button colorScheme="teal" size="lg">
            始める
          </Button>
        </VStack>
      </SlideFade>
    </Box>
  );
};

export default HeroSection;
