import React, { useState, useEffect } from "react";
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    useToast,
    VStack
} from '@chakra-ui/react';
import { useRouter } from 'next/router';

function EditUserProfile() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const toast = useToast();
    const router = useRouter();
    const { userId } = router.query;

     // ユーザーデータのロード
    useEffect(() => {
        if (userId) {
            fetch(`http://localhost:3000/users/${userId}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include' // Cookieを含める
            })
            .then(response => response.json())
            .then(data => {
                setName(data.name || '');
                setEmail(data.email || '');
            })
            .catch(error => {
                toast({
                    title: 'プロフィールの読み込みに失敗しました',
                    description: error.toString(),
                    status: 'error',
                    duration: 5000,
                    isClosable: true
                });
            });
        }
    }, [userId]);

    // フォームの送信処理
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`http://localhost:3000/users/${userId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email }),
                credentials: 'include' // cookies
            });
            if (!response.ok) throw new Error('Profile update failed.');
            toast({
                title: 'プロフィール更新完了',
                description: 'プロフィールが更新されました。',
                status:'success',
                duration: 5000,
                isClosable: true
            });
            router.push('/'); // 成功時のリダイレクト先
        } catch (error) {
            toast({
                title: 'プロフィール更新に失敗しました',
                description: error.toString(),
                status: 'error',
                duration: 9000,
                isClosable: true
            });
        }
    };

    return (
        <Box p={8} maxWidth="500px" borderWidth="1px" borderRadius="lg" boxShadow="lg">
            <VStack spacing={4} as="form" onSubmit={handleSubmit}>
                <FormControl isRequired>
                    <FormLabel htmlFor='name'>Name</FormLabel>
                    <Input id='name' type='text' value={name} onChange={(e) => setName(e.target.value)} />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel htmlFor='email'>Email</FormLabel>
                    <Input id='email' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                </FormControl>
                <Button mt={4} width="full" type="submit" colorScheme="teal">
                    Update Profile
                </Button>
            </VStack>
        </Box>
    );
}

export default EditUserProfile;