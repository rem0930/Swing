import React, { useRef, useEffect, useState } from 'react';
import { Box, Flex, HStack, InputGroup, InputLeftElement, InputRightElement, Input, Button, Icon, IconButton, Collapse, useDisclosure } from "@chakra-ui/react";
import { FiMapPin, FiSearch, FiMenu, FiX } from "react-icons/fi";
import { useUser } from '../../context/UserContext';
import NextLink from 'next/link';
import Logo from '../Logo';
import UserMenu from './Menus/UserMenu';
import GuestMenu from './Menus/GuestMenu';

const Header = () => {
  const { user } = useUser();
  const { isOpen: isSearchOpen, onToggle: onSearchToggle, onClose: onSearchClose } = useDisclosure();
  const { isOpen: isMenuOpen, onToggle: onMenuToggle, onClose: onMenuClose } = useDisclosure();
  const [isMobile, setIsMobile] = useState(false);
  const headerRef = useRef(null);

  const updateHeaderHeight = () => {
    const headerHeight = headerRef.current ? headerRef.current.offsetHeight : 64;
    const event = new CustomEvent('headerHeightChange', { detail: { height: headerHeight } });
    window.dispatchEvent(event);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
        onSearchClose();
      }
      updateHeaderHeight();
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [onSearchClose]);

  useEffect(() => {
    updateHeaderHeight();
  }, [isSearchOpen, isMenuOpen]);

  return (
    <Box ref={headerRef} bg="white" px={4} position="fixed" width="100%" zIndex="1000" boxShadow="md" h={isMobile && isSearchOpen ? "116px" : "64px"}>
      <Flex h="64px" alignItems="center" justifyContent="space-between">
        <Box display={{ base: "block", md: "none" }}>
          <IconButton icon={<FiSearch />} onClick={onSearchToggle} aria-label="Search" variant="outline" />
        </Box>
        <Box>
          <NextLink href={user ? "/" : "/"}>
            <Logo />
          </NextLink>
        </Box>
        <Flex flex={1} justifyContent="center" maxW="800px" mx={4} display={{ base: "none", md: "flex" }}>
          <InputGroup flex="1" maxW="400px">
            <InputLeftElement pointerEvents="none">
              <FiSearch color="gray.300" />
            </InputLeftElement>
            <Input type="text" placeholder="イベントを検索する" borderRightRadius={0} />
          </InputGroup>
          <InputGroup flex="1" maxW="400px">
            <InputRightElement pointerEvents="none">
              <FiMapPin color="gray.300" />
            </InputRightElement>
            <Input type="text" placeholder="地域、都市名" borderRadius={0} />
          </InputGroup>
          <Button bg="teal.500" color="white" _hover={{ bg: "teal.600" }} borderLeftRadius={0} borderRightRadius="md">
            <Icon as={FiSearch} />
          </Button>
        </Flex>
        <HStack spacing={3} alignItems="center">
          {user ? <UserMenu isMenuOpen={isMenuOpen} onMenuToggle={onMenuToggle} /> : <GuestMenu isMobile={isMobile} />}
          {user && (
            <Box display={{ base: "block", md: "none" }}>
              <IconButton
                icon={isMenuOpen ? <FiX /> : <FiMenu />}
                onClick={onMenuToggle}
                aria-label="Menu"
                variant="outline"
              />
            </Box>
          )}
        </HStack>
      </Flex>
      <Collapse in={isSearchOpen} animateOpacity>
        <Box mt={1} pb={4} display={{ base: "flex", md: "none" }} flexDirection="column">
          <Flex>
            <InputGroup flex="1" maxW="400px">
              <InputLeftElement pointerEvents="none">
                <FiSearch color="gray.300" />
              </InputLeftElement>
              <Input type="text" placeholder="イベントを検索する" borderRightRadius={0} />
            </InputGroup>
            <InputGroup flex="1" maxW="400px">
              <InputRightElement pointerEvents="none">
                <FiMapPin color="gray.300" />
              </InputRightElement>
              <Input type="text" placeholder="地域、都市名" borderRadius={0} />
            </InputGroup>
            <Button bg="teal.500" color="white" _hover={{ bg: "teal.600" }} borderLeftRadius={0} borderRightRadius="md">
              <Icon as={FiSearch} />
            </Button>
          </Flex>
        </Box>
      </Collapse>
    </Box>
  );
};

export default Header;
