import { Box,  Text, HStack, Icon, Container } from '@chakra-ui/react';
import { FiMapPin, FiCalendar, FiClock } from 'react-icons/fi';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import RecruitmentHeader from '../../components/RecruitmentDetails/RecruitmentHeader';
import RecruitmentFooter from '../../components/RecruitmentDetails/RecruitmentFooter';

const RecruitmentDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [recruitment, setRecruitment] = useState(null);
  const [team, setTeam] = useState(null);

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:3000/recruitments/${id}`)
        .then(response => {
          setRecruitment(response.data);
          return axios.get(`http://localhost:3000/teams/${response.data.team_id}`);
        })
        .then(response => {
          setTeam(response.data);
        })
        .catch(error => {
          console.error("There was an error fetching the recruitment or team data!", error);
        });
    }
  }, [id]);

  if (!recruitment || !team) {
    return <p>Loading...</p>;
  }

  return (
    <Container maxW="container.lg" py={8} position="relative">
      <RecruitmentHeader 
        team={team} 
        title={recruitment.title} 
        profilePhoto={team.profile_photo_url || null}
      />
      <Box mt={8}>
        <Text mb={4}>{recruitment.description}</Text>
        
        <HStack mt="3">
          <Icon as={FiMapPin} />
          <Text>{recruitment.location_id}</Text>
        </HStack>
        
        <HStack mt="3" spacing="4">
          <Icon as={FiCalendar} />
          <Text>Event Date: {new Date(recruitment.event_date).toLocaleDateString()}</Text>
        </HStack>
        
        <HStack mt="3" spacing="4">
          <Icon as={FiClock} />
          <Text>Deadline: {new Date(recruitment.deadline).toLocaleDateString()}</Text>
        </HStack>
      </Box>
      
      <RecruitmentFooter eventDate={recruitment.event_date} onApply={() => console.log('Applying...')} />
    </Container>
  );
};

export default RecruitmentDetail;
