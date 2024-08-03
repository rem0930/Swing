import { Box, Container, Spinner, Flex, Text } from '@chakra-ui/react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import TeamProfile from '../../../components/Team/TeamProfile';
import TeamRecruitments from '../../../components/Team/TeamRecruitments';
import Layout from '../../../components/Layouts/Layout';
import CreateRecruitmentButton from '../../../components/CreateRecruitmentButton';
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

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
          const teamResponse = await axios.get(`${apiUrl}/teams/${id}`);
          setTeam(teamResponse.data);

          const recruitmentsResponse = await axios.get(`${apiUrl}/recruitments/by_team/${id}`);
          setRecruitments(recruitmentsResponse.data);
        } catch (error) {
          console.error("チームまたは募集情報の取得中にエラーが発生しました！", error);
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
          <Box flex={{ base: '1', md: '0.4' }}>
            <TeamProfile team={team} />
          </Box>
          <Box flex={{ base: '1', md: '0.6' }}>
            <TeamRecruitments recruitments={recruitments} />
          </Box>
        </Flex>
      </Container>
      <CreateRecruitmentButton />
    </Layout>
  );
};

export default TeamDetail;