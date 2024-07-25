import React, { useState, useCallback } from 'react';
import { Box, Input, Button, useToast } from '@chakra-ui/react';
import { sendMessage } from '../../context/UserContext';

const MessageInput = ({ conversationId, recipientId, onMessageSent }) => {
  const [messageContent, setMessageContent] = useState('');
  const [isSending, setIsSending] = useState(false);
  const toast = useToast();

  const handleSendMessage = useCallback(async () => {
    if (!recipientId) {
      toast({
        title: "エラー",
        description: "受信者IDが見つかりません",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (!messageContent.trim()) {
      toast({
        title: "警告",
        description: "メッセージを入力してください",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsSending(true);

    try {
      sendMessage({
        content: messageContent,
        recipient_id: recipientId,
        conversation_id: conversationId,
      });

      setMessageContent('');
      onMessageSent({
        content: messageContent,
        sender_id: null,  // 送信者情報がわかれば設定
        recipient_id: recipientId,
        conversation_id: conversationId,
        created_at: new Date().toISOString(),
      });

      toast({
        title: "成功",
        description: "メッセージが送信されました",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Failed to send message:', error);
      toast({
        title: "エラー",
        description: "メッセージの送信に失敗しました",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsSending(false);
    }
  }, [conversationId, recipientId, messageContent, onMessageSent, toast]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Box display="flex" mt={4}>
      <Input
        value={messageContent}
        onChange={(e) => setMessageContent(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="メッセージを入力..."
        disabled={isSending}
      />
      <Button 
        colorScheme="teal" 
        onClick={handleSendMessage} 
        ml={2} 
        isLoading={isSending}
        loadingText="送信中"
      >
        送信
      </Button>
    </Box>
  );
};

export default MessageInput;
