import { Box, Button, Flex, HStack, Icon, Text, VStack, Spacer } from '@chakra-ui/react';
import { FiCalendar } from 'react-icons/fi';
import SaveButton from '../SaveButton';

const RecruitmentFooter = ({ eventDate, onApply, isOwnTeam, isApplied, status, recruitmentId, title }) => {
  return (
    <Flex
      as="footer"
      position="fixed"
      bottom={0}
      left={0}
      width="100%"
      bg="white"
      py={4}
      px={8}
      boxShadow="lg"
      justifyContent="space-between"
      zIndex={1000}
      alignItems="center"
      height="80px" // フッターの高さを固定
    >
      <VStack align="start">
        <HStack>
          <Icon as={FiCalendar} />
          <Text>開催日時: {new Date(eventDate).toLocaleDateString()}</Text>
        </HStack>
        <Text fontWeight="bold">{title}</Text>
      </VStack>
      <HStack spacing={4}>
        <SaveButton recruitmentId={recruitmentId} />
        {status === 'closed' ? (
          <Button colorScheme="gray" size="lg" isDisabled>
            募集終了
          </Button>
        ) : isOwnTeam ? (
          <Button colorScheme="red" size="lg" onClick={onApply}>
            募集を締め切る
          </Button>
        ) : isApplied ? (
          <Button colorScheme="gray" size="lg" isDisabled>
            応募済み
          </Button>
        ) : (
          <Button colorScheme="teal" size="lg" onClick={onApply}>
            応募する
          </Button>
        )}
      </HStack>
    </Flex>
  );
};

export default RecruitmentFooter;
