import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Box, Flex, Text, Image, Button } from '@chakra-ui/react';

function TeamDetail() {
    const router = useRouter();
    const { teamId } = router.query;
    const [team, setTeam] = useState(null);

    useEffect(() => {
        if (teamId) {
            fetch('http://localhost:3000/teams/${teamId}', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include'
            })
                .then(response => response.json())
                .then(data => setTeam(data))
                .catch(error => console.error('Error fetching tams:', error));
        }
    }, [teamId]);

    return (
        <Flex direction="column" p={5} shadow="md" borderWidth="1px">
            <Box p={4} display="flex" alignItems="center">
                <Image borderRadius="full" boxSize="150px" src={team?.profile_photo} alt="Profile Photo" />
                <Box ml="3">
                    <Text fontWeight="bold">
                        {team?.name}
                        <Button ml={4} onClick={() => router.push(`/teams/edit/${team?.id}`)}>Edit</Button>
                    </Text>
                    <Text fontSize="sm">{team?.details}</Text>
                </Box>
            </Box>
        </Flex>
    );
}

export default TeamDetail;