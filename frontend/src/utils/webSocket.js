import { createConsumer } from "@rails/actioncable";

let consumer;

export const initializeWebSocket = (token) => {
  consumer = createConsumer(`${process.env.NEXT_PUBLIC_API_BASE_URL}/cable?token=${token}`);
};

export const getConsumer = () => consumer;
