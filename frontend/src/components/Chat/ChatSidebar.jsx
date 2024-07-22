import { Box, VStack, Button, Heading, Text } from '@chakra-ui/react';

const ChatSidebar = () => {
  return (
    <VStack spacing={4} align="stretch" p={4}>
      <Heading size="md" mb={4} color="teal.500">会話リスト</Heading>
      <Button colorScheme="teal" variant="solid">新しい会話を開始</Button>
      {/* ここに会話リストを追加 */}
      <Text>会話リスト項目</Text>
      <Text>会話リスト項目</Text>
      <Text>会話リスト項目</Text>
    </VStack>
  );
};

export default ChatSidebar;
