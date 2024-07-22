import React from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from '@chakra-ui/react';

const ConfirmationModal = ({ isOpen, onClose, onNavigateToChat, onStayOnPage }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>応募が完了しました</ModalHeader>
        <ModalBody>
          チャット画面に移動しますか？それともこのページにとどまりますか？
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="teal" mr={3} onClick={onNavigateToChat}>
            チャット画面に移動
          </Button>
          <Button variant="ghost" onClick={onStayOnPage}>
            このページにとどまる
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmationModal;
