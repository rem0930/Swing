import React, { useState } from 'react';
import {
    useColorModeValue,
    useToast
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import axios from 'axios';
import CreateTeamForm from '../../components/Team/CreateTeamForm';

function CreateTeam() {
    const [name, setName] = useState('');
    const [details, setDetails] = useState('');
    const formBackgroundColor = useColorModeValue('gray.100', 'gray.700');
    const textColor = useColorModeValue('gray.800', 'white');
    const toast = useToast();
    const router = useRouter();
    // const { authAxios } = useAuthRequest();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token'); // ここでトークンを取得

        if (!token) {
            // トークンがない場合の処理
            toast({
                title: '認証エラー',
                description: 'ログインしてください。',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
            return;
        }

        const teamData = {
            name: name,
            details: details
        };

        try {
            const response = await axios.post(
                'http://localhost:3000/teams',
                teamData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response.status === 201) {
                toast({
                    title: 'success',
                    description:'チームの作成に成功しました！',
                    duration: 5000,
                    isClosable: true,
                });
                router.push('/teams');
            }
        } catch (error) {
                toast({
                    title: 'チームの作成に失敗しました',
                    description: error.message,
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                });
        }
    };

    return (
        <>
            <CreateTeamForm />
        </>
    );
}

export default CreateTeam;