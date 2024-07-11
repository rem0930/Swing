import { Box, Text, HStack, Icon, Container, Spinner, useToast, Heading, Flex, useDisclosure } from '@chakra-ui/react';
import { FiClock } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { useEffect, useState, useRef, useCallback } from 'react';
import RecruitmentHeader from '../../components/RecruitmentDetails/RecruitmentHeader';
import RecruitmentFooter from '../../components/RecruitmentDetails/RecruitmentFooter';
import Layout from '../../components/Layout.jsx';
import GoogleMapComponent from '../../components/RecruitmentDetails/GoogleMapComponent';
import axios from 'axios';
import LoginModal from '../../components/LoginModal';
import SignupModal from '../../components/SignupModal';

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const RecruitmentDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [recruitment, setRecruitment] = useState(null);
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOwnTeam, setIsOwnTeam] = useState(false);
  const [isApplied, setIsApplied] = useState(false);
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
          Authorization: `Bearer ${token}`,
        },
      })
        .then(response => {
          setRecruitment(response.data.recruitment);
          setIsOwnTeam(response.data.is_user_team);
          return response.data.recruitment.team_id;
        })
        .then(teamId => {
          if (teamId) {
            const token = localStorage.getItem('token');
            return axios.get(`${apiUrl}/teams/${teamId}`, {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            });
          } else {
            throw new Error('Team ID is undefined');
          }
        })
        .then(response => {
          setTeam(response.data);
          const token = localStorage.getItem('token');
          if (token) {
            return axios.get(`${apiUrl}/applications/check?recruitment_id=${id}`, {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
            });
          } else {
            return { data: { is_applied: false } };
          }
        })
        .then(response => {
          setIsApplied(response.data.is_applied);
          setLoading(false);
        })
        .catch(error => {
          console.error("There was an error fetching the recruitment or team data!", error);
          setError("募集またはチームデータの取得中にエラーが発生しました。");
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
      openLoginModal();  // ログインモーダルを開く
      return;
    }
    axios.post(`${apiUrl}/applications`, { recruitment_id: id }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    .then(() => {
      setIsApplied(true);
      toast({
        title: '応募が完了しました！',
        status:'success',
        duration: 3000,
        isClosable: true,
      });
    })
    .catch(error => {
      if (error.response && error.response.status === 401) {
        toast({
          title: 'ログインが必要です',
          description: 'この操作を行うにはログインしてください。',
          status: 'warning',
          duration: 3000,
          isClosable: true,
        });
        openLoginModal();  // ログインモーダルを開く
      return;
      } else {
        toast({
          title: '応募中にエラーが発生しました。',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
      console.error("There was an error applying for the recruitment!", error);
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
      openLoginModal();  // ログインモーダルを開く
      return;
    }
    axios.patch(`${apiUrl}/recruitments/${id}/close`, {}, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      setRecruitment(response.data);
      toast({
        title: '募集を締め切りました。',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    })
    .catch(error => {
      if (error.response && error.response.status === 401) {
        toast({
          title: 'ログインが必要です',
          description: 'この操作を行うにはログインしてください。',
          status: 'warning',
          duration: 3000,
          isClosable: true,
        });
        openLoginModal();  // ログインモーダルを開く
        return;
      } else {
        toast({
          title: '募集を締め切る際にエラーが発生しました。',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
      console.error("There was an error closing the recruitment!", error);
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

  return (
    <Layout>
      <Box position="relative" minHeight="100vh" pb="80px" bg="gray.50"> {/* 背景色を少し暗く */}
        <Box position="sticky" top="0" zIndex="999" bg="white" boxShadow="sm">
          <RecruitmentHeader 
            team={team} 
            title={recruitment.title} 
            profilePhoto={team.profile_photo_url || null}
          />
        </Box>
        <Container maxW="container.lg" py={8} bg="gray.50"> {/* 背景色を少し暗く */}
          <Flex>
            <Box flex="6" ml={4}>
              <Heading fontSize="lg" fontWeight="bold" mb={4}>詳細</Heading>
              <Text whiteSpace="pre-line" mb={4}>{recruitment.description}</Text>
              
              <HStack mt="3" spacing="4">
                <Icon as={FiClock} />
                <Text>締切日: {new Date(recruitment.deadline).toLocaleDateString()}</Text>
              </HStack>
            </Box>
            <Box flex="4" ml={4}>
              <GoogleMapComponent
                latitude={recruitment.latitude}
                longitude={recruitment.longitude}
              />
            </Box>
          </Flex>
        </Container>
        <RecruitmentFooter 
          eventDate={recruitment.event_date} 
          onApply={isOwnTeam ? handleCloseRecruitment : handleApply} 
          isOwnTeam={isOwnTeam}
          isApplied={isApplied}
          status={recruitment.status}
          address={recruitment.address}
          recruitmentId={recruitment.id}
          openLoginModal={openLoginModal}  // openLoginModalを渡す
        />
      </Box>
      <LoginModal ref={loginModalRef} openSignupModal={openSignupModal} />
      <SignupModal ref={signupModalRef} openLoginModal={openLoginModal} />
    </Layout>
  );
};

export default RecruitmentDetail;
