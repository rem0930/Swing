import React, { useState } from 'react';
import { Box, Input, Button } from '@chakra-ui/react';
import axios from 'axios';
import { useUser } from '../../context/UserContext';

const MessageInput = ({ conversationId, onMessageSent }) => {
  const { user } = useUser();
  const [message, setMessage] = useState('');

  const handleSendMessage = async () => {
    try {
      await axios.post(
        `/api/v1/conversations/${conversationId}/messages`,
        { content: message },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setMessage('');
      onMessageSent();
    } catch (error) {
      console.error('Failed to send message', error);
    }
  };

  return (
    <Box mt={4}>
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="メッセージを入力"
      />
      <Button mt={2} onClick={handleSendMessage}>
        送信
      </Button>
    </Box>
  );
};

export default MessageInput;
