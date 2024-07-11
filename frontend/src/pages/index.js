import { useEffect, useState } from "react";
import { Box, Flex, Text, Spinner, useBreakpointValue } from "@chakra-ui/react";
import axios from 'axios';
import RecruitmentCards from '../components/Main/RecruitmentCards';
import CustomCalendar from '../components/Main/CustomCalendar';
import EditFilterButton from '../components/Main/EditFilterButton';
import CreateRecruitmentButton from '../components/CreateRecruitmentButton';
import Layout from '../components/Layout';
import { format } from 'date-fns';
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const IndexPage = () => {
  const [recruitments, setRecruitments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedRole, setSelectedRole] = useState('all');
  const [showOnlyOpen, setShowOnlyOpen] = useState(false);
  const [filteredRecruitments, setFilteredRecruitments] = useState([]);

  const isMobileView = useBreakpointValue({ base: true, md: false });

  useEffect(() => {
    // console.log(apiUrl)
    const fetchRecruitments = async () => {
      try {
        const response = await axios.get(`${apiUrl}/recruitments`);
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
    let filtered = [...recruitments];

    if (selectedDate) {
      filtered = filtered.filter(recruitment => {
        const eventDate = new Date(recruitment.event_date);
        return format(eventDate, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');
      });
    }

    if (selectedRole !== 'all') {
      filtered = filtered.filter(recruitment => recruitment.role === selectedRole);
    }

    if (showOnlyOpen) {
      filtered = filtered.filter(recruitment => recruitment.status === 'open');
    }

    setFilteredRecruitments(filtered);
  }, [selectedDate, selectedRole, showOnlyOpen, recruitments]);

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
              <RecruitmentCards
                recruitments={filteredRecruitments}
                selectedRole={selectedRole}
                setSelectedRole={setSelectedRole}
                showOnlyOpen={showOnlyOpen}
                setShowOnlyOpen={setShowOnlyOpen}
                isMobileView={isMobileView}
              />
            )}
          </Box>
          {!isMobileView && (
            <Box flex={{ base: "1", md: "2" }} display={{ base: "none", md: "block" }}>
              <Box p="4" borderRadius="md" border="1px solid #c0c0c0" width="fit-content" mx="auto" mt={8}>
                <CustomCalendar selectedDate={selectedDate} onChange={setSelectedDate} />
              </Box>
            </Box>
          )}
        </Flex>
        {isMobileView && (
          <Box position="fixed" bottom="20px" left="50%" transform="translateX(-50%)">
            <EditFilterButton
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              selectedRole={selectedRole}
              setSelectedRole={setSelectedRole}
              showOnlyOpen={showOnlyOpen}
              setShowOnlyOpen={setShowOnlyOpen}
            />
          </Box>
        )}
        <CreateRecruitmentButton />
      </Box>
    </Layout>
  );
};

export default IndexPage;
