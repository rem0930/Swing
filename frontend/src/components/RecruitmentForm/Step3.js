import { VStack, Textarea, Button, Heading } from '@chakra-ui/react';

const Step3 = ({ formData, handleChange, handleBack, handleNext }) => {
  return (
    <VStack spacing={4}>
      <Heading as="h2" size="lg">募集内容詳細</Heading>
      <Textarea placeholder="募集内容詳細" name="description" value={formData.description} onChange={handleChange} />
      <Button onClick={handleBack}>戻る</Button>
      <Button onClick={handleNext} colorScheme="teal">次へ</Button>
    </VStack>
  );
};

export default Step3;
