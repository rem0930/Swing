import React from 'react';
import {
    Button,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    useDisclosure,
    useToast
} from '@chakra-ui/react';
import { useRouter } from 'next/router';

const DeleteUser = ({ userId }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef();
    const toast = useToast();
    const router = useRouter();

    const deleteUser = async () => {
        try {
            const response = await fetch(`http://localhost:3000/users/${userId}`, {
                method: 'DELETE',
                credentials: 'include' // cookies
            });
            if (!response.ok) throw new Error('User delete failed.');
            toast({
                title: 'ユーザー削除完了',
                description: 'ユーザーが削除されました。',
                status:'success',
                duration: 5000,
                isClosable: true
            });
            router.push('/');
        } catch (error) {
            toast({
                title: 'ユーザー削除に失敗しました',
                status: error.message,
                duration: 9000,
                isClosable: true
            });
        }
    };

    return(
        <>
            <Button colorScheme="red" onClick={onOpen}>
                アカウント削除
            </Button>

            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                isCentered
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            アカウント削除
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            このユーザーを削除しますか？
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>キャンセル</Button>
                            <Button colorScheme="red" onClick={() => {
                                deleteUser();
                                onClose();
                            }} ml={3}>
                                削除
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    );
};

export default DeleteUser;