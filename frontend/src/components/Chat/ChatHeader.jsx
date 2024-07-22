import { Box, Text, Flex, IconButton } from '@chakra-ui/react';
import { SettingsIcon } from '@chakra-ui/icons';

const ChatHeader = ({ conversationId }) => {
  return (
    <Flex p={4} borderBottom="1px solid #ddd" alignItems="center" bg="teal.500" color="white">
      <Text fontSize="xl" flex="1">会話タイトル</Text>
      <IconButton icon={<SettingsIcon />} variant="ghost" color="white" />
    </Flex>
  );
};

export default ChatHeader;
