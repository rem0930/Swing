import { Box, Container, Stack, Text, Link as ChakraLink } from "@chakra-ui/react";
import NextLink from 'next/link';

const Footer = () => {
  return (
    <Box bg="teal.500" color="white" py={10}>
      <Container maxW="container.xl">
        <Stack direction="row" spacing={4} justifyContent="center">
          <NextLink href="/" passHref legacyBehavior>
            <ChakraLink>ホーム</ChakraLink>
          </NextLink>
          <NextLink href="/about" passHref legacyBehavior>
            <ChakraLink>アバウト</ChakraLink>
          </NextLink>
          <NextLink href="/contact" passHref legacyBehavior>
            <ChakraLink>お問い合わせ</ChakraLink>
          </NextLink>
        </Stack>
        <Text textAlign="center" mt={4}>
          &copy; 2024 草野球愛好者のプラットフォーム. All rights reserved.
        </Text>
      </Container>
    </Box>
  );
};

export default Footer;
