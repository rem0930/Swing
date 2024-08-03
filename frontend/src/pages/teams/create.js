import React, { useState, useEffect } from 'react';
import {
    useColorModeValue,
    useToast,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Text
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Layout from '../../components/Layouts/Layout';
import CreateTeamForm from '../../components/Team/CreateTeamForm';
import Logo from '../../components/Logo';

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

function CreateTeam() {
    const [name, setName] = useState('');
    const [details, setDetails] = useState('');
    const toast = useToast();
    const router = useRouter();
    const [isTeamCreationModalOpen, setIsTeamCreationModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        setIsTeamCreationModalOpen(true);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;
        setIsSubmitting(true);

        const token = localStorage.getItem('token');

        if (!token) {
            toast({
                title: '認証エラー',
                description: 'ログインしてください。',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
            setIsSubmitting(false);
            return;
        }

        const teamData = { name, details };

        try {
            const response = await axios.post(
                `${apiUrl}/teams`,
                teamData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response.status === 201) {
                toast({
                    title: '成功',
                    description: 'チームの作成に成功しました！',
                    duration: 5000,
                    isClosable: true,
                });
                const teamId = response.data.id;
                router.push(`/teams/ProfilePicture?teamId=${teamId}`);
            }
        } catch (error) {
            toast({
                title: 'チームの作成に失敗しました',
                description: error.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Layout>
            <CreateTeamForm onSubmit={handleSubmit} name={name} setName={setName} details={details} setDetails={setDetails} />

            <Modal isOpen={isTeamCreationModalOpen} onClose={() => setIsTeamCreationModalOpen(false)} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>チームを作ろう！</ModalHeader>
                    <ModalBody>
                        <Text>こんにちは！チームを作成して、仲間と一緒に活動を楽しみませんか？チームを持つことで、イベントや活動をもっと楽しむことができます。</Text>
                        <Text mt={4}>今すぐチームを作成して、最高の仲間と一緒に素晴らしい時間を過ごしましょう！</Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="teal" onClick={() => setIsTeamCreationModalOpen(false)}>閉じる</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Layout>
    );
}

export default CreateTeam;
