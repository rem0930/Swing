import React from "react";
import { Box, Text, Flex, Input, Button } from "@chakra-ui/react";
import ReactAvatar from 'react-avatar';

const ChatMessage = ({ userId, conversation, messages, newMessage, setNewMessage, handleSendMessage }) => {
  return (
    <Box>
      <Text fontWeight="bold" fontSize="xl" mb="4" color="teal.500">{conversation.recruitment_title}</Text>
      <Box mb="4" p="4" borderWidth="1px" borderRadius="lg" borderColor="gray.200" maxH="60vh" overflowY="auto">
        {messages.map(message => (
          <Flex key={message.id} mb="4" justify={message.sender_id === parseInt(userId) ? 'flex-end' : 'flex-start'}>
            {message.sender_id !== parseInt(userId) && (
              <Box mr="3">
                {message.sender.profile_photo_url ? (
                  <ReactAvatar src={message.sender.profile_photo_url} name={message.sender.user_name} round={true} size="40" />
                ) : (
                  <ReactAvatar name={message.sender.user_name} round={true} size="40" />
                )}
              </Box>
            )}
            <Box
              bg={message.sender_id === parseInt(userId) ? 'teal.500' : 'gray.100'}
              color={message.sender_id === parseInt(userId) ? 'white' : 'black'}
              p="3"
              borderRadius="md"
              maxWidth="70%"
            >
              <Text>{message.content}</Text>
              <Text fontSize="sm" color={message.sender_id === parseInt(userId) ? 'teal.200' : 'gray.500'}>
                {new Date(message.created_at).toLocaleString()}
              </Text>
            </Box>
          </Flex>
        ))}
      </Box>
      <Flex>
        <Input
          placeholder="メッセージを入力"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          mr="3"
        />
        <Button colorScheme="teal" onClick={handleSendMessage}>送信</Button>
      </Flex>
    </Box>
  );
};

export default ChatMessage;
