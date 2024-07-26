import Chat from '../../../components/Chat/Chat';

const ChatPage = ({ userId }) => {
  return (
    <Chat userId={userId} />
  );
};

export async function getServerSideProps(context) {
  const { userId } = context.params;
  return {
    props: {
      userId
    }
  };
}

export default ChatPage;
