import { VStack, Input, Button, Heading } from '@chakra-ui/react';

const Step2 = ({ formData, handleChange, handleBack, handleNext }) => {
  return (
    <VStack spacing={4}>
      <Heading as="h2" size="lg">募集タイトル</Heading>
      <Input placeholder="募集タイトル" name="title" value={formData.title} onChange={handleChange} />
      <Button onClick={handleBack}>戻る</Button>
      <Button onClick={handleNext} colorScheme="teal">次へ</Button>
    </VStack>
  );
};

export default Step2;
