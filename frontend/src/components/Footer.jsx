import { Box, Container, Stack, Text, Link } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box bg="gray.800" color="white" py={10}>
      <Container maxW="container.xl">
        <Stack direction="row" spacing={4} justifyContent="center">
          <Link href="/">ホーム</Link>
          <Link href="/about">アバウト</Link>
          <Link href="/contact">お問い合わせ</Link>
        </Stack>
        <Text textAlign="center" mt={4}>
          &copy; 2024 草野球愛好者のプラットフォーム. All rights reserved.
        </Text>
      </Container>
    </Box>
  );
};

export default Footer;
