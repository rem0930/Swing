import { Box, Flex, HStack, Link, Button } from "@chakra-ui/react";

const Navbar = () => {
  return (
    <Box bg="gray.800" color="white">
      <Flex h={16} alignItems="center" justifyContent="space-between" px={8}>
        <HStack spacing={8} alignItems="center">
          <Box>
            <Link href="/">
              {/* <img src="/images/logo.png" alt="Logo" width="50" /> */}
            </Link>
          </Box>
          <HStack as="nav" spacing={4} display={{ base: "none", md: "flex" }}>
            <Link href="/">ホーム</Link>
            <Link href="/teams">チーム</Link>
            <Link href="/recruitments">募集</Link>
            <Link href="/about">アバウト</Link>
          </HStack>
        </HStack>
        <Flex alignItems="center">
          <Button variant="solid" colorScheme="teal" size="sm" mr={4}>
            ログイン
          </Button>
          <Button variant="outline" colorScheme="teal" size="sm">
            サインアップ
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
