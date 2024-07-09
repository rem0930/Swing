import { VStack, FormControl, FormLabel, Input, Button, Heading } from '@chakra-ui/react';

const Step5 = ({ formData, handleChange, handleBack, handleNext }) => {
  return (
    <VStack spacing={4}>
      <Heading as="h2" size="lg">日時設定</Heading>
      <FormControl>
        <FormLabel>開催日時</FormLabel>
        <Input type="datetime-local" name="event_date" value={formData.event_date} onChange={handleChange} />
      </FormControl>
      <FormControl>
        <FormLabel>募集締切日時</FormLabel>
        <Input type="datetime-local" name="deadline" value={formData.deadline} onChange={handleChange} />
      </FormControl>
      <Button onClick={handleBack}>戻る</Button>
      <Button onClick={handleNext} colorScheme="teal">次へ</Button>
    </VStack>
  );
};

export default Step5;
