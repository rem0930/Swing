import React, { useRef } from 'react';
import { Button, HStack } from "@chakra-ui/react";
import LoginModal from '../../LoginModal';
import SignupModal from '../../SignupModal';

const GuestMenu = () => {
  const loginModalRef = useRef();
  const signupModalRef = useRef();

  const openLoginModal = () => {
    if (loginModalRef.current) {
      loginModalRef.current.onOpen();
    }
  };

  const openSignupModal = () => {
    if (signupModalRef.current) {
      signupModalRef.current.onOpen();
    }
  };

  return (
    <HStack spacing={2}>
      <Button onClick={openLoginModal} variant="outline" color="black" bg="gray.200" _hover={{ color: "teal.400" }}>
        ログイン
      </Button>
      <Button onClick={openSignupModal} variant="solid" color="white" bg="teal.500" _hover={{ bg: "teal.600" }}>
        新規登録
      </Button>
      <LoginModal ref={loginModalRef} openSignupModal={openSignupModal} />
      <SignupModal ref={signupModalRef} openLoginModal={openLoginModal} />
    </HStack>
  );
};

export default GuestMenu;
