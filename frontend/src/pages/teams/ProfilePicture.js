import React, { useState } from 'react';
import { Box, Text, Button, VStack, useToast, Input, Center, Icon, Img } from '@chakra-ui/react';
import { FiCamera } from 'react-icons/fi';
import { useRouter } from 'next/router';
import axios from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

function ProfilePicture({ teamId }) {
    const [profileImage, setProfileImage] = useState(null);
    const [profileImageFile, setProfileImageFile] = useState(null);
    const toast = useToast();
    const router = useRouter();

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
            const response = await axios.patch(`${apiUrl}/teams/${teamId}/update_profile_photo`, formData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            toast({
                title: '更新完了',
                description: 'プロフィール画像が設定されました。',
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
            router.push('/teams/manage'); // アップロード成功後にリダイレクト
        } catch (error) {
            toast({
                title: '画像のアップロードに失敗しました。',
                description: 'もう一度お試しください。',
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
                <Button colorScheme="gray" onClick={() => router.push('/teams/manage')} w="65%">あとで設定する</Button>
            </VStack>
        </Center>
    );
}

export async function getServerSideProps(context) {
    const { teamId } = context.query;
    return { props: { teamId } };
}

export default ProfilePicture;