import { Box, Flex, Heading, Image, Text, Avatar, useBreakpointValue, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useEffect, useState } from 'react';

const RecruitmentHeader = ({ team, title, profilePhoto }) => {
  const [scrollY, setScrollY] = useState(0);
  const isMobile = useBreakpointValue({ base: true, md: false });

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
          <Flex alignItems="left" justifyContent="center" direction={{ base: "column", md: "row" }}>
            <NextLink href={`/teams/${team.id}`} passHref>
              <Link>
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
              </Link>
            </NextLink>
            <Box textAlign={{ base: "center", md: "left" }}>
              <Text fontSize="sm" color="gray.500">Hosted by</Text>
              <Text fontSize="md" fontWeight="bold">{team.name}</Text>
            </Box>
          </Flex>
        </Flex>
      </Box>
      {!isMobile && (
        <Box height="200px" bgSize="cover" bgPosition="center" />
      )}
    </Box>
  );
};

export default RecruitmentHeader;
