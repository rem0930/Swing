import { useEffect, useState } from "react";
import { Box, Flex, Text, Stack, Button, Spinner, useColorModeValue } from "@chakra-ui/react";
import axios from 'axios';
import { useRouter } from 'next/router';
import RecruitmentCard from '../components/RecruitmentCard';

const MainPage = () => {
  const [recruitments, setRecruitments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchRecruitments = async () => {
      try {
        const response = await axios.get('http://localhost:3000/recruitments');
        setRecruitments(response.data);
      } catch (error) {
        setError("There was an error fetching the recruitments!");
      } finally {
        setLoading(false);
      }
    };

    fetchRecruitments();
  }, []);

  const handleCreateRecruitment = () => {
    router.push('/recruitments/new');
  };

  return (
    <Box p="5" bg={useColorModeValue("gray.100", "gray.800")} minH="100vh">
      <Box as="header" mb="5">
        <Flex justifyContent="space-between" alignItems="center">
          <Text fontSize="4xl" fontWeight="bold">Recruitments</Text>
          <Button colorScheme="teal" variant="solid" onClick={handleCreateRecruitment}>
            Create Recruitment
          </Button>
        </Flex>
      </Box>

      {loading ? (
        <Flex justifyContent="center" alignItems="center" minH="60vh">
          <Spinner size="xl" />
        </Flex>
      ) : error ? (
        <Flex justifyContent="center" alignItems="center" minH="60vh">
          <Text color="red.500">{error}</Text>
        </Flex>
      ) : (
        <Stack spacing={8}>
          {recruitments.map(recruitment => (
            <RecruitmentCard key={recruitment.id} recruitment={recruitment} />
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default MainPage;
