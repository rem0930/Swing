import { Box, Flex, Heading, Image, Text, Avatar } from '@chakra-ui/react';

const TeamProfile = ({ team }) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
      bg="white"
    >
      <Box
        height="150px"
        bgImage={team.background_photo ? `url(${team.background_photo})` : null}
        bgSize="cover"
        bgPosition="center"
        bgColor={!team.background_photo ? "gray.200" : "transparent"}
      />
      <Flex justify="left" mt={-12} ml={2}>
        {team.profile_photo ? (
          <Image
            borderRadius="full"
            boxSize="100px"
            src={team.profile_photo}
            alt={`${team.name} Profile Photo`}
            border="4px solid white"
          />
        ) : (
          <Avatar
            name={team.name}
            size="xl"
            border="4px solid white"
          />
        )}
      </Flex>
      <Box textAlign="left" mt={1} p={4}>
        <Heading size="md">{team.name}</Heading>
        <Text mt={2}>{team.details}</Text>
      </Box>
    </Box>
  );
};

export default TeamProfile;
