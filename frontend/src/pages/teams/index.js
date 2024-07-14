import { useEffect, useState } from 'react';
import { Box, Text, Button, Flex, useToast } from '@chakra-ui/react';
import Link from 'next/link';
import axios from 'axios';
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

function TeamsPage() {
    const [teams, setTeams] = useState([]);
    const toast = useToast();

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                // const token = localStorage.getItem('token');
                const response = await axios.get(`${apiUrl}/teams`, {
                    headers: {
                        'Content-Type': 'application/json',
                        // 'Authorization': `Bearer ${token}`  // トークンを添付
                    }
                });
                setTeams(response.data);
            } catch (error) {
                toast({
                    title: 'エラー',
                    description: error.response?.data?.message || 'チームの読み込みに失敗しました。',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                });
            }
        };

        fetchTeams();
    }, [toast]);

    return (
        <Box p={5}>
            <Flex justifyContent="space-between" alignItems="center" mb={5}>
                <Text fontSize="2xl">チーム一覧</Text>
                <Button colorScheme="teal">
                    <Link href="/teams/create">新しいチームを作成</Link>
                </Button>
            </Flex>
            {teams.map(team => (
                <Box key={team.id} p={5} shadow="md" borderWidth="1px">
                    <Text fontSize="xl">{team.name}</Text>
                    <Text mt={4}>{team.details}</Text>
                    <Button mt={4} colorScheme="teal">
                        <Link href={`/teams/${team.id}`}>詳細を見る</Link>
                    </Button>
                </Box>
            ))}
        </Box>
    );
}

export default TeamsPage;