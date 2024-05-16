import { Box, Heading, Text, Badge, HStack, Icon, Link, Flex } from '@chakra-ui/react';
import { FiMapPin, FiCalendar, FiClock } from 'react-icons/fi';
import NextLink from 'next/link';

const RecruitmentCard = ({ recruitment }) => {
  return (
    <Box
      maxW="lg"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="lg"
      bg="white"
      p={6}
    >
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
        <Link mt="1" fontWeight="semibold" fontSize="xl" lineHeight="tight" isTruncated>
          {recruitment.title}
        </Link>
      </NextLink>

      <Box>
        {recruitment.description}
      </Box>

      <HStack mt="3">
        <Icon as={FiMapPin} />
        <Text>{recruitment.location_id}</Text>
      </HStack>
      
      <HStack mt="3" spacing="4">
        <Icon as={FiCalendar} />
        <Text>{new Date(recruitment.event_date).toLocaleDateString()}</Text>
      </HStack>
      
      <HStack mt="3" spacing="4">
        <Icon as={FiClock} />
        <Text>{new Date(recruitment.deadline).toLocaleDateString()}</Text>
      </HStack>
    </Box>
  );
};

export default RecruitmentCard;
