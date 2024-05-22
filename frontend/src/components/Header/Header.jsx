import { Box, Flex, IconButton, useDisclosure, useColorModeValue, HStack, InputGroup, InputLeftElement, InputRightElement, Input, Avatar, Button, Menu, MenuButton, MenuList, MenuItem, MenuDivider, Stack } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, SearchIcon } from "@chakra-ui/icons";
import { FiMapPin, FiBell, FiMessageCircle, FiUsers } from "react-icons/fi";
import NextLink from 'next/link';
import { useUser } from '../../context/UserContext';

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useUser();
  const userProfilePhoto = user ? user.profile_photo : null;
  const userName = user ? user.user_name : "John Doe";

  return (
    <Box bg={useColorModeValue("gray.100", "gray.900")} px={4} position="fixed" width="100%" zIndex="1000" boxShadow="md">
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <IconButton
          size={"md"}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={"Open Menu"}
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems={"center"}>
          <Box><NextLink href="/">Swing</NextLink></Box>
          <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
            {user && (
              <>
                <NextLink href="http://localhost:8000//notifications">
                  <IconButton
                    icon={<FiBell />}
                    aria-label="Notifications"
                    variant="ghost"
                  />
                </NextLink>
                <NextLink href="http://localhost:8000//teams/manage">
                  <IconButton
                    icon={<FiUsers />}
                    aria-label="Manage Team"
                    variant="ghost"
                  />
                </NextLink>
                <NextLink href="http://localhost:8000//messages">
                  <IconButton
                    icon={<FiMessageCircle />}
                    aria-label="Messages"
                    variant="ghost"
                  />
                </NextLink>
              </>
            )}
          </HStack>
        </HStack>
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
        <Flex alignItems={"center"}>
          {user ? (
            <Menu>
              <MenuButton as={Button} rounded={"full"} variant={"link"} cursor={"pointer"} minW={0}>
                {userProfilePhoto ? (
                  <Avatar size={"sm"} src={userProfilePhoto} />
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
                <NextLink href="http://localhost:8000/profile/MyProfilePage">
                  <MenuItem>プロフィール</MenuItem>
                </NextLink>
                <MenuDivider />
                <MenuItem>ログアウト</MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <>
              <NextLink href="http://localhost:8000//login">
                <Button mr={4}>ログイン</Button>
              </NextLink>
              <NextLink href="http://localhost:8000//signup">
                <Button colorScheme={"teal"}>会員登録</Button>
              </NextLink>
            </>
          )}
        </Flex>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as={"nav"} spacing={4}>
              <>
                <NextLink href="http://localhost:8000//notifications">お知らせ</NextLink>
                <NextLink href="http://localhost:8000//teams/manage">チームを管理する</NextLink>
                <NextLink href="http://localhost:8000//messages">メッセージ</NextLink>
              </>
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
};

export default Header;
