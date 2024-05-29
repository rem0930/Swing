import { useState } from 'react';
import {
  Box,
  Flex,
  HStack,
  Link as ChakraLink,
  Button,
  Spacer,
  useColorModeValue,
  Input,
  IconButton,
  Collapse,
} from "@chakra-ui/react";
import { SearchIcon, CloseIcon } from "@chakra-ui/icons";
import NextLink from 'next/link';  // Next.js の Link コンポーネントを使用

const Navbar = () => {
  const bgColor = useColorModeValue("teal.400", "teal.700");
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Box
      bgGradient="linear(to-r, teal.300, teal.500)"
      boxShadow="md"
      color="white"
      position="fixed"
      width="100%"
      zIndex="1000"
    >
      <Flex h={20} alignItems="center" justifyContent="space-between" px={10}>
        <HStack spacing={10} alignItems="center">
          <Box>
            <NextLink href="/" passHref legacyBehavior>
              <ChakraLink>
                {/* <Image src="/images/logo.png" alt="Logo" boxSize="60px" /> */}
                ロゴ
              </ChakraLink>
            </NextLink>
          </Box>
          <HStack as="nav" spacing={2} display={{ base: "none", md: "flex" }} flex="1">
            <Input placeholder="近くの募集を検索" variant="filled" bg="white" color="black" size="md" width="300px" />
            <IconButton aria-label="検索" icon={<SearchIcon />} size="md" colorScheme="teal" />
          </HStack>
        </HStack>
        <Spacer />
        <Flex alignItems="center">
          <NextLink href="/login" passHref legacyBehavior>
            <ChakraLink>
              <Button
                variant="solid"
                colorScheme="whiteAlpha"
                color="teal.500"
                size="md"
                mr={4}
                _hover={{ bg: "teal.600", color: "white" }}
              >
                ログイン
              </Button>
            </ChakraLink>
          </NextLink>
          <NextLink href="/signup" passHref legacyBehavior>
            <ChakraLink>
              <Button
                variant="outline"
                colorScheme="whiteAlpha"
                color="white"
                size="md"
                _hover={{ bg: "teal.600", color: "white" }}
              >
                会員登録
              </Button>
            </ChakraLink>
          </NextLink>
          <IconButton
            size="lg"
            icon={isOpen ? <CloseIcon /> : <SearchIcon />}
            aria-label="メニューを開閉"
            display={{ md: "none" }}
            onClick={toggleMenu}
            ml={4}
          />
        </Flex>
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <Box pb={4} display={{ md: "none" }} px={10}>
          <Input placeholder="近くの募集を検索" variant="filled" bg="white" color="black" size="md" width="100%" mb={4} />
        </Box>
      </Collapse>
    </Box>
  );
};

export default Navbar;
