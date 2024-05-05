import React, { useState } from 'react';
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Button,
    Image,
    VStack,
    useToast,
    Heading
} from '@chakra-ui/react';

function ProfileSetup() {
    const [profileImage, setProfileImage] = useState(null);
    const [backgroundImage, setBackgroundImage] = useState(null);
    const [bio, setBio] = useState('');
    const toast = useToast();

    const handleImageChange = (e, setImage) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('profile_photo', profileImage);
        formData.append('background_photo', backgroundImage);
        formData.append('bio', bio);

        try {
            const response = await fetch('http://localhost:3000/signup', {
                method: 'POST',
                body: formData,
            });
            if (response.ok) {
                const data = await response.json();
                toast({
                    title: 'プロフィール更新完了',
                    description: 'プロフィールが更新されました。',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
            } else {
                throw new Error('プロフィール更新に失敗しました。');
            }
        } catch (error) {
            toast({
                title: '画像のアップロードに失敗しました。',
                description: error.message,
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
        }
    };

    const skipSetup = () => {
        // Redirect user to another page or close modal
    };

    return (
        <Flex direction="column" align="center" justify="center" padding={6}>
            <Heading mb={6}>プロフィール設定</Heading>
            <VStack spacing={4}>
                <Box>
                    <FormControl>
                        <FormLabel>プロフィール画像</FormLabel>
                        <Input type="file" accept="image/*" onChange={(e) => handleImageChange(e, setProfileImage)} />
                        {profileImage && <Image src={profileImage} boxSize="100px" />}
                    </FormControl>
                </Box>
                <Box>
                    <FormControl>
                        <FormLabel>背景画像</FormLabel>
                        <Input type="file" accept="image/*" onChange={(e) => handleImageChange(e, setBackgroundImage)} />
                        {backgroundImage && <Image src={backgroundImage} boxSize="100px" />}
                    </FormControl>
                </Box>
                <Box>
                    <FormControl>
                        <FormLabel>自己紹介</FormLabel>
                        <Textarea value={bio} onChange={(e) => setBio(e.target.value)} />
                    </FormControl>
                </Box>
                <Button colorScheme="blue" onClick={handleSubmit}>保存</Button>
                <Button colorScheme="gray" onClick={skipSetup}>スキップ</Button>
            </VStack>
        </Flex>
    );
}

export default ProfileSetup;