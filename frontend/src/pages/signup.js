import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {
    Flex, Box, FormControl, FormLabel, Input, Button, VStack, useToast, Text, Heading
} from '@chakra-ui/react';
import EmailInput from '@/components/EmailInput';
import PasswordInput from '@/components/PasswordInput';

function Signup() {
    const [user_name, setUser_name] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [touched, setTouched] = useState({ user_name: false, email: false, password: false });
    const [isLoading, setIsLoading] = useState(false);  // ローディング状態の管理
    const [errors, setErrors] = useState({});
    const toast = useToast();
    const router = useRouter();

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        // バリデーションロジックの改善
        let newErrors = {};
        if (!user_name) newErrors.user_name = 'ユーザー名を入力してください。';
        if (!validateEmail(email)) newErrors.email = 'メールアドレスを正しく入力してください。';
        if (password.length < 8) newErrors.password = 'パスワードは8文字以上で入力してください。';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
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
                    description: 'プロフィール画像を設定しよう!',
                    status:'success',
                    duration: 9000,
                    isClosable: true,
                });
                setUser_name('');
                setEmail('');
                setPassword('');
                setTouched({ user_name: false, email: false, password: false }); // フォームフィールドのtouched状態をリセット
                router.push('/ChooseProfilePicture');
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

    const toggleShowPassword = () => setShowPassword(!showPassword);

    const handleBlur = (field) => setTouched({ ...touched, [field]: true });

    return (
        <Flex height="100vh" alignItems="center" justifyContent="center" bg="gray.50">
            <Box p={8} width="full" maxWidth="500px" borderWidth={1} borderRadius={8} boxShadow="lg" bg="white">
                <Heading size="lg" color="teal.400" textAlign="center" mb={6}>新規登録</Heading>
                <form onSubmit={handleSubmit}>
                    <VStack spacing={4}>
                        {Object.keys(errors).map((key) => (
                            <Text key={key} color="red">{errors[key]}</Text>
                        ))}
                        <FormControl isRequired>
                            <FormLabel>ユーザー名</FormLabel>
                            <Input
                            placeholder="ユーザー名を入力"
                            value={user_name}
                            onChange={(e) => setUser_name(e.target.value)}
                            onBlur={() => handleBlur('user_name')}
                            />
                            {touched.user_name && user_name === '' && <Text color="red">ユーザー名を入力してください。</Text>}
                        </FormControl>
                        <EmailInput {...{ email, setEmail, handleBlur, touched, validateEmail }} />
                        <PasswordInput {...{ password, setPassword, handleBlur, touched, showPassword, toggleShowPassword }} />
                        <Button
                            type="submit"
                            colorScheme="teal"
                            isLoading={isLoading}
                            loadingText="Submitting"
                        >
                            同意してメールアドレスを送信
                        </Button>
                    </VStack>
                </form>
            </Box>
        </Flex>
    );
}

export default Signup;