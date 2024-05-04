import React, { useState } from 'react';
import {
    Button, FormControl, FormLabel, Input, InputGroup,
    useToast, Textarea, VStack, Spinner
} from '@chakra-ui/react';
import Password from '../components/Password';
import ImageUpload from '../components/ImageUpload';
import LocationForms from '../components/LocationForms';

function Signup() {
    const [user_name, setUser_name] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [profile_photo, setProfilePhoto] = useState('');
    const [background_photo, setBackgroundPhoto] = useState('');
    const [bio, setBio] = useState('');
    const [isLoading, setIsLoading] = useState(false);  // ローディング状態の管理
    const toast = useToast('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);  // ローディング開始
        try {
            const response = await fetch('http://localhost:3000/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user: {
                        user_name,
                        email,
                        password,
                        profile_photo,
                        background_photo,
                        bio
                    }
                }),
            });

            const data = await response.json(); // JSON レスポンスを取得
            if (!response.ok) {
                throw new Error(data.message || '新規登録に失敗しました。');
            }
            // Signup success login here
            toast({
                title: '新規登録が完了しました！',
                description: 'Swingへようこそ!',
                status:'success',
                duration: 9000,
                isClosable: true,
            });

            // 成功後フォームフィールドをクリア
            setUser_name('');
            setEmail('');
            setPassword('');
            setProfilePhoto('');
            setBackgroundPhoto('');
            setBio('');
        } catch (error) {
            toast({
                title: '新規作成に失敗しました。',
                description: error.message,
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
        }
        setIsLoading(false);  // ローディング終了
    };

    return (
        <form onSubmit={handleSubmit}>
            {isLoading && <Spinner />}
            <VStack spacing={4}>
                <FormControl id="username" isRequired>
                    <FormLabel>ユーザー名</FormLabel>
                    <Input type="text" value={user_name} onChange={(e) => setUser_name(e.target.value)} />
                </FormControl>

                <FormControl id='email' isRequired>
                    <FormLabel>メールアドレス</FormLabel>
                    <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </FormControl>

                <FormControl id='password' isRequired>
                    <FormLabel>パスワード</FormLabel>
                    <InputGroup>
                        <Password value={password} onChange={(e) => setPassword(e.target.value)} />
                    </InputGroup>
                </FormControl>

                {/* <LocationForms /> */}

                <ImageUpload
                    label="プロフィール写真"
                    onChange={setProfilePhoto}
                    previewUrl={profile_photo}
                    alt="Profile Photo Preview"
                    size={{ width: "400px", height: "400px" }}
                />
                <ImageUpload
                    label="背景写真"
                    onChange={setBackgroundPhoto}
                    previewUrl={background_photo}
                    alt="Background Photo Preview"
                    size={{ width: "1500px", height: "500px" }}
                />
                <FormControl id='bio'>
                    <FormLabel>自己紹介</FormLabel>
                    <Textarea value={bio} onChange={(e) => setBio(e.target.value)} />
                </FormControl>
                <Button mt={4} colorScheme="blue" type="submit" isLoading={isLoading}>新規登録</Button>
            </VStack>
        </form>
    );
}

export default Signup;