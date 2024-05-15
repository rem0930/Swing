import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Image, Text, Heading, VStack } from '@chakra-ui/react';

const TeamDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [team, setTeam] = useState(null);

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:3000/teams/${id}`)
        .then(response => setTeam(response.data))
        .catch(error => console.error(error));
    }
  }, [id]);

  if (!team) {
    return <p>Loading...</p>;
  }

  return (
    <Box p={5} maxW="800px" mx="auto">
      <Image
        src={team.background_photo || '/default-background.jpg'}
        alt={`${team.name} background`}
        borderRadius="md"
        mb={4}
      />
      <VStack align="start" spacing={4}>
        <Image
          src={team.profile_photo || '/default-profile.jpg'}
          alt={`${team.name} profile`}
          borderRadius="full"
          boxSize="150px"
        />
        <Heading as="h1" size="xl">{team.name}</Heading>
        <Text>{team.details}</Text>
      </VStack>
    </Box>
  );
};

export default TeamDetail;
