import { Box, Flex, Heading, Image, Text, Avatar, Link as ChakraLink } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useEffect, useState } from 'react';

const RecruitmentHeader = ({ team, title, profilePhoto }) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Box position="relative" width="100%" bg="white" zIndex={10}>
      <Box
        position="sticky"
        top="0"
        bg="white"
        boxShadow={scrollY > 200 ? 'md' : 'none'}
        transition="box-shadow 0.2s"
        p={4}
      >
        <Flex alignItems="left" direction="column">
          <Heading size="lg" textAlign="left" mb={4} isTruncated>{title}</Heading>
          <NextLink href={`/teams/${team.id}`} passHref>
            <ChakraLink display="flex" alignItems="center" justifyContent="left">
              {profilePhoto ? (
                <Image
                  borderRadius="full"
                  boxSize="50px"
                  src={profilePhoto}
                  alt={`${team.name} Profile Photo`}
                  mr={4}
                  mb={{ base: 2, md: 0 }}
                />
              ) : (
                <Avatar
                  name={team.name}
                  boxSize="50px"
                  mr={4}
                  mb={{ base: 2, md: 0 }}
                />
              )}
              <Box>
                <Text fontSize="sm" color="gray.500">Hosted by</Text>
                <Text fontSize="md" fontWeight="bold">{team.name}</Text>
              </Box>
            </ChakraLink>
          </NextLink>
        </Flex>
      </Box>
    </Box>
  );
};

export default RecruitmentHeader;
