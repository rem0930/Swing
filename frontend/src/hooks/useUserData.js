import { useState, useEffect } from 'react';
import axios from 'axios';
import { useToast } from '@chakra-ui/react';

function useUserData(userId) {
    const [userData, setUserData] = useState({ name: '', email: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const toast = useToast();

    useEffect(() => {
        if (!userId) return;

        const token = localStorage.getItem('token'); // トークンを取得
        axios.get(`http://localhost:3000/users/${userId}`, {
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
    }, [userId, toast]);

    return { userData, loading, error };
}

export default useUserData;
