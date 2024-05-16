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
import { templateTexts } from '../../components/RecruitmentTemplates';

const Step3 = ({ formData, handleChange, handleBack, handleNext }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [previewContent, setPreviewContent] = useState("");

  // useEffectを最適化し、selectedTemplateが変更された場合のみプレビューを更新
  useEffect(() => {
    if (selectedTemplate) {
      const newDescription = templateTexts[selectedTemplate];
      setPreviewContent(newDescription);
    }
  }, [selectedTemplate]);

  // handleTemplateSelectを削除し、useEffect内でプレビューを更新
  const handleUseTemplate = useCallback(() => {
    if (previewContent) {
      handleChange({ target: { name: 'description', value: previewContent } });
      onClose();
    }
  }, [previewContent, handleChange, onClose]);

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
          value={formData.description}
          onChange={handleChange}
          flex="1"
        />
        <HStack justify="center" spacing={4}>
          <Button onClick={handleBack} size="md">戻る</Button>
          <Button onClick={handleNext} colorScheme="teal" size="md">次へ</Button>
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
              <Button colorScheme="teal" onClick={handleUseTemplate} ml={3}>テンプレートを使用</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </VStack>
    </Container>
  );
};

export default Step3;
