import { useState, useEffect, useRef } from 'react';
// import { Box, VStack, Text, Flex } from '@chakra-ui/react';
// import MessageList from './MessageList';
// import MessageInput from './MessageInput';
// import { fetchMessages, sendMessage } from '../../utils/api';
// import { useWebSocket } from '../../utils/webSocket';

// const ConversationView = ({ conversation, userId }) => {
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const messagesEndRef = useRef(null);

//   const { lastMessage } = useWebSocket(`conversation_${conversation.id}`);

//   useEffect(() => {
//     fetchMessages(conversation.id)
//       .then(data => {
//         setMessages(data);
//         setLoading(false);
//       })
//       .catch(err => console.error('Failed to fetch messages:', err));
//   }, [conversation.id]);

//   useEffect(() => {
//     if (lastMessage) {
//       setMessages(prevMessages => [...prevMessages, lastMessage]);
//     }
//   }, [lastMessage]);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   const handleSendMessage = async (content) => {
//     try {
//       const newMessage = await sendMessage(conversation.id, content);
//       setMessages(prevMessages => [...prevMessages, newMessage]);
//     } catch (err) {
//       console.error('Failed to send message:', err);
//     }
//   };

//   return (
//     <Box height="100%" display="flex" flexDirection="column">
//       <Flex justify="space-between" align="center" p={4} borderBottom="1px solid" borderColor="gray.200">
//         <Text fontSize="xl" fontWeight="bold">{conversation.title}</Text>
//         <Text fontSize="sm" color="gray.500">
//           {conversation.participants.filter(p => p.id !== userId).map(p => p.name).join(', ')}
//         </Text>
//       </Flex>
//       <VStack flex={1} overflowY="auto" spacing={4} p={4}>
//         <MessageList messages={messages} currentUserId={userId} />
//         <div ref={messagesEndRef} />
//       </VStack>
//       <Box p={4}>
//         <MessageInput onSendMessage={handleSendMessage} />
//       </Box>
//     </Box>
//   );
// };

// export default ConversationView;