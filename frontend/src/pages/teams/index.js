import { useEffect, useState } from 'react';
import { Box, Text, Button, Flex, useToast } from '@chakra-ui/react';
import Link from 'next/link';

function TeamsPage() {
    const [teams, setTeams] = useState([]);
    const toast = useToast();

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await fetch('http://localhost:3000/teams', {
                    credentials: 'include'
                });
                if (!response.ok) throw new Error('チームの読み込みに失敗しました。');
                const data = await response.json();
                setTeams(data);
            } catch (error) {
                toast({
                    title: 'エラー',
                    description: error.message,
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                });
            }
        };

        fetchTeams();
    }, []);

    return (
        <Box p={5}>
            <Flex justifyContent="space-between" alignItems="center" mb={5}>
                <Text fontSize="2xl">チーム一覧</Text>
                <Button colorScheme="blue">
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