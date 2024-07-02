import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Box, Button, VStack, Text, useToast, Center, Divider, HStack, Link } from '@chakra-ui/react';
import EmailInput from '../components/Input/EmailInput';
import PasswordInput from '../components/Input/PasswordInput';
import { useUser } from '../context/UserContext';
import NextLink from 'next/link';

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

function LoginPage() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [touched, setTouched] = useState({ email: false, password: false });
    const toast = useToast();
    const router = useRouter();
    const { login } = useUser();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${apiUrl}/sessions`,
            { email: formData.email, password: formData.password },
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true, // Cookieを送信するために必要
            });
            if (response.data.token) {
                await login(response.data.token, response.data.user); // UserContextのlogin関数を使用

                toast({
                    title: "Login Successful",
                    description: "You are now logged in.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });
                router.push('/');
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

                <Divider my={6} />

                <VStack spacing={3}>
                    <Text>アカウントをお持ちでない方</Text>
                    <NextLink href="/signup" passHref>
                        <Button as="a" variant="outline" colorScheme="teal" w="full">
                            新規会員登録
                        </Button>
                    </NextLink>
                </VStack>

                <HStack justifyContent="center" mt={4}>
                    <NextLink href="/forgot-password" passHref>
                        <Link color="teal.500">パスワードをお忘れの方</Link>
                    </NextLink>
                </HStack>
            </Box>
        </Center>
    );
}

export default LoginPage;
