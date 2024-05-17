import { useEffect, useState } from "react";
import { Box, Flex, Text, Stack, Button, Spinner } from "@chakra-ui/react";
import axios from 'axios';
import { useRouter } from 'next/router';
import RecruitmentCard from '../components/RecruitmentCard';
import CustomCalendar from '../components/CustomCalendar';
import { format } from 'date-fns';

const MainPage = () => {
  const [recruitments, setRecruitments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [filteredRecruitments, setFilteredRecruitments] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchRecruitments = async () => {
      try {
        const response = await axios.get('http://localhost:3000/recruitments');
        setRecruitments(response.data);
        setFilteredRecruitments(response.data);
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

  useEffect(() => {
    if (selectedDate) {
      const filtered = recruitments.filter(recruitment => {
        const eventDate = new Date(recruitment.event_date);
        return format(eventDate, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');
      });
      setFilteredRecruitments(filtered);
    } else {
      setFilteredRecruitments(recruitments);
    }
  }, [selectedDate, recruitments]);

  return (
    <Box p="5" bg="#ffffff" minH="100vh" position="relative">
      <Box as="header" mb="5">
        <Flex justify="space-between" align="center">
          <Text fontSize="4xl" fontWeight="bold">Recruitments</Text>
          <Button colorScheme="teal" variant="solid" onClick={handleCreateRecruitment}>
            Create Recruitment
          </Button>
        </Flex>
      </Box>

      <Flex direction="row" align="flex-start" justify="space-between" mx={4}>
        <Box flex="3">
          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" minH="60vh">
              <Spinner size="xl" />
            </Box>
          ) : error ? (
            <Box display="flex" justifyContent="center" alignItems="center" minH="60vh">
              <Text color="red.500">{error}</Text>
            </Box>
          ) : (
            <Stack spacing={4}>
              {filteredRecruitments.map(recruitment => (
                <RecruitmentCard key={recruitment.id} recruitment={recruitment} />
              ))}
            </Stack>
          )}
        </Box>
        <Box flex="1" mr="80px">
          <Box p="4" borderRadius="md" border="1px solid #c0c0c0">
            <CustomCalendar selectedDate={selectedDate} onChange={setSelectedDate} />
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default MainPage;
