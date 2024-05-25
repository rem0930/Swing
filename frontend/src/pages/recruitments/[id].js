import { Box, Text, HStack, Icon, Container, Spinner, useToast } from '@chakra-ui/react';
import { FiMapPin, FiClock } from 'react-icons/fi';
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
  const [isOwnTeam, setIsOwnTeam] = useState(false);
  const [isApplied, setIsApplied] = useState(false);
  const toast = useToast();

  useEffect(() => {
    if (id) {
      const token = localStorage.getItem('token');
      axios.get(`http://localhost:3000/recruitments/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
        .then(response => {
          setRecruitment(response.data.recruitment);
          setIsOwnTeam(response.data.is_user_team);
          return response.data.recruitment.team_id;
        })
        .then(teamId => {
          if (teamId) {
            const token = localStorage.getItem('token');
            return axios.get(`http://localhost:3000/teams/${teamId}`, {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
            });
          } else {
            throw new Error('Team ID is undefined');
          }
        })
        .then(response => {
          setTeam(response.data);
          const token = localStorage.getItem('token');
          return axios.get(`http://localhost:3000/applications/check?recruitment_id=${id}`, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          });
        })
        .then(response => {
          setIsApplied(response.data.is_applied);
          setLoading(false);
        })
        .catch(error => {
          console.error("There was an error fetching the recruitment or team data!", error);
          setError("募集またはチームデータの取得中にエラーが発生しました。");
          setLoading(false);
        });
    }
  }, [id]);

  const handleApply = () => {
    const token = localStorage.getItem('token');
    axios.post(`http://localhost:3000/applications`, { recruitment_id: id }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    .then(() => {
      setIsApplied(true);
      toast({
        title: '応募が完了しました！',
        status:'success',
        duration: 3000,
        isClosable: true,
      });
    })
    .catch(error => {
      console.error("There was an error applying for the recruitment!", error);
      toast({
        title: '応募中にエラーが発生しました。',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    });
  };

  const handleCloseRecruitment = () => {
    const token = localStorage.getItem('token');
    axios.patch(`http://localhost:3000/recruitments/${id}/close`, {}, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      setRecruitment(response.data);
      toast({
        title: '募集を締め切りました。',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    })
    .catch(error => {
      console.error("There was an error closing the recruitment!", error);
      toast({
        title: '募集を締め切る際にエラーが発生しました。',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    });
  };

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
      <Box position="relative" minHeight="100vh" pb="80px" bg="gray.50"> {/* 背景色を少し暗く */}
        <Box position="sticky" top="0" zIndex="999" bg="white" boxShadow="sm">
          <RecruitmentHeader 
            team={team} 
            title={recruitment.title} 
            profilePhoto={team.profile_photo_url || null}
          />
        </Box>
        <Container maxW="container.lg" py={8} bg="gray.50"> {/* 背景色を少し暗く */}
          <Box mt={8}>
            <Text mb={4}>{recruitment.description}</Text>
            
            <HStack mt="3">
              <Icon as={FiMapPin} />
              <Text>{recruitment.location_id}</Text>
            </HStack>
            
            <HStack mt="3" spacing="4">
              <Icon as={FiClock} />
              <Text>締切日: {new Date(recruitment.deadline).toLocaleDateString()}</Text>
            </HStack>
          </Box>
        </Container>
        <RecruitmentFooter 
          eventDate={recruitment.event_date} 
          onApply={isOwnTeam ? handleCloseRecruitment : handleApply} 
          isOwnTeam={isOwnTeam}
          isApplied={isApplied}
          status={recruitment.status}
          title={recruitment.title}
          recruitmentId={recruitment.id}
        />
      </Box>
    </Layout>
  );
};

export default RecruitmentDetail;
