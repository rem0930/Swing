import { Box, Input, Button, Flex } from '@chakra-ui/react';
import { useState } from 'react';

const ChatFooter = ({ conversationId }) => {
  const [message, setMessage] = useState('');

  const sendMessage = () => {
    // ここにメッセージ送信ロジックを追加
    setMessage('');
  };

  return (
    <Flex p={4} borderTop="1px solid #ddd" bg="white">
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="メッセージを入力"
        mr={2}
        bg="gray.100"
      />
      <Button colorScheme="teal" onClick={sendMessage}>送信</Button>
    </Flex>
  );
};

export default ChatFooter;
