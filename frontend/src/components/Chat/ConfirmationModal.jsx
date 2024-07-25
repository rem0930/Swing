import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

const ConfirmationModal = ({ isOpen, onClose, onNavigateToChat, onStayOnPage }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>応募が完了しました！</ModalHeader>
        <ModalBody>
          <Text>チャットページに移動しますか？それともこのままこのページに留まりますか？</Text>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="teal" mr={3} onClick={onNavigateToChat}>
            チャットページに移動
          </Button>
          <Button variant="ghost" onClick={onStayOnPage}>
            このままにする
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmationModal;
