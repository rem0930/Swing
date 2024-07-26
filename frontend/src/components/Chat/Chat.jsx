import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Text, Spinner, Flex, IconButton } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useRouter } from 'next/router';
import { Avatar as ChakraAvatar } from "@chakra-ui/react";
import ReactAvatar from 'react-avatar';
import ChatMessage from "./ChatMessage";

const Chat = ({ userId }) => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchConversations = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError("認証トークンが見つかりません。");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/conversations/by_user`, {
          params: { user_id: userId },
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.data.message) {
          setError(response.data.message);
        } else {
          console.log("Conversations fetched successfully:", response.data);
          setConversations(response.data);
        }
      } catch (error) {
        console.error("Error fetching conversations:", error);
        setError("会話情報の取得中にエラーが発生しました！");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchConversations();
    } else {
      setError("ユーザーIDが見つかりません。");
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (selectedConversation) {
      const fetchMessages = async () => {
        try {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/conversations/${selectedConversation.id}/messages`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });
          setMessages(response.data);
        } catch (error) {
          console.error("Error fetching messages:", error);
          setError("メッセージの取得中にエラーが発生しました！");
        }
      };
      fetchMessages();
    }
  }, [selectedConversation]);

  const handleConversationClick = (conversation) => {
    setSelectedConversation(conversation);
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/conversations/${selectedConversation.id}/messages`, {
        content: newMessage,
        recipient_id: selectedConversation.participants.find(p => p.id !== parseInt(userId)).id
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setMessages([...messages, response.data]);
      setNewMessage('');
    } catch (error) {
      console.error("Error sending message:", error);
      setError("メッセージの送信中にエラーが発生しました！");
    }
  };

  return (
    <Box p="5" bg="#ffffff" minH="100vh">
      <Flex>
        {/* Left Side - Conversation List */}
        <Box w="30%" p="4" borderRight="1px solid" borderColor="gray.200">
          <IconButton
            icon={<ArrowBackIcon />}
            aria-label="Back"
            onClick={() => router.back()}
            mb="4"
            colorScheme="teal"
          />
          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" minH="60vh">
              <Spinner size="xl" color="teal.500" />
            </Box>
          ) : error ? (
            <Box display="flex" justifyContent="center" alignItems="center" minH="60vh">
              <Text color="red.500">{error}</Text>
            </Box>
          ) : (
            <Box>
              {conversations.length > 0 ? (
                conversations.map(conversation => (
                  <Box
                    key={conversation.id}
                    p="4"
                    borderWidth="1px"
                    borderRadius="lg"
                    mb="4"
                    borderColor="gray.200"
                    cursor="pointer"
                    onClick={() => handleConversationClick(conversation)}
                  >
                    <Text fontWeight="bold" mb="2" color="teal.500">{conversation.recruitment_title}</Text>
                    {conversation.participants
                      .filter(participant => participant.id !== parseInt(userId))
                      .map(participant => (
                        <Flex key={participant.id} alignItems="center" mb="2">
                          {participant.profile_photo_url && participant.profile_photo_url.url ? (
                            <ChakraAvatar src={participant.profile_photo_url.url} name={participant.user_name} mr="3" />
                          ) : (
                            <ReactAvatar name={participant.user_name} round={true} size="40" />
                          )}
                          <Text ml="3" color="gray.600">{participant.user_name}</Text>
                        </Flex>
                      ))}
                  </Box>
                ))
              ) : (
                <Text>会話がありません</Text>
              )}
            </Box>
          )}
        </Box>

        {/* Right Side - Selected Conversation */}
        <Box w="70%" p="4">
          {selectedConversation ? (
            <ChatMessage
              userId={userId}
              conversation={selectedConversation}
              messages={messages}
              newMessage={newMessage}
              setNewMessage={setNewMessage}
              handleSendMessage={handleSendMessage}
            />
          ) : (
            <Text>会話を選択してください</Text>
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export default Chat;
