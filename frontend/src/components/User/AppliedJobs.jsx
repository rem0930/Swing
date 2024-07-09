import { Box, Flex, Text, Badge, HStack, Icon, Link as ChakraLink, Spinner, VStack } from '@chakra-ui/react';
import { FiMapPin, FiCalendar, FiClock } from 'react-icons/fi';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NextLink from 'next/link';
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const AppliedJobs = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const roleMapping = {
    member: 'メンバー募集',
    opponent: '対戦相手の募集',
    helper: '助っ人募集'
  };

  const statusMapping = {
    open: '募集中',
    closed: '締切'
  };

  const statusColorScheme = {
    open: 'teal',
    closed: 'red'
  };

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`${apiUrl}/applications`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAppliedJobs(response.data);
      } catch (error) {
        setError('Failed to fetch applied jobs');
      } finally {
        setLoading(false);
      }
    };

    fetchAppliedJobs();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <Spinner size="xl" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <Text color="red.500">{error}</Text>
      </Box>
    );
  }

  return (
    <VStack spacing={4} width="100%">
      {appliedJobs.map((application) => {
        const recruitment = application.recruitment;
        const formattedEventDate = new Date(recruitment.event_date).toLocaleDateString();
        const formattedDeadline = new Date(recruitment.deadline).toLocaleDateString();

        return (
          <Box
            key={application.id}
            borderWidth="1px"
            borderRadius="lg"
            borderColor="gray.200"
            overflow="hidden"
            boxShadow="lg"
            bg="white"
            mb={2}
            width="100%"
          >
            <Box p="6">
              <Flex alignItems="baseline" direction={{ base: "column", md: "row" }} ml={-1}>
                <Badge borderRadius="full" px="2" colorScheme={statusColorScheme[recruitment.status]} mb={1}>
                  {statusMapping[recruitment.status]}
                </Badge>
                <Box
                  color="gray.500"
                  fontWeight="semibold"
                  letterSpacing="wide"
                  fontSize="xs"
                  textTransform="uppercase"
                  ml={{ md: "2" }}
                >
                  {roleMapping[recruitment.role]}
                </Box>
              </Flex>

              <NextLink href={`/recruitments/${recruitment.id}`} passHref>
                <ChakraLink mt="1" fontWeight="semibold" fontSize="xl" lineHeight="tight" isTruncated>
                  {recruitment.title}
                </ChakraLink>
              </NextLink>

              <Box mt="2" noOfLines={1}>
                {recruitment.description}
              </Box>

              <HStack mt="3" spacing="4">
                <Icon as={FiMapPin} />
                <Text>場所: {recruitment.address}</Text>
              </HStack>
              
              <HStack mt="3" spacing="4">
                <Icon as={FiCalendar} />
                <Text>日程: {formattedEventDate}</Text>
              </HStack>
              
              <HStack mt="3" spacing="4">
                <Icon as={FiClock} />
                <Text>締切: {formattedDeadline}</Text>
              </HStack>
            </Box>
          </Box>
        );
      })}
    </VStack>
  );
};

export default AppliedJobs;
