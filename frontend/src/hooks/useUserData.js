import { useState, useEffect } from 'react';
import axios from 'axios';
import { useToast } from '@chakra-ui/react';
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

function useUserData(id) {
    const [userData, setUserData] = useState({ name: '', email: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const toast = useToast();

    useEffect(() => {
        if (!id) return;

        const token = localStorage.getItem('token'); // トークンを取得
        axios.get(`${apiUrl}/users/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            setUserData({ name: response.data.name, email: response.data.email });
            setLoading(false);
        })
        .catch(error => {
            setError(error.toString());
            toast({
                title: 'プロフィールの読み込みに失敗しました',
                description: error.toString(),
                status: 'error',
                duration: 5000,
                isClosable: true
            });
            setLoading(false);
        });
    }, [id, toast]);

    return { userData, loading, error };
}

export default useUserData;
