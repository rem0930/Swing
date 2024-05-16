import { Box, Container, Text, Heading, VStack, ButtonGroup, Button } from '@chakra-ui/react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import TeamDetailHeader from '../../../components/TeamDetailHeader';
import RecruitmentCard from '../../../components/RecruitmentCard'; // 再利用可能なコンポーネントとして作成

const TeamDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [team, setTeam] = useState(null);
  const [recruitments, setRecruitments] = useState([]);
  const [filteredRecruitments, setFilteredRecruitments] = useState([]);
  const [selectedRole, setSelectedRole] = useState('member');

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:3000/teams/${id}`)
        .then(response => {
          setTeam(response.data);
          return axios.get(`http://localhost:3000/recruitments?team_id=${id}`);
        })
        .then(response => {
          const teamRecruitments = response.data.filter(r => r.team_id === parseInt(id));
          setRecruitments(teamRecruitments);
          setFilteredRecruitments(response.data.filter(r => r.role === 'member'));
        })
        .catch(error => {
          console.error("There was an error fetching the team or recruitments data!", error);
        });
    }
  }, [id]);

  const handleRoleChange = (role) => {
    setSelectedRole(role);
    setFilteredRecruitments(recruitments.filter(r => r.role === role));
  };

  if (!team) {
    return <p>Loading...</p>;
  }

  return (
    <Container maxW="container.lg" py={8}>
      <TeamDetailHeader team={team} />
      <Box mt={8}>
        <Heading size="md" mb={4}>Details</Heading>
        <Text>{team.details}</Text>
      </Box>
      
      <Box mt={8}>
        <Heading size="md" mb={4}>Recruitments</Heading>
        <ButtonGroup mb={4} spacing={4}>
          <Button colorScheme={selectedRole === 'member' ? 'teal' : 'gray'} onClick={() => handleRoleChange('member')}>
            Member
          </Button>
          <Button colorScheme={selectedRole === 'opponent' ? 'teal' : 'gray'} onClick={() => handleRoleChange('opponent')}>
            Opponent
          </Button>
          <Button colorScheme={selectedRole === 'helper' ? 'teal' : 'gray'} onClick={() => handleRoleChange('helper')}>
            Helper
          </Button>
        </ButtonGroup>
        
        <VStack spacing={4} align="stretch">
          {filteredRecruitments.map(recruitment => (
            <RecruitmentCard key={recruitment.id} recruitment={recruitment} />
          ))}
        </VStack>
      </Box>
    </Container>
  );
};

export default TeamDetail;
