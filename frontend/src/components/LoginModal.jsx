import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  VStack,
  Text,
  useToast,
  Divider,
  HStack,
  Link,
} from '@chakra-ui/react';
import EmailInput from '../components/Input/EmailInput';
import PasswordInput from '../components/Input/PasswordInput';
import { useUser } from '../context/UserContext';
import NextLink from 'next/link';

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const LoginModal = forwardRef(({ openSignupModal }, ref) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState({ email: false, password: false });
  const toast = useToast();
  const router = useRouter();
  const { login } = useUser();

  useImperativeHandle(ref, () => ({
    onOpen
  }));

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
          headers: { 'Content-Type': 'application/json' }
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
        setFormData({ email: '', password: '' });
        onClose(); // モーダルを閉じる
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
    <>
      <Button onClick={onOpen}>ログイン</Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay bg="blackAlpha.800" />
        <ModalContent>
          <ModalHeader textAlign="center">ログイン</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={5} as="form" onSubmit={handleLogin}>
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
              <Button variant="outline" colorScheme="teal" w="full" onClick={() => {
                onClose();
                openSignupModal();
              }}>
                新規会員登録
              </Button>
            </VStack>
            <HStack justifyContent="center" mt={4}>
              <NextLink href="/forgot-password" passHref>
                <Link color="teal.500" onClick={onClose}>パスワードをお忘れの方</Link>
              </NextLink>
            </HStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
});

export default LoginModal;
