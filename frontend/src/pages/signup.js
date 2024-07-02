import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import {
  Box,
  Button,
  Heading,
  VStack,
  useToast,
  Center,
  Text,
  Link,
  Divider,
  HStack,
} from '@chakra-ui/react';
import NextLink from 'next/link';
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
  const [isLoading, setIsLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${apiUrl}/registrations`,
        { user: { user_name: formData.user_name, email: formData.email, password: formData.password } },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        },
      );

      if (response.data.token) {
        if (typeof window !== 'undefined') {
          localStorage.setItem('token', response.data.token);
        }
        toast({
          title: 'アカウント作成成功',
          description: 'アカウントの作成に成功しました。',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        router.push('/ChooseProfilePicture');
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
    } finally {
      setIsLoading(false);
    }
  };

  const handleBlur = (field) => setTouched({ ...touched, [field]: true });
  const toggleShowPassword = () => setShowPassword((prevState) => !prevState);
  const validateEmail = (email) => /^\S+@\S+\.\S+$/.test(email);

  if (!isClient) {
    return null; // または適切なローディング表示
  }

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
          <Button 
            type="submit" 
            colorScheme="teal" 
            w="full" 
            size="lg"
            isLoading={isLoading}
            loadingText="登録中..."
          >
            登録する
          </Button>
        </VStack>

        <Divider my={6} />

        <VStack spacing={3}>
          <Text>すでにアカウントをお持ちの方</Text>
          <NextLink href="/login" passHref>
            <Button as="a" variant="outline" colorScheme="teal" w="full">
              ログイン
            </Button>
          </NextLink>
        </VStack>

        <HStack justifyContent="center" mt={4}>
          <NextLink href="/terms" passHref>
            <Link color="teal.500">利用規約</Link>
          </NextLink>
          <Text>・</Text>
          <NextLink href="/privacy" passHref>
            <Link color="teal.500">プライバシーポリシー</Link>
          </NextLink>
        </HStack>
      </Box>
    </Center>
  );
}