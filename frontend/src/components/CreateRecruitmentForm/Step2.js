import { useState } from 'react';
import { VStack, Input, Button, Heading, Text } from '@chakra-ui/react';

const Step2 = ({ formData, handleChange, handleBack, handleNext }) => {
  const [error, setError] = useState('');

  const handleNextStep = () => {
    if (!formData.title) {
      setError('募集タイトルを入力してください');
      return;
    }
    setError('');
    handleNext();
  };

  return (
    <VStack spacing={4}>
      <Heading as="h2" size="lg">募集タイトル</Heading>
      <Input
        placeholder="募集タイトル"
        name="title"
        value={formData.title}
        onChange={handleChange}
      />
      {error && <Text color="red.500">{error}</Text>}
      <Button onClick={handleBack}>戻る</Button>
      <Button onClick={handleNextStep} colorScheme="teal">次へ</Button>
    </VStack>
  );
};

export default Step2;
