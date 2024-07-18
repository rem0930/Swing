import {
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter,
    ModalCloseButton, Button, Text,
  } from '@chakra-ui/react';
  
const DeleteConfirmationModal = ({ isOpen, onClose, onDelete }) => {
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>削除確認</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text color="red.500">
              本当にこのチームを削除しますか？この操作は元に戻せません。
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={onClose}>
              キャンセル
            </Button>
            <Button colorScheme="red" onClick={onDelete}>
              削除
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
};

export default DeleteConfirmationModal;
