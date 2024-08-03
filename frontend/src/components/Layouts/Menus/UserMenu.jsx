import React, { useState } from 'react';
import {
  Box,
  Button,
  Avatar,
  IconButton,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  VStack,
  Flex,
  Text,
  Divider,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";
import { FiBell, FiUsers, FiMessageCircle, FiMenu, FiX } from "react-icons/fi";
import NextLink from 'next/link';
import useLogout from '../../../pages/logout';
import { useUser } from '../../../context/UserContext';

const UserMenu = ({ isMenuOpen, onMenuToggle }) => {
  const { user } = useUser();
  const logout = useLogout();
  const { isOpen, onOpen, onClose } = useDisclosure({
    isOpen: isMenuOpen,
    onClose: () => onMenuToggle(false),
  });

  const handleDrawerClose = () => {
    onMenuToggle(false);
    onClose();
  };

  return (
    <Box>
      {/* Desktop Menu */}
      <Box display={{ base: "none", md: "block" }}>
        <NextLink href="/notifications" passHref>
          <Button variant="ghost" flexDirection="column" alignItems="center">
            <FiBell />
            <Text fontSize="xs" mt={1}>通知</Text>
          </Button>
        </NextLink>
        <NextLink href="/teams/manage" passHref>
          <Button variant="ghost" flexDirection="column" alignItems="center">
            <FiUsers />
            <Text fontSize="xs" mt={1}>チームを管理</Text>
          </Button>
        </NextLink>
        <NextLink href={`/users/${user.id}/chat`} passHref>
          <Button variant="ghost" flexDirection="column" alignItems="center">
            <FiMessageCircle />
            <Text fontSize="xs" mt={1}>メッセージ</Text>
          </Button>
        </NextLink>
        <Menu>
          <MenuButton as={Button} rounded="full" variant="link" cursor="pointer" minW={0}>
            <Avatar size="sm" src={user.profile_photo_url} name={user.user_name} textAlign="center"/>
          </MenuButton>
          <MenuList>
            <NextLink href="/ProfilePage" passHref>
              <MenuItem as="a">プロフィール</MenuItem>
            </NextLink>
            <NextLink href="/about" passHref>
              <MenuItem as="a">ABOUT</MenuItem>
            </NextLink>
            <MenuDivider />
            <MenuItem onClick={logout}>ログアウト</MenuItem>
          </MenuList>
        </Menu>
      </Box>
      {/* Mobile Menu */}
      <Box display={{ base: "block", md: "none" }}>
        <Drawer isOpen={isOpen} placement="right" onClose={handleDrawerClose}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth="1px">Menu</DrawerHeader>
            <DrawerBody>
              <VStack align="start" spacing={4}>
                <NextLink href="/about" passHref>
                  <Button as="a" variant="ghost" w="100%" _hover={{ color: "teal.500" }}>ABOUT</Button>
                </NextLink>
                <NextLink href="/notifications" passHref>
                  <Button as="a" variant="ghost" w="100%" _hover={{ color: "teal.500" }}>通知</Button>
                </NextLink>
                <NextLink href="/teams/manage" passHref>
                  <Button as="a" variant="ghost" w="100%" _hover={{ color: "teal.500" }}>チーム管理</Button>
                </NextLink>
                <NextLink href={`/users/${user.id}/chat`} passHref>
                  <Button as="a" variant="ghost" w="100%" _hover={{ color: "teal.500" }}>メッセージ</Button>
                </NextLink>
                <Divider />
                <Flex align="center" justify="space-between" w="full">
                  <Flex align="center">
                    <Avatar size="sm" src={user.profile_photo_url} name={user.user_name} mr={2} />
                    <Box>
                      <Text fontWeight="bold" fontSize="s" >{user.user_name}</Text>
                      <NextLink href="/ProfilePage" passHref>
                        <Text as="a" color="teal.500" fontSize="xs">プロフィールを表示</Text>
                      </NextLink>
                    </Box>
                  </Flex>
                  <Button variant="link" fontSize="xs" onClick={logout}>ログアウト</Button>
                </Flex>
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Box>
    </Box>
  );
};

export default UserMenu;
