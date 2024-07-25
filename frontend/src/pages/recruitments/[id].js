import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Box, Text, HStack, Icon, Container, Spinner, useToast, Heading, Flex } from '@chakra-ui/react';
import { FiClock } from 'react-icons/fi';
import { useRouter } from 'next/router';
import axios from 'axios';

import RecruitmentHeader from '../../components/RecruitmentDetails/RecruitmentHeader';
import RecruitmentFooter from '../../components/RecruitmentDetails/RecruitmentFooter';
import Layout from '../../components/Layout';
import GoogleMapComponent from '../../components/RecruitmentDetails/GoogleMapComponent';
import LoginModal from '../../components/LoginModal';
import SignupModal from '../../components/SignupModal';
import { useUser } from '../../context/UserContext';

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const RecruitmentDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [recruitmentData, setRecruitmentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [conversationId, setConversationId] = useState(null);  // 追加
  const { user } = useUser();
  const toast = useToast();

  const loginModalRef = useRef();
  const signupModalRef = useRef();

  const openLoginModal = useCallback(() => {
    if (loginModalRef.current) {
      loginModalRef.current.onOpen();
    }
  }, []);

  const openSignupModal = useCallback(() => {
    if (signupModalRef.current) {
      signupModalRef.current.onOpen();
    }
  }, []);

  useEffect(() => {
    if (id) {
      const token = localStorage.getItem('token');
      axios.get(`${apiUrl}/recruitments/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : '',
        },
      })
        .then(response => {
          setRecruitmentData({
            ...response.data.recruitment,
            is_user_team: response.data.is_user_team,
            is_applied: response.data.is_applied
          });
          setLoading(false);
        })
        .catch(error => {
          console.error("There was an error fetching the recruitment data!", error);
          setError("募集データの取得中にエラーが発生しました。");
          setLoading(false);
        });
    }
  }, [id]);

  const handleApply = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast({
        title: 'ログインが必要です',
        description: 'この操作を行うにはログインしてください。',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      openLoginModal();
      return;
    }
    axios.post(`${apiUrl}/recruitments/${id}/applications`, { recruitment_id: id }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      setRecruitmentData(prevData => ({
        ...prevData,
        is_applied: true
      }));
      setConversationId(response.data.conversation_id);  // 修正
      toast({
        title: '応募が完了しました！',
        description: '相手からのメッセージをお待ちください。',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    })
    .catch(error => {
      console.error("There was an error applying for the recruitment!", error);
      if (error.response && error.response.status === 422) {
        toast({
          title: '既に応募済みです。',
          status: 'info',
          duration: 3000,
          isClosable: true,
        });
        setRecruitmentData(prevData => ({
          ...prevData,
          is_applied: true
        }));
      } else {
        toast({
          title: '応募中にエラーが発生しました。',
          description: error.response?.data?.message || 'もう一度お試しください。',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    });
  };

  const handleCloseRecruitment = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast({
        title: 'ログインが必要です',
        description: 'この操作を行うにはログインしてください。',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      openLoginModal();
      return;
    }
    axios.patch(`${apiUrl}/recruitments/${id}/close`, {}, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      setRecruitmentData(prevData => ({
        ...prevData,
        ...response.data,
        status: 'closed'
      }));
      toast({
        title: '募集を締め切りました。',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    })
    .catch(error => {
      console.error("There was an error closing the recruitment!", error);
      toast({
        title: '募集を締め切る際にエラーが発生しました。',
        description: error.response?.data?.message || 'もう一度お試しください。',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    });
  };

  const handleStayOnPage = () => {
    setIsConfirmationOpen(false);
    toast({
      title: '応募が完了しました！',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  if (loading) {
    return (
      <Layout>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
          <Spinner size="xl" />
        </Box>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
          <Text color="red.500">{error}</Text>
        </Box>
      </Layout>
    );
  }

  if (!recruitmentData) {
    return null;
  }

  return (
    <Layout>
      <Box position="relative" minHeight="100vh" pb="80px" bg="gray.50">
        <Box position="sticky" top="0" zIndex="999" bg="white" boxShadow="sm">
          <RecruitmentHeader 
            team={recruitmentData.team} 
            title={recruitmentData.title} 
            profilePhoto={recruitmentData.team?.profile_photo_url}
          />
        </Box>
        <Container maxW="container.lg" py={8} bg="gray.50">
          <Flex>
            <Box flex="6" ml={4}>
              <Heading fontSize="lg" fontWeight="bold" mb={4}>詳細</Heading>
              <Text whiteSpace="pre-line" mb={4}>{recruitmentData.description}</Text>
              
              <HStack mt="3" spacing="4">
                <Icon as={FiClock} />
                <Text>締切日: {new Date(recruitmentData.deadline).toLocaleDateString()}</Text>
              </HStack>
            </Box>
            <Box flex="4" ml={4}>
              {recruitmentData.latitude && recruitmentData.longitude && (
                <GoogleMapComponent
                  latitude={recruitmentData.latitude}
                  longitude={recruitmentData.longitude}
                />
              )}
            </Box>
          </Flex>
        </Container>
        <RecruitmentFooter 
          eventDate={recruitmentData.event_date} 
          onApply={recruitmentData.is_user_team ? handleCloseRecruitment : handleApply} 
          isOwnTeam={recruitmentData.is_user_team}
          isApplied={recruitmentData.is_applied}
          status={recruitmentData.status}
          address={recruitmentData.address}
          recruitmentId={recruitmentData.id}
          openLoginModal={openLoginModal}
        />
      </Box>
      <LoginModal ref={loginModalRef} openSignupModal={openSignupModal} />
      <SignupModal ref={signupModalRef} openLoginModal={openLoginModal} />
    </Layout>
  );
};

RecruitmentDetail.needsGoogleMaps = true;

export default RecruitmentDetail;
