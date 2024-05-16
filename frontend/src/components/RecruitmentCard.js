import { Box, Flex, Text, Badge, HStack, Icon, Link as ChakraLink } from '@chakra-ui/react';
import { FiMapPin, FiCalendar, FiClock } from 'react-icons/fi';
import NextLink from 'next/link';

const RecruitmentCard = ({ recruitment }) => {
  const formattedEventDate = new Date(recruitment.event_date).toLocaleDateString();
  const formattedDeadline = new Date(recruitment.deadline).toLocaleDateString();

  return (
    <Box
      maxW="lg"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="lg"
      bg="white"
      mb={5}
    >
      <Box p="6">
        <Flex alignItems="baseline">
          <Badge borderRadius="full" px="2" colorScheme="teal">
            {recruitment.status}
          </Badge>
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            {recruitment.role}
          </Box>
        </Flex>

        <NextLink href={`/recruitments/${recruitment.id}`} passHref>
          <ChakraLink mt="1" fontWeight="semibold" fontSize="xl" lineHeight="tight" isTruncated>
            {recruitment.title}
          </ChakraLink>
        </NextLink>

        <Box mt="2">
          {recruitment.description}
        </Box>

        <HStack mt="3" spacing="4">
          <Icon as={FiMapPin} />
          <Text>{recruitment.location_id}</Text>
        </HStack>
        
        <HStack mt="3" spacing="4">
          <Icon as={FiCalendar} />
          <Text>{formattedEventDate}</Text>
        </HStack>
        
        <HStack mt="3" spacing="4">
          <Icon as={FiClock} />
          <Text>{formattedDeadline}</Text>
        </HStack>
      </Box>
    </Box>
  );
};

export default RecruitmentCard;
