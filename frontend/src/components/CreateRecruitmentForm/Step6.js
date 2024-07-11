import { VStack, Box, Button, Heading, Text, Icon, SimpleGrid } from '@chakra-ui/react';
import { FaClipboardCheck, FaRegClock, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';

const Step6 = ({ formData, handleBack, handleSubmit }) => {
  const InfoItem = ({ icon, label, value }) => (
    <Box mb={4}>
      <Text fontSize="lg" fontWeight="bold" mb={1}>
        <Icon as={icon} mr={2} color="teal.500" />
        {label}
      </Text>
      <Text ml={6}>{value}</Text>
    </Box>
  );

  return (
    <VStack spacing={8} align="stretch" maxW="600px" mx="auto" p={6} borderWidth="1px" borderRadius="lg" boxShadow="lg" bg="white">
      <Heading as="h2" size="lg" textAlign="center" color="teal.600">募集内容の確認</Heading>
      
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        <InfoItem
          icon={FaClipboardCheck}
          label="募集タイプ"
          value={formData.role === 'member' ? 'メンバーの募集' : formData.role === 'opponent' ? '対戦相手の募集' : '助っ人の募集'}
        />
        <InfoItem
          icon={FaClipboardCheck}
          label="募集タイトル"
          value={formData.title}
        />
        <InfoItem
          icon={FaCalendarAlt}
          label="開催日時"
          value={formData.event_date}
        />
        <InfoItem
          icon={FaRegClock}
          label="募集締切日時"
          value={formData.deadline}
        />
        <InfoItem
          icon={FaMapMarkerAlt}
          label="場所"
          value={formData.address || '未設定'}
        />
      </SimpleGrid>
      
      <Box>
        <Text fontSize="lg" fontWeight="bold" mb={2}>
          <Icon as={FaClipboardCheck} mr={2} color="teal.500" />
          募集内容詳細
        </Text>
        <Box p={4} borderWidth="1px" borderRadius="md" bg="gray.50">
          <Text>{formData.description}</Text>
        </Box>
      </Box>
      
      <VStack spacing={4} mt={4}>
        <Button onClick={handleBack} width="full" variant="outline" colorScheme="teal">
          戻る
        </Button>
        <Button onClick={handleSubmit} colorScheme="teal" width="full">
          募集を作成する
        </Button>
      </VStack>
    </VStack>
  );
};

export default Step6;
