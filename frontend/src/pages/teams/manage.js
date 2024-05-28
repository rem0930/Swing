import { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Spinner, Box } from '@chakra-ui/react';
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const ManagePage = () => {
  const router = useRouter();

  useEffect(() => {
    const checkTeam = async () => {
      try {
        const response = await axios.get(`${apiUrl}/has_team`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const { has_team, team_id } = response.data;
        if (has_team) {
          router.push(`/teams/${team_id}`);
        } else {
          router.push('/teams/create');
        }
      } catch (error) {
        console.error('Error checking team:', error);
        // エラーハンドリング（必要に応じてエラーページにリダイレクトなど）
      }
    };

    checkTeam();
  }, [router]);

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Spinner size="xl" />
    </Box>
  );
};

export default ManagePage;
