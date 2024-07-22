import axios from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchMessages = async (conversationId) => {
  const response = await axios.get(`${apiUrl}/conversations/${conversationId}/messages`);
  return response.data;
};

export const sendMessage = async (conversationId, senderId, content) => {
  const response = await axios.post(`${apiUrl}/conversations/${conversationId}/messages`, {
    sender_id: senderId,
    content,
  });
  return response.data;
};

export const fetchUser = async (userId) => {
  const response = await axios.get(`${apiUrl}/users/${userId}`);
  return response.data;
};
