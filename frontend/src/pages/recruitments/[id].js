import { Box,  Text, HStack, Icon, Container, Spinner } from '@chakra-ui/react';
import { FiMapPin, FiCalendar, FiClock } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import RecruitmentHeader from '../../components/RecruitmentDetails/RecruitmentHeader';
import RecruitmentFooter from '../../components/RecruitmentDetails/RecruitmentFooter';
import Layout from '../../components/Layout.jsx';
import axios from 'axios';

const RecruitmentDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [recruitment, setRecruitment] = useState(null);
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:3000/recruitments/${id}`)
        .then(response => {
          setRecruitment(response.data);
          return axios.get(`http://localhost:3000/teams/${response.data.team_id}`);
        })
        .then(response => {
          setTeam(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error("There was an error fetching the recruitment or team data!", error);
          setError("募集またはチームデータの取得中にエラーが発生しました。");
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
          <Spinner size="xl" />
        </Box>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
          <Text color="red.500">{error}</Text>
        </Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Box position="relative" minHeight="100vh">
        <Box position="sticky" top="0" zIndex="999" bg="white" boxShadow="sm">
          <RecruitmentHeader 
            team={team} 
            title={recruitment.title} 
            profilePhoto={team.profile_photo_url || null}
          />
        </Box>
        <Container maxW="container.lg" py={8} pb="80px">
          <Box mt={8}>
            <Text mb={4}>{recruitment.description}</Text>
            
            <HStack mt="3">
              <Icon as={FiMapPin} />
              <Text>{recruitment.location_id}</Text>
            </HStack>
            
            <HStack mt="3" spacing="4">
              <Icon as={FiCalendar} />
              <Text>イベント日: {new Date(recruitment.event_date).toLocaleDateString()}</Text>
            </HStack>
            
            <HStack mt="3" spacing="4">
              <Icon as={FiClock} />
              <Text>締切日: {new Date(recruitment.deadline).toLocaleDateString()}</Text>
            </HStack>
          </Box>
        </Container>
        <Box position="fixed" bottom="0" width="100%" bg="white" boxShadow="sm" py={2}>
          <RecruitmentFooter eventDate={recruitment.event_date} onApply={() => console.log('Applying...')} />
        </Box>
      </Box>
    </Layout>
  );
};

export default RecruitmentDetail;