import React, { useState } from 'react';
import { Box, Text, Button, VStack, useToast, Input, Center, Icon } from '@chakra-ui/react';
import { useRouter } from 'next/router';  // Next.jsのルーターフックをインポート
import { FiCamera } from 'react-icons/fi';

function ChooseProfilePicture() {
    const [image, setImage] = useState(null);
    const [imageFile, setImageFile] = useState(null); // ファイルオブジェクトの状態管理
    const toast = useToast();
    const router = useRouter();  // useRouterフックの使用

    // 画像ファイルが選択された時のハンドラ
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file); // ファイルオブジェクトを保存
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // 画像アップロードの処理
    const handleUpload = async () => {
        if (!imageFile) return; // ファイルがない場合は何もしない

        const formData = new FormData();
        formData.append('profile_photo', imageFile); // 'profile_photo' キーでファイルを追加

        try {
            const response = await fetch('http://localhost:3000/signup', {
                method: 'POST',
                body: formData,
            });
            if (!response.ok) {
                throw new Error('プロフィール画像のアップロードに失敗しました。。');
            }
            const data = await response.json();
            toast({
                title: 'プロフィール更新完了',
                description: 'プロフィール画像が設定されました。',
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
            router.push('/index');  // routerを使用してページ遷移
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
                    {image ? (
                        <img src={image} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
                    ) : (
                        <Center w="full" h="full">
                            <Icon as={FiCamera} w={8} h={8} color="white" />
                        </Center>
                    )}
                    <Input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        position="absolute"
                        top="0"
                        left="0"
                        w="full"
                        h="full"
                        opacity="0"
                        cursor="pointer"
                    />
                </Box>
                <Button colorScheme="teal" onClick={handleUpload} isDisabled={!image} w="65%">画像をアップロード</Button>
                <Button colorScheme="gray" onClick={() => router.push('/')} w="65%">あとで設定する</Button>
            </VStack>
        </Center>
    );
}

export default ChooseProfilePicture;