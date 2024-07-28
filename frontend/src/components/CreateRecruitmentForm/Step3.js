import React, { useState, useEffect, useCallback } from 'react';
import {
  VStack,
  Textarea,
  Button,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  RadioGroup,
  Radio,
  Stack,
  HStack,
  Box,
  Text,
  Flex,
  Container,
} from '@chakra-ui/react';
import { templateTexts } from '../../components/CreateRecruitmentForm/RecruitmentTemplates';

const Step3 = ({ formData, handleChange, handleBack, handleNext }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isTextareaOpen,
    onOpen: onTextareaOpen,
    onClose: onTextareaClose,
  } = useDisclosure();
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [previewContent, setPreviewContent] = useState("");
  const [textareaContent, setTextareaContent] = useState(formData.description || "");
  const [error, setError] = useState('');

  useEffect(() => {
    if (selectedTemplate) {
      const newDescription = templateTexts[selectedTemplate];
      setPreviewContent(newDescription);
    }
  }, [selectedTemplate]);

  const handleUseTemplate = useCallback(() => {
    if (previewContent) {
      handleChange({ target: { name: 'description', value: previewContent } });
      setTextareaContent(previewContent);
      onClose();
    }
  }, [previewContent, handleChange, onClose]);

  const handleTextareaSave = () => {
    handleChange({ target: { name: 'description', value: textareaContent } });
    onTextareaClose();
  };

  useEffect(() => {
    setTextareaContent(formData.description);
  }, [formData.description]);

  const handleNextStep = () => {
    if (!textareaContent) {
      setError('募集内容詳細を入力してください');
      return;
    }
    setError('');
    handleNext();
  };

  return (
    <Container maxW="container.lg" height="50vh" p={4}>
      <VStack spacing={4} align="stretch" height="100%">
        <Flex justify="center" align="center" position="relative">
          <Heading as="h2" size="lg" textAlign="center">募集内容詳細</Heading>
          <Box position="absolute" right="0">
            <Button onClick={onOpen} colorScheme="teal" size="sm">テンプレート</Button>
          </Box>
        </Flex>
        <Textarea
          placeholder="募集内容詳細"
          name="description"
          value={textareaContent}
          onClick={onTextareaOpen}
          readOnly
          flex="1"
        />
        {error && <Text color="red.500">{error}</Text>}
        <HStack justify="center" spacing={4}>
          <Button onClick={handleBack} size="md">戻る</Button>
          <Button onClick={handleNextStep} colorScheme="teal" size="md">次へ</Button>
        </HStack>

        <Modal isOpen={isOpen} onClose={onClose} size="xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>テンプレートを選択</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <RadioGroup onChange={setSelectedTemplate} value={selectedTemplate}>
                <Stack direction="column">
                  <Radio value="Template1">チームメンバー募集用テンプレート</Radio>
                  <Radio value="Template2">初心者歓迎の募集テンプレート</Radio>
                  <Radio value="Template3">対戦相手募集テンプレート</Radio>
                  <Radio value="Template4">助っ人募集テンプレート</Radio>
                  <Radio value="Template5">マネージャー募集テンプレート</Radio>
                </Stack>
              </RadioGroup>
              {selectedTemplate && (
                <Box mt={4} p={4} borderWidth="1px" borderRadius="md" bg="gray.50">
                  <Text whiteSpace="pre-wrap">{previewContent}</Text>
                </Box>
              )}
            </ModalBody>
            <ModalFooter>
              <Button variant="ghost" onClick={onClose}>キャンセル</Button>
              <Button colorScheme="teal" onClick={handleUseTemplate} ml={3}>このテンプレートを使用</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <Modal isOpen={isTextareaOpen} onClose={onTextareaClose} size="xl" isCentered>
          <ModalOverlay />
          <ModalContent mt="2" mb="2" ml="6" mr="6">
            <ModalHeader>募集内容詳細を入力</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Textarea
                placeholder="募集内容詳細"
                value={textareaContent}
                onChange={(e) => setTextareaContent(e.target.value)}
                height="360px"
              />
            </ModalBody>
            <ModalFooter>
              <Button variant="ghost" onClick={onTextareaClose}>キャンセル</Button>
              <Button colorScheme="teal" onClick={handleTextareaSave} ml={3}>保存</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </VStack>
    </Container>
  );
};

export default Step3;
