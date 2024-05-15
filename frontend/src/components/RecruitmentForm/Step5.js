import { VStack, Box, Button, Heading } from '@chakra-ui/react';

const Step5 = ({ formData, handleBack, handleSubmit }) => {
  return (
    <VStack spacing={4}>
      <Heading as="h2" size="lg">確認</Heading>
      <Box>
        <strong>募集タイプ:</strong> {formData.role === 'member' ? 'メンバーの募集' : formData.role === 'opponent' ? '対戦相手の募集' : '助っ人の募集'}
      </Box>
      <Box>
        <strong>募集タイトル:</strong> {formData.title}
      </Box>
      <Box>
        <strong>募集内容詳細:</strong> {formData.description}
      </Box>
      <Box>
        <strong>開催日時:</strong> {formData.event_date}
      </Box>
      <Box>
        <strong>募集締切日時:</strong> {formData.deadline}
      </Box>
      <Button onClick={handleBack}>戻る</Button>
      <Button onClick={handleSubmit} colorScheme="teal">作成</Button>
    </VStack>
  );
};

export default Step5;
