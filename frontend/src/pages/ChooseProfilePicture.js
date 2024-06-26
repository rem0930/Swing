import React, { useState, useEffect } from 'react';
import { Box, Text, Button, VStack, useToast, Input, Center, Icon, Img, useDisclosure, Slide, Alert, AlertIcon, AlertTitle, AlertDescription, CloseButton } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { FiCamera } from 'react-icons/fi';
import axios from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

function ChooseProfilePicture() {
    const [profileImage, setProfileImage] = useState(null);
    const [profileImageFile, setProfileImageFile] = useState(null);
    const toast = useToast();
    const router = useRouter();
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        // 新規登録後にポップアップを表示する
        const showPopup = true; // 新規登録後にこの値を true に設定
        if (showPopup) {
            onOpen();
            setTimeout(onClose, 10000); // 10秒後に自動的にポップアップを閉じる
        }
    }, [onOpen, onClose]);

    const handleProfileImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUpload = async () => {
        if (!profileImageFile) return;

        const formData = new FormData();
        formData.append('profile_photo', profileImageFile);

        try {
            const response = await axios.patch(`${apiUrl}/users/update_profile_photo`, formData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            toast({
                title: '更新完了',
                description: 'プロフィール画像が更新されました。',
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
            onClose(); // アップロード成功後にポップアップを閉じる
            router.push('/'); // アップロード後にリダイレクト
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

    return (
        <Center minHeight="100vh" padding={5} bg="gray.100">
            <VStack spacing={5} maxWidth="500px" w="full" p={8} bg="white" borderRadius="lg" boxShadow="2xl">
                <Text fontSize="2xl" fontWeight="bold" color="teal.500" textAlign="center">プロフィール画像を設定！</Text>
                <Box position="relative" w="150px" h="150px" borderRadius="full" overflow="hidden" bg="teal.500">
                    {profileImage ? (
                        <Img src={profileImage} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
                    ) : (
                        <Center w="full" h="full">
                            <Icon as={FiCamera} w={8} h={8} color="white" />
                        </Center>
                    )}
                    <Input
                        type="file"
                        accept="image/*"
                        onChange={handleProfileImageChange}
                        position="absolute"
                        top="0"
                        left="0"
                        w="full"
                        h="full"
                        opacity="0"
                        cursor="pointer"
                    />
                </Box>
                <Button colorScheme="teal" onClick={handleUpload} isDisabled={!profileImageFile} w="65%">画像をアップロード</Button>
                <Button colorScheme="gray" onClick={() => router.push('/')} w="65%">あとで設定する</Button>
            </VStack>

            {/* ポップアップメッセージ */}
            <Slide direction="top" in={isOpen} style={{ zIndex: 10 }}>
                <Alert status="info" variant="subtle">
                    <AlertIcon />
                    <Box flex="1">
                        <AlertTitle>プロフィール画像を設定しましょう！</AlertTitle>
                        <AlertDescription>新規登録が完了しました。プロフィール画像を設定して、他のユーザーにアピールしましょう。</AlertDescription>
                    </Box>
                    <CloseButton position="absolute" right="8px" top="8px" onClick={onClose} />
                </Alert>
            </Slide>
        </Center>
    );
}

export default ChooseProfilePicture;
