import { Box, Button, Flex, HStack, Icon, Text } from '@chakra-ui/react';
import { FiCalendar, FiHeart } from 'react-icons/fi';

const RecruitmentFooter = ({ eventDate, onApply }) => {
  return (
    <Flex
      as="footer"
      position="fixed"
      bottom={0}
      left={0}
      width="100%"
      bg="white"
      py={4}
      boxShadow="lg"
      justifyContent="space-around"
      zIndex={1000}
      alignItems="center"
    >
      <HStack>
        <Icon as={FiCalendar} />
        <Text>Event Date: {new Date(eventDate).toLocaleDateString()}</Text>
      </HStack>
      <Button colorScheme="teal" size="lg" onClick={onApply}>
        応募する
      </Button>
      <Icon as={FiHeart} boxSize={6} />
    </Flex>
  );
};

export default RecruitmentFooter;
