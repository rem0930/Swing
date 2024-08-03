import { Box, IconButton, Tooltip, useToast, useDisclosure } from "@chakra-ui/react";
import { FiFeather } from "react-icons/fi";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import LoginModal from './LoginModal'; // パスを適切に調整してください
import SignupModal from './SignupModal'; // パスを適切に調整してください

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const CreateRecruitmentButton = () => {
  const router = useRouter();
  const toast = useToast();
  const footerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  const {
    isOpen: isLoginModalOpen,
    onOpen: onLoginModalOpen,
    onClose: onLoginModalClose,
  } = useDisclosure();
  
  const {
    isOpen: isSignupModalOpen,
    onOpen: onSignupModalOpen,
    onClose: onSignupModalClose,
  } = useDisclosure();

  const handleClick = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast({
        title: 'ログインが必要です',
        description: 'この操作を行うにはログインしてください。',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      onLoginModalOpen();
      return;
    }

    try {
      const response = await axios.get(`${apiUrl}/has_team`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data.has_team) {
        router.push(`/teams/${response.data.team_id}/recruitments/new`);
      } else {
        router.push(`/teams/create`);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast({
          title: '認証エラー',
          description: 'ログインが必要です。ログインしてください。',
          status: 'warning',
          duration: 3000,
          isClosable: true,
        });
        onLoginModalOpen();  // ログインモーダルを開く
      } else {
        toast({
          title: 'エラーが発生しました',
          description: 'チームの状態を確認中にエラーが発生しました。やり直してください。',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        // ユーザーを前のページに戻します
        router.back();  // 一つ前の画面に戻る
      }
      console.error('Error checking team status', error);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(!entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.1
      }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

  return (
    <>
      <Box position="fixed" bottom="20px" right="20px" zIndex="1000" display={isVisible ? "block" : "none"}>
        <Tooltip label="募集作成" aria-label="募集作成">
          <IconButton
            colorScheme="teal"
            size="lg"
            icon={<FiFeather />}
            onClick={handleClick}
            isRound
            aria-label="新規募集作成"
          />
        </Tooltip>
      </Box>
      <div ref={footerRef}></div>
    </>
  );
};

export default CreateRecruitmentButton;
