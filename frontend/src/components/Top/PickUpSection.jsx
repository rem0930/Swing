import { Box, Container, Heading, Text, Grid, GridItem, Link, Icon, Flex, Button, Spinner } from "@chakra-ui/react";
import { FaCalendarAlt, FaUser, FaTags } from "react-icons/fa";
import axios from 'axios';
import { useEffect, useState } from "react";
import { format } from 'date-fns';

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const PickUpSection = () => {
  const [recruitments, setRecruitments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const roleMapping = {
    member: 'メンバー募集',
    opponent: '対戦相手の募集',
    helper: '助っ人募集'
  };

  useEffect(() => {
    const fetchRecruitments = async () => {
      try {
        const response = await axios.get(`${apiUrl}/recruitments`);
        setRecruitments(response.data.filter(recruitment => recruitment.status === 'open'));
      } catch (error) {
        setError("募集情報の取得中にエラーが発生しました！");
      } finally {
        setLoading(false);
      }
    };

    fetchRecruitments();
  }, []);

  return (
    <Box as="section" py={20} bg="white">
      <Container maxW="container.lg" px={8}>
        <Heading as="h2" size="xl" mb={12} fontWeight="bold" textAlign="center" color="teal">
          PickUp !
        </Heading>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" minH="40vh">
            <Spinner size="xl" />
          </Box>
        ) : error ? (
          <Box display="flex" justifyContent="center" alignItems="center" minH="40vh">
            <Text color="red.500">{error}</Text>
          </Box>
        ) : (
          <>
            <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6}>
              {recruitments.slice(0, 3).map(recruitment => (
                <GridItem key={recruitment.id}>
                  <Box 
                    bg="white" 
                    p={6} 
                    rounded="lg" 
                    shadow="lg" 
                    transition="transform 0.3s, background-color 0.3s" 
                    _hover={{ transform: "translateY(-10px)", shadow: "2xl", bg: "teal.100" }}
                    border="1px solid" 
                    borderColor="teal.200"
                  >
                    <Link 
                      href={`/recruitments/${recruitment.id}`} 
                      fontWeight="bold" 
                      fontSize="lg" 
                      mb={2} 
                      display="block" 
                      color="teal.600" 
                      _hover={{ color: "teal.800", textDecoration: "underline" }}
                    >
                      {recruitment.title}
                    </Link>
                    <Flex align="center" color="gray.500" fontSize="sm" mb={2}>
                      <Icon as={FaCalendarAlt} mr={1} color="teal.500" />
                      {format(new Date(recruitment.event_date), 'yyyy年MM月dd日 HH:mm')}
                    </Flex>
                    <Flex align="center" color="gray.500" fontSize="sm" mb={2}>
                      <Icon as={FaUser} mr={1} color="teal.500" />
                      チーム名：{recruitment.team.name}
                    </Flex>
                    <Flex align="center" color="gray.500" fontSize="sm" mb={2}>
                      <Icon as={FaTags} mr={1} color="teal.500" />
                      募集の種類：{roleMapping[recruitment.role]}
                    </Flex>
                    <Text mb={4} noOfLines={1}>{recruitment.description}</Text>
                  </Box>
                </GridItem>
              ))}
            </Grid>
            <Flex justifyContent="flex-end" mt={4}>
              <Button 
                as={Link} 
                href="/" 
                colorScheme="teal" 
                variant="link" 
                fontWeight="bold" 
                fontSize="lg"
                _hover={{ textDecoration: "none", color: "teal.800" }}
              >
                全ての募集を見る
              </Button>
            </Flex>
          </>
        )}
      </Container>
    </Box>
  );
};

export default PickUpSection;
