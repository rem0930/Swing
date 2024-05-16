import {
  VStack,
  Textarea,
  Button,
  Heading,
  Select,
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
  Stack
} from '@chakra-ui/react';
import { useState } from 'react';

const Step3 = ({ formData, handleChange, handleBack, handleNext }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedTemplate, setSelectedTemplate] = useState("");

  const handleTemplateSelect = () => {
    handleChange({ target: { name: 'description', value: selectedTemplate } });
    onClose();
  };

  return (
    <VStack spacing={4}>
      <Heading as="h2" size="lg">募集内容詳細</Heading>
      <Button onClick={onOpen} colorScheme="teal">テンプレートを使用</Button>
      <Textarea
        placeholder="募集内容詳細"
        name="description"
        value={formData.description}
        onChange={handleChange}
      />
      <Button onClick={handleBack}>戻る</Button>
      <Button onClick={handleNext} colorScheme="teal">次へ</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>テンプレートを選択</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <RadioGroup onChange={setSelectedTemplate} value={selectedTemplate}>
              <Stack direction="column">
                {Templates.map((template, index) => (
                  <Radio key={index} value={template}>{template}</Radio>
                ))}
              </Stack>
            </RadioGroup>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onClose}>キャンセル</Button>
            <Button colorScheme="teal" onClick={handleTemplateSelect} ml={3}>テンプレートを使用</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </VStack>
  );
};

export default Step3;
