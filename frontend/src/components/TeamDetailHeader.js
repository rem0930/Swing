import { Box, Flex, Heading, Image, Text, Avatar } from '@chakra-ui/react';

const TeamDetailHeader = ({ team }) => {
  return (
    <Box>
      <Box
        height="150px"
        bgImage={`url(${team.background_photo || ''})`}
        bgSize="cover"
        bgPosition="center"
      />
      <Flex justify="center" mt={-12}>
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
            size="2xl"
            border="4px solid white"
          />
        )}
      </Flex>
      <Box textAlign="center" mt={4}>
        <Heading size="lg">{team.name}</Heading>
        <Text color="gray.500">@{team.name.replace(/\s+/g, '').toLowerCase()}</Text>
      </Box>
    </Box>
  );
};

export default TeamDetailHeader;
