import { Box, Flex, Text, Badge, HStack, Icon, Link as ChakraLink, Spinner, VStack } from '@chakra-ui/react';
import { FiMapPin, FiCalendar, FiClock } from 'react-icons/fi';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NextLink from 'next/link';
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);
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
    const fetchSavedJobs = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`${apiUrl}/favorites`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSavedJobs(response.data);
      } catch (error) {
        setError('Failed to fetch saved jobs');
      } finally {
        setLoading(false);
      }
    };

    fetchSavedJobs();
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
    <VStack spacing={4} width="100%" mt={-4}>
      {savedJobs.map((favorite) => {
        const recruitment = favorite.recruitment;
        const formattedEventDate = new Date(recruitment.event_date).toLocaleDateString();
        const formattedDeadline = new Date(recruitment.deadline).toLocaleDateString();

        return (
          <NextLink href={`/recruitments/${recruitment.id}`} passHref key={favorite.id}>
            <ChakraLink
              _hover={{ textDecoration: 'none' }}
              width="100%"
              _focus={{ boxShadow: 'none' }}
            >
              <Box
                borderWidth="1px"
                borderRadius="lg"
                borderColor="gray.200"
                overflow="hidden"
                boxShadow="lg"
                bg="white"
                mb={2}
                transition="all 0.2s"
                _hover={{ transform: 'translateY(-5px)', boxShadow: 'xl' }}
                p={4}
              >
                <Flex alignItems="baseline" direction={{ base: "column", md: "row" }} mb={2}>
                  <Badge borderRadius="full" px="2" colorScheme={statusColorScheme[recruitment.status]}>
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

                <Text mt="1" fontWeight="semibold" fontSize="lg" lineHeight="tight" isTruncated>
                  {recruitment.title}
                </Text>

                <Box mt="2" noOfLines={1} fontSize="sm" color="gray.600">
                  {recruitment.description}
                </Box>

                <HStack mt="3" spacing="4" fontSize="sm" color="gray.600">
                  <Icon as={FiMapPin} />
                  <Text>場所: {recruitment.address}</Text>
                </HStack>
                
                <HStack mt="3" spacing="4" fontSize="sm" color="gray.600">
                  <Icon as={FiCalendar} />
                  <Text>日程: {formattedEventDate}</Text>
                </HStack>
                
                <HStack mt="3" spacing="4" fontSize="sm" color="gray.600">
                  <Icon as={FiClock} />
                  <Text>締切: {formattedDeadline}</Text>
                </HStack>
              </Box>
            </ChakraLink>
          </NextLink>
        );
      })}
    </VStack>
  );
};

export default SavedJobs;
