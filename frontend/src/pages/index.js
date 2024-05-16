import { Box, Flex, Text, Image, Badge, VStack, HStack, Icon, Stack, Link, Button } from '@chakra-ui/react';
import { FiMapPin, FiCalendar, FiClock } from 'react-icons/fi';
import axios from 'axios';
import { useEffect, useState } from 'react';
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
      mb={5}
    >
      {/* <Image src="https://via.placeholder.com/600x400" alt={recruitment.title} /> */}

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
          <Link mt="1" fontWeight="semibold" fontSize="xl" lineHeight="tight" isTruncated>
            {recruitment.title}
          </Link>
        </NextLink>

        <Box>
          {recruitment.description}
          <Box as="span" color="gray.600" fontSize="sm">
            / wk
          </Box>
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
    </Box>
  );
};

const MainPage = () => {
  const [recruitments, setRecruitments] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/recruitments')
      .then(response => {
        setRecruitments(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the recruitments!", error);
      });
  }, []);

  return (
    <Box p="5">
      <Box as="header" mb="5">
        <Flex justifyContent="space-between" alignItems="center">
          <Text fontSize="4xl" fontWeight="bold">Recruitments</Text>
          <NextLink href={'/recruitments/new'} passHref>
            <Link>
              <Button colorScheme="teal" variant="solid">Create Recruitment</Button>
            </Link>
          </NextLink>
        </Flex>
      </Box>

      <Stack spacing={8}>
        {recruitments.map(recruitment => (
          <RecruitmentCard key={recruitment.id} recruitment={recruitment} />
        ))}
      </Stack>
    </Box>
  );
};

export default MainPage;
