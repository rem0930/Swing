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
import NameInput from '../components/Input/NameInput';
import { useUser } from '../context/UserContext';
import NextLink from 'next/link';

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const SignupModal = forwardRef(({ openLoginModal }, ref) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState({
    user_name: '',
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState({ user_name: false, email: false, password: false });
  const [isLoading, setIsLoading] = useState(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${apiUrl}/registrations`,
        { user: { user_name: formData.user_name, email: formData.email, password: formData.password } },
        {
          headers: { 'Content-Type': 'application/json' }
        }
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
        onClose(); // モーダルを閉じる
        setFormData({ user_name: '', email: '', password: '' });
        router.push('/ChooseProfilePicture');
      } else {
        throw new Error('No token received');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.errors?.join(', ') || 'サインアップに失敗しました。';
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

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay bg="blackAlpha.800" />
        <ModalContent>
          <ModalHeader textAlign="center">登録する</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={5} as="form" onSubmit={handleSubmit}>
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
              <Button type="submit" colorScheme="teal" w="full" size="lg" isLoading={isLoading} loadingText="登録中...">
                登録する
              </Button>
            </VStack>
            <Divider my={6} />
            <VStack spacing={3}>
              <Text>すでにアカウントをお持ちの方</Text>
              <Button variant="outline" colorScheme="teal" w="full" onClick={() => {
                onClose();
                openLoginModal();
              }}>
                ログイン
              </Button>
            </VStack>
            <HStack justifyContent="center" mt={4}>
              <NextLink href="/terms" passHref>
                <Link color="teal.500" onClick={onClose}>利用規約</Link>
              </NextLink>
              <Text>・</Text>
              <NextLink href="/privacy" passHref>
                <Link color="teal.500" onClick={onClose}>プライバシーポリシー</Link>
              </NextLink>
            </HStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
});

SignupModal.displayName = 'SignupModal';

export default SignupModal;
