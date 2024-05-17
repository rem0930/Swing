// import { useEffect, useState } from "react";
// import { Box, Grid, GridItem, Text, Stack, Button, Spinner, useColorModeValue } from "@chakra-ui/react";
// import axios from 'axios';
// import { useRouter } from 'next/router';
// import RecruitmentCard from '../components/RecruitmentCard';
// import CustomCalendar from '../components/CustomCalendar';
// import EditFilterButton from '../components/EditFilterButton';
// import { format } from 'date-fns';

// const Main = () => {
//   const [recruitments, setRecruitments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [filteredRecruitments, setFilteredRecruitments] = useState([]);
//   const router = useRouter();

//   useEffect(() => {
//     const fetchRecruitments = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/recruitments');
//         setRecruitments(response.data);
//         setFilteredRecruitments(response.data);
//       } catch (error) {
//         setError("There was an error fetching the recruitments!");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRecruitments();
//   }, []);

//   const handleCreateRecruitment = () => {
//     router.push('/recruitments/new');
//   };

//   useEffect(() => {
//     if (selectedDate) {
//       const filtered = recruitments.filter(recruitment => {
//         const eventDate = new Date(recruitment.event_date);
//         return format(eventDate, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');
//       });
//       setFilteredRecruitments(filtered);
//     } else {
//       setFilteredRecruitments(recruitments);
//     }
//   }, [selectedDate, recruitments]);

//   const handleEditFilter = () => {
//     // フィルター編集のロジックをここに追加します
//   };

//   return (
//     <Box p="5" bg="#ffffff" minH="100vh" position="relative">
//       <Box as="header" mb="5">
//         <Grid templateColumns="1fr auto" alignItems="center">
//           <Text fontSize="4xl" fontWeight="bold">Recruitments</Text>
//           <Button colorScheme="teal" variant="solid" onClick={handleCreateRecruitment}>
//             Create Recruitment
//           </Button>
//         </Grid>
//       </Box>

//       <Grid templateColumns={{ base: "1fr", md: "3fr 1fr" }} gap={6} alignItems="flex-start">
//         <GridItem>
//           {loading ? (
//             <Box display="flex" justifyContent="center" alignItems="center" minH="60vh">
//               <Spinner size="xl" />
//             </Box>
//           ) : error ? (
//             <Box display="flex" justifyContent="center" alignItems="center" minH="60vh">
//               <Text color="red.500">{error}</Text>
//             </Box>
//           ) : (
//             <Stack spacing={8}>
//               {filteredRecruitments.map(recruitment => (
//                 <RecruitmentCard key={recruitment.id} recruitment={recruitment} />
//               ))}
//             </Stack>
//           )}
//         </GridItem>

//         <GridItem>
//           <Box p="4" borderRadius="md" border="1px solid #c0c0c0">
//             <CustomCalendar selectedDate={selectedDate} onChange={setSelectedDate} />
//           </Box>
//         </GridItem>
//       </Grid>

//       <EditFilterButton onClick={handleEditFilter} />
//     </Box>
//   );
// };

// export default Main;
