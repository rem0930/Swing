import React, { useState } from 'react';
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Button,
    VStack,
    InputGroup,
    InputRightElement,
    IconButton,
    useToast
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

function Signup() {
    const [user_name, setUser_name] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);  // ローディング状態の管理
    const toast = useToast('');

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        if (!user_name || !validateEmail(email) || password.length < 6) {
            toast({
                title: 'Error',
                description: "Please fill all fields correctly.",
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user: { user_name, email, password } }),
            });

            const data = await response.json(); // JSON レスポンスを取得
            if (response.ok) {
                toast({
                    title: '新規登録が完了しました！',
                    description: 'Swingへようこそ!',
                    status:'success',
                    duration: 9000,
                    isClosable: true,
                });
                setUser_name('')
                setEmail('')
                setPassword('')
            } else {
                throw new Error(data.message || '新規登録に失敗しました。');
            }
        } catch (error) {
            toast({
                title: '新規作成に失敗しました。',
                description: error.message,
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
        } finally {
            setIsLoading(false);
        }
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Flex height="100vh" alignItems="center" justifyContent="center">
            <Box width="full" maxWidth="500px" p={5} borderWidth={1} borderRadius={8} boxShadow="lg">
                <form onSubmit={handleSubmit}>
                    <VStack spacing={4}>
                        <FormControl isRequired>
                            <FormLabel>ユーザー名</FormLabel>
                            <Input
                            placeholder="ユーザー名を入力"
                            value={user_name}
                            onChange={(e) => setUser_name(e.target.value)}
                            />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>メールアドレス</FormLabel>
                            <Input
                            type="email"
                            placeholder="メールアドレスを入力"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            />
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel>パスワード</FormLabel>
                            <InputGroup>
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="パスワードを入力"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <InputRightElement>
                                    <IconButton
                                        icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                                        onClick={toggleShowPassword}
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                    />
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>

                        <Button
                            type="submit"
                            colorScheme="blue"
                            isLoading={isLoading}
                            loadingText="Submitting"
                        >
                            新規登録
                        </Button>
                    </VStack>
                </form>
            </Box>
        </Flex>
    );
}

export default Signup;