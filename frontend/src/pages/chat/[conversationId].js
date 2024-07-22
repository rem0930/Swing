import { useRouter } from 'next/router';
import { Box, Flex } from '@chakra-ui/react';
import ChatSidebar from '../../components/Chat/ChatSidebar';
import ChatWindow from '../../components/Chat/ChatWindow';
import ChatHeader from '../../components/Chat/ChatHeader';
import ChatFooter from '../../components/Chat/ChatFooter';

const ChatPage = () => {
  const router = useRouter();
  const { conversationId } = router.query;

  return (
    <Flex height="100vh" bg="gray.50">
      <Box width="20%" borderRight="1px solid #ddd" bg="white">
        <ChatSidebar />
      </Box>
      <Box width="80%" display="flex" flexDirection="column">
        <ChatHeader conversationId={conversationId} />
        <ChatWindow conversationId={conversationId} flex="1" />
        <ChatFooter conversationId={conversationId} />
      </Box>
    </Flex>
  );
};

export default ChatPage;
