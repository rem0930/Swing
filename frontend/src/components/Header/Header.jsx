import React, { useRef } from 'react';
import {
  Box,
  Flex,
  Button,
  useDisclosure,
  IconButton,
  HStack,
  VStack,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Input,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Stack,
  Text,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, SearchIcon } from "@chakra-ui/icons";
import { FiMapPin, FiBell, FiMessageCircle, FiUsers } from "react-icons/fi";
import { useUser } from '../../context/UserContext';
import { useRouter } from 'next/router';
import NextLink from 'next/link';

import useLogout from '../../pages/logout';
import LoginModal from '../LoginModal';
import SignupModal from '../SignupModal';
import Logo from '../Logo';

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useUser();
  const logout = useLogout();
  const router = useRouter();

  const loginModalRef = useRef();
  const signupModalRef = useRef();

  const openLoginModal = () => {
    if (loginModalRef.current) {
      loginModalRef.current.onOpen();
    }
  };

  const openSignupModal = () => {
    if (signupModalRef.current) {
      signupModalRef.current.onOpen();
    }
  };

  const userProfilePhotoUrl = user?.profile_photo_url;
  const userName = user?.user_name ?? "John Doe";

  return (
    <Box
      bg="white"
      px={4}
      position="fixed"
      width="100%"
      zIndex="1000"
      boxShadow="md"
      h="64px"
    >
      <Flex h="64px" alignItems={"center"} justifyContent={"space-between"}>
        <IconButton
          size={"md"}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={"Open Menu"}
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />
        <Box>
          <NextLink href="/">
            <Logo />
          </NextLink>
        </Box>
        <Flex flex={1} justifyContent={"center"} maxW="800px" mx={4}>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.300" />
            </InputLeftElement>
            <Input type="text" placeholder="イベントを検索する" borderRightRadius={0} />
          </InputGroup>
          <InputGroup>
            <InputRightElement pointerEvents="none">
              <FiMapPin color="gray.300" />
            </InputRightElement>
            <Input type="text" placeholder="地域、都市名" borderLeftRadius={0} />
          </InputGroup>
        </Flex>
        <HStack spacing={8} alignItems={"center"}>
          <HStack as={"nav"} spacing={1} display={{ base: "none", md: "flex" }}>
            {user && (
              <>
                <NextLink href="/notifications">
                  <Button variant="ghost" flexDirection="column" alignItems="center">
                    <FiBell />
                    <Text fontSize="xs" mt={1}>通知</Text>
                  </Button>
                </NextLink>
                <NextLink href="/teams/manage">
                  <Button variant="ghost" flexDirection="column" alignItems="center">
                    <FiUsers />
                    <Text fontSize="xs" mt={1}>チームを管理</Text>
                  </Button>
                </NextLink>
                <NextLink href="/messages">
                  <Button variant="ghost" flexDirection="column" alignItems="center">
                    <FiMessageCircle />
                    <Text fontSize="xs" mt={1}>メッセージ</Text>
                  </Button>
                </NextLink>
              </>
            )}
          </HStack>
        </HStack>
        <Flex alignItems={"center"}>
          {user ? (
            <Menu>
              <MenuButton as={Button} rounded={"full"} variant={"link"} cursor={"pointer"} minW={0}>
                {userProfilePhotoUrl ? (
                  <Avatar size={"sm"} src={userProfilePhotoUrl} />
                ) : (
                  <Avatar
                    name={userName}
                    size={"sm"}
                    bg="teal.500"
                    color="white"
                  />
                )}
              </MenuButton>
              <MenuList>
                <NextLink href="/ProfilePage">
                  <MenuItem>プロフィール</MenuItem>
                </NextLink>
                <MenuDivider />
                <MenuItem onClick={logout}>ログアウト</MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <>
              <Button onClick={openLoginModal} variant="outline" color="black" bg="gray.200">
                ログイン
              </Button>
              <Button onClick={openSignupModal} variant="solid" ml={2} color="white" bg="teal.500">
                新規登録
              </Button>
              <LoginModal ref={loginModalRef} openSignupModal={openSignupModal} />  {/* ログインモーダルを使用 */}
              <SignupModal ref={signupModalRef} openLoginModal={openLoginModal} />  {/* サインアップモーダルを使用 */}
            </>
          )}
        </Flex>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as={"nav"} spacing={4}>
              <>
                <NextLink href="/notifications">お知らせ</NextLink>
                <NextLink href="/messages">メッセージ</NextLink>
              </>
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
};

export default Header;
