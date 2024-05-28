import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, Button, FormControl, FormLabel, Input, useToast } from '@chakra-ui/react';
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

function EditTeam() {
    const [team, setTeam] = useState({ name: '', details: '' });
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const toast = useToast();
    const { id } = router.query;

    useEffect(() => {
        // チームデータを取得
        const fetchTeam = async () => {
            const res = await fetch(`${apiUrl}/teams/${id}`);
            const data = await res.json();
            setTeam(data);
        };
        if (id) {
            fetchTeam();
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTeam(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/teams/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(team),
                credentials: 'include'
            });
            if (res.ok) {
                toast({
                    title: 'チーム情報が更新されました。',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
                router.push(`/teams/${id}`);
            } else {
                throw new Error('情報の更新に失敗しました。');
            }
        } catch (error) {
            toast({
                title: 'エラー',
                description: error.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box p={4}>
            <form onSubmit={handleSubmit}>
                <FormControl isRequired>
                    <FormLabel>チーム名</FormLabel>
                    <Input name="name" value={team.name} onChange={handleChange} />
                </FormControl>
                <FormControl mt={4}>
                    <FormLabel>詳細</FormLabel>
                    <Input name="details" value={team.details} onChange={handleChange} />
                </FormControl>
                <Button mt={4} colorScheme="teal" isLoading={loading} type="submit">
                    保存
                </Button>
            </form>
        </Box>
    );
}

export default EditTeam;
