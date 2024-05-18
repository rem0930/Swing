import { useEffect, useState } from "react";
import { Box, Flex, Text, Button, Spinner } from "@chakra-ui/react";
import axios from 'axios';
import { useRouter } from 'next/router';
import RecruitmentCard from '../components/RecruitmentCard';
import CustomCalendar from '../components/CustomCalendar';
import EditFilterButton from '../components/EditFilterButton'; // 編集フィルタボタン（レスポンシブ対応用）
import { format } from 'date-fns';
import Layout from "../components/Layout";

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

  const handleCreateRecruitment = () => {
    router.push('/recruitments/new');
  };

  return (
    <Layout>
      <Box p="5" bg="#ffffff" minH="100vh" position="relative">
        <Box as="header" mb="5">
          <Flex justify="space-between" align="center">
            <Text fontSize="4xl" fontWeight="bold">募集一覧</Text>
            <Button colorScheme="teal" variant="solid" onClick={handleCreateRecruitment}>
              募集を作成
            </Button>
          </Flex>
        </Box>

        <Flex direction={{ base: "column", md: "row" }} justify="space-between" mx={4} gap={4}>
          <Box flex={{ base: "1", md: "3" }}>
            <RecruitmentCard recruitments={filteredRecruitments} />
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
      </Box>
    </Layout>
  );
};

export default MainPage;
