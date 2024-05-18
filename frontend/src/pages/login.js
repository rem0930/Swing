import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Box, Button, VStack, Text, useToast, Center } from '@chakra-ui/react';
import EmailInput from '../components/Input/EmailInput';
import PasswordInput from '../components/Input/PasswordInput';

function LoginPage() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [touched, setTouched] = useState({ email: false, password: false });
    const toast = useToast();
    const router = useRouter();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/sessions',
            { email: formData.email, password: formData.password },
            {
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
                setFormData({ email: '', password: '' });
            } else {
                throw new Error('No token received');
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
                    <EmailInput
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={() => handleBlur('email')}
                        touched={touched.email}
                        validateEmail={validateEmail}
                    />
                    <PasswordInput
                        value={formData.password}
                        onChange={handleChange}
                        onBlur={() => handleBlur('password')}
                        touched={touched.password}
                        showPassword={showPassword}
                        toggleShowPassword={toggleShowPassword}
                    />
                    <Button type="submit" colorScheme="teal" w="full" size="lg">
                        ログイン
                    </Button>
                </VStack>
            </Box>
        </Center>
    );
}

export default LoginPage;
