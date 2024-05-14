import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Box, Button, VStack, Text, useToast, Center } from '@chakra-ui/react';
import EmailInput from '@/components/EmailInput';
import PasswordInput from '@/components/PasswordInput';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [touched, setTouched] = useState({ user_name: false, email: false, password: false });
    const toast = useToast();
    const router = useRouter();

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
                const response = await axios.post('http://localhost:3000/login', { email, password }, {
                headers: { 'Content-Type': 'application/json' },
                // withCredentials: true, // Cookieを送信するために必要
            });

            if (response.data.token) {
                localStorage.setItem('token', response.data.token);

                // コンソールにトークン保存の確認メッセージを出力
                console.log('Token saved to localStorage:', localStorage.getItem('token'));

                toast({
                    title: "Login Successful",
                    description: "You are now logged in.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });
                router.push('/teams/');
                setEmail('');
                setPassword('');
            } else {
                throw new Error('NO token received');
            }
        } catch (error) {
            toast({
                title: 'Login Failed',
                description: error.message,
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
        }
    };

    const handleBlur = (field) => setTouched({ ...touched, [field]: true });
    const toggleShowPassword = () => setShowPassword((prevState) => !prevState);
    const validateEmail = (email) => /^\S+@\S+\.\S+$/.test(email);

    return (
        <Center minHeight="100vh" bg="gray.100">
            <Box p={8} bg="white" boxShadow="2xl" borderRadius="xl" w="full" maxW="md">
                <VStack spacing={5} as="form" onSubmit={handleLogin}>
                    <Text fontSize="3xl" fontWeight="bold" color="teal.500">
                        ログイン
                    </Text>
                    <EmailInput {...{ email, setEmail, handleBlur, touched, validateEmail }} />
                    <PasswordInput {...{ password, setPassword, handleBlur, touched, showPassword, toggleShowPassword }} />
                    <Button type="submit" colorScheme="teal" w="full" size="lg">
                        ログイン
                    </Button>
                </VStack>
            </Box>
        </Center>
    );
}

export default LoginPage;