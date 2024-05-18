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
      >
        <Flex alignItems="center" p={4}>
          {scrollY > 200 ? (
            <Heading size="md" isTruncated>{title}</Heading>
          ) : (
            <>
              <NextLink href={`/teams/${team.id}`} passHref>
                <Link>
                  {profilePhoto ? (
                    <Image
                      borderRadius="full"
                      boxSize="50px"
                      src={profilePhoto}
                      alt={`${team.name} Profile Photo`}
                      mr={4}
                    />
                  ) : (
                    <Avatar
                      name={team.name}
                      boxSize="50px"
                      mr={4}
                    />
                  )}
                </Link>
              </NextLink>
              <Box>
                <Text fontSize="sm" color="gray.500">Hosted by {team.name}</Text>
                <Heading size="lg" isTruncated>{title}</Heading>
              </Box>
            </>
          )}
        </Flex>
      </Box>
      {!isMobile && (
        <Box height="200px" bgImage="url('/path/to/your/background.jpg')" bgSize="cover" bgPosition="center" />
      )}
    </Box>
  );
};

export default RecruitmentHeader;
