import { Box, Container, Text, Link, Icon, Stack, VStack, Flex } from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa";
import { FaXTwitter as FaX } from "react-icons/fa6"; // Xのアイコン

const Footer = () => {
  return (
    <Box as="footer" id="main-footer" bg="black" color="white" py={12} position="relative" zIndex={1000}>
      <Container maxW="container.lg" px={8}>
        <Flex justify="space-between" align="center">
          <Box textAlign="center" ml={6}>
            <Text fontSize="xs" mt={-5} mb={2}>Keep In Touch</Text>
            <Stack direction="row" spacing={4} justify="center">
              <Link href="https://x.com/null_09_30" isExternal>
                <Icon as={FaX} boxSize={3} />
              </Link>
              <Link href="https://github.com/rem0930" isExternal>
                <Icon as={FaGithub} boxSize={3} />
              </Link>
            </Stack>
          </Box>
          <Box textAlign="left" mr={6}>
            <VStack spacing={2} align="left">
              <Link href="/about" color="white" fontSize="xs" _hover={{ textDecoration: "underline", color: "teal.300" }}>
                ABOUT
              </Link>
              <Link color="white" fontSize="xs" _hover={{ textDecoration: "underline", color: "teal.300" }}>
                Privacy Policy
              </Link>
              <Link color="white" fontSize="xs" _hover={{ textDecoration: "underline", color: "teal.300" }}>
                Terms of Use
              </Link>
              <Link href="https://forms.gle/e6pnLbU5FcCjsyTt7" isExternal color="white" fontSize="xs" _hover={{ textDecoration: "underline", color: "teal.300" }}>
                Contact
              </Link>
            </VStack>
          </Box>
        </Flex>
        <Box textAlign="center" mt={4}>
          <Text fontSize="sm">&copy; 2024 Swing. All rights reserved.</Text>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
