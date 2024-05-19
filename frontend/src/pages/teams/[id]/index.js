import { Box, Container, Spinner, Flex } from '@chakra-ui/react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import TeamProfile from '../../../components/Team/TeamProfile';
import TeamRecruitments from '../../../components/Team/TeamRecruitments';
import Layout from '../../../components/Layout';

const TeamDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [team, setTeam] = useState(null);
  const [recruitments, setRecruitments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchTeamData = async () => {
        try {
          const teamResponse = await axios.get(`http://localhost:3000/teams/${id}`);
          setTeam(teamResponse.data);

          const recruitmentsResponse = await axios.get(`http://localhost:3000/recruitments?team_id=${id}`);
          const teamRecruitments = recruitmentsResponse.data.filter(r => r.team_id === parseInt(id));
          setRecruitments(teamRecruitments);
        } catch (error) {
          console.error("There was an error fetching the team or recruitments data!", error);
        } finally {
          setLoading(false);
        }
      };

      fetchTeamData();
    }
  }, [id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Spinner size="xl" />
      </Box>
    );
  }

  if (!team) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Text color="red.500">チーム情報が見つかりません</Text>
      </Box>
    );
  }

  return (
    <Layout>
      <Container maxW="container.lg" py={8}>
        <Flex direction={{ base: 'column', md: 'row' }} gap={6}>
          <Box flex={{ base: '1', md: '0.3' }}>
            <TeamProfile team={team} />
          </Box>
          <Box flex={{ base: '1', md: '0.7' }}>
            <TeamRecruitments recruitments={recruitments} />
          </Box>
        </Flex>
      </Container>
    </Layout>
  );
};

export default TeamDetail;
