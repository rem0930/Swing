import { VStack, Box, Button, Heading, Text, Icon } from '@chakra-ui/react';
import { FaClipboardCheck, FaRegClock, FaCalendarAlt } from 'react-icons/fa';

const Step5 = ({ formData, handleBack, handleSubmit }) => {
  return (
    <VStack spacing={8} align="stretch" maxW="600px" mx="auto" p={4} borderWidth="1px" borderRadius="md" boxShadow="md">
      <Heading as="h2" size="lg" textAlign="center">確認</Heading>
      
      <Box p={4} borderWidth="1px" borderRadius="md" bg="gray.50">
        <Text fontSize="lg" mb={2}>
          <Icon as={FaClipboardCheck} mr={2} />
          <strong>募集タイプ:</strong> {formData.role === 'member' ? 'メンバーの募集' : formData.role === 'opponent' ? '対戦相手の募集' : '助っ人の募集'}
        </Text>
        <Text fontSize="lg" mb={2}>
          <Icon as={FaClipboardCheck} mr={2} />
          <strong>募集タイトル:</strong> {formData.title}
        </Text>
        <Text fontSize="lg" mb={2}>
          <Icon as={FaClipboardCheck} mr={2} />
          <strong>募集内容詳細:</strong> {formData.description}
        </Text>
        <Text fontSize="lg" mb={2}>
          <Icon as={FaCalendarAlt} mr={2} />
          <strong>開催日時:</strong> {formData.event_date}
        </Text>
        <Text fontSize="lg">
          <Icon as={FaRegClock} mr={2} />
          <strong>募集締切日時:</strong> {formData.deadline}
        </Text>
      </Box>
      
      <VStack spacing={4}>
        <Button onClick={handleBack} width="full" variant="outline">戻る</Button>
        <Button onClick={handleSubmit} colorScheme="teal" width="full">作成</Button>
      </VStack>
    </VStack>
  );
};

export default Step5;
