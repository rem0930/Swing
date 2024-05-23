import { useEffect, useState } from "react";
import { Box, Flex, Text, Button, Spinner } from "@chakra-ui/react";
import axios from 'axios';
import { useRouter } from 'next/router';
import RecruitmentCards from '../components/Main/RecruitmentCards';
import CustomCalendar from '../components/CustomCalendar';
import EditFilterButton from '../components/Main/EditFilterButton';
import Layout from '../components/Layout'; // Layoutをインポート
import CreateRecruitmentButton from '../components/CreateRecruitmentButton';
import { format } from 'date-fns';

const indexPage = () => {
  const [recruitments, setRecruitments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [filteredRecruitments, setFilteredRecruitments] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchRecruitments = async () => {
      try {
        const response = await axios.get('http://localhost:3000/recruitments');
        setRecruitments(response.data);
        setFilteredRecruitments(response.data);
        console.log(response.data);
      } catch (error) {
        setError("募集情報の取得中にエラーが発生しました！");
      } finally {
        setLoading(false);
      }
    };

    fetchRecruitments();
  }, []);

  useEffect(() => {
    let filtered = recruitments;
    if (selectedDate) {
      filtered = filtered.filter(recruitment => {
        const eventDate = new Date(recruitment.event_date);
        return format(eventDate, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');
      });
    }
    setFilteredRecruitments(filtered);
  }, [selectedDate, recruitments]);

  return (
    <Layout>
      <Box p="5" bg="#ffffff" minH="100vh" position="relative">
        <Flex direction={{ base: "column", md: "row" }} justify="space-between" mx={4} gap={4}>
          <Box flex={{ base: "1", md: "3" }}>
            {loading ? (
              <Box display="flex" justifyContent="center" alignItems="center" minH="60vh">
                <Spinner size="xl" />
              </Box>
            ) : error ? (
              <Box display="flex" justifyContent="center" alignItems="center" minH="60vh">
                <Text color="red.500">{error}</Text>
              </Box>
            ) : (
              <RecruitmentCards recruitments={filteredRecruitments} />
            )}
          </Box>
          <Box flex={{ base: "1", md: "2" }} display={{ base: "none", md: "block" }}>
            <Box p="4" borderRadius="md" border="1px solid #c0c0c0" width="fit-content" mx="auto" mt={8}>
              <CustomCalendar selectedDate={selectedDate} onChange={setSelectedDate} />
            </Box>
          </Box>
        </Flex>
        <Box display={{ base: "block", md: "none" }} position="fixed" bottom="20px" left="50%" transform="translateX(-50%)">
          <EditFilterButton onClick={() => { /* カレンダー表示のためのロジックをここに記載 */ }} />
        </Box>
        <CreateRecruitmentButton />
      </Box>
    </Layout>
  );
};

export default indexPage;