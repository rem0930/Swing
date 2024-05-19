import { Box, Flex, Text, Badge, HStack, Icon, Link as ChakraLink } from '@chakra-ui/react';
import { FiMapPin, FiCalendar, FiClock } from 'react-icons/fi';
import NextLink from 'next/link';

const RecruitmentCard = ({ recruitment }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="lg"
      bg="white"
      mb={2}
      width="100%"
    >
      <Box p="6">
        <Flex alignItems="baseline" direction={{ base: "column", md: "row" }}>
          <Badge borderRadius="full" px="2" colorScheme="teal" mb={{ base: 2, md: 0 }}>
            {recruitment.status}
          </Badge>
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml={{ md: "2" }}
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
          <Text>{formatDate(recruitment.event_date)}</Text>
        </HStack>
        
        <HStack mt="3" spacing="4">
          <Icon as={FiClock} />
          <Text>{formatDate(recruitment.deadline)}</Text>
        </HStack>
      </Box>
    </Box>
  );
};

export default RecruitmentCard;
