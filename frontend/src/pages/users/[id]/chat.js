import React, { useState, useEffect } from 'react';
import { Box, Flex, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useUser } from '../../../context/UserContext';
import Layout from '../../../components/Layout';
import ConversationList from '../../../components/Chat/ConversationList';
import MessageList from '../../../components/Chat/MessageList';
import MessageInput from '../../../components/Chat/MessageInput';

const ChatPage = () => {
  const router = useRouter();
  const { user } = useUser();
  const toast = useToast();
  const { conversationId } = router.query;
  const [selectedConversationId, setSelectedConversationId] = useState(conversationId || null);

  useEffect(() => {
    if (conversationId) {
      setSelectedConversationId(conversationId);
    }
  }, [conversationId]);

  const handleConversationSelect = (conversationId) => {
    setSelectedConversationId(conversationId);
    router.push(`/users/${user.id}/chat?conversationId=${conversationId}`);
  };

  const handleMessageSent = () => {
    toast({
      title: 'メッセージが送信されました',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Layout>
      <Flex minHeight="100vh">
        <Box w="30%" borderRight="1px solid #ccc">
          <ConversationList onSelectConversation={handleConversationSelect} />
        </Box>
        <Box w="70%" p={4}>
          {selectedConversationId ? (
            <>
              <MessageList conversationId={selectedConversationId} />
              <MessageInput conversationId={selectedConversationId} onMessageSent={handleMessageSent} />
            </>
          ) : (
            <Box display="flex" alignItems="center" justifyContent="center" height="100%">
              チャットを選択してください
            </Box>
          )}
        </Box>
      </Flex>
    </Layout>
  );
};

export default ChatPage;
