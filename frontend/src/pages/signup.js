import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import {
  Box,
  Button,
  Heading,
  VStack,
  useToast,
  Center,
} from '@chakra-ui/react';
import EmailInput from '../components/Input/EmailInput';
import PasswordInput from '../components/Input/PasswordInput';
import NameInput from '../components/Input/NameInput';
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function SignupPage() {
  const [formData, setFormData] = useState({
    user_name: '',
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState({ user_name: false, email: false, password: false });
  const toast = useToast();
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${apiUrl}/registrations`,
        { user: { user_name: formData.user_name, email: formData.email, password: formData.password } },
        {
          headers: { 'Content-Type': 'application/json' },
          // withCredentials: true, // Cookieを送信するために必要
        },
      );

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);

        // デバック用
        console.log('Token saved to localStorage:', localStorage.getItem('token'));

        toast({
          title: 'アカウント作成成功',
          description: 'サインアップに成功しました。',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        router.push('/teams'); // サインアップ成功後にログインページへリダイレクト
        setFormData({ user_name: '', email: '', password: '' });
      } else {
        throw new Error('No token received');
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.errors?.join(', ') || 'サインアップに失敗しました。';
      toast({
        title: 'アカウント作成失敗',
        description: errorMessage,
        status: 'error',
        duration: 5000,
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
        <VStack spacing={5} as="form" onSubmit={handleSubmit}>
          <Heading fontSize="3xl" fontWeight="bold" color="teal.500">
            会員登録
          </Heading>
          <NameInput
            value={formData.user_name}
            onChange={handleChange}
            onBlur={() => handleBlur('user_name')}
            touched={touched.user_name}
          />
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
            次へ
          </Button>
        </VStack>
      </Box>
    </Center>
  );
}
