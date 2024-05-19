// import { Box, Container, Heading, VStack, Spinner } from '@chakra-ui/react';
// import axios from 'axios';
// import { useEffect, useState } from 'react';
// import RecruitmentCards from '../components/Main/RecruitmentCards';

// const MainPage = () => {
//   const [recruitments, setRecruitments] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchRecruitments = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/recruitments');
//         setRecruitments(response.data);
//       } catch (error) {
//         console.error('Error fetching recruitments:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRecruitments();
//   }, []);

//   if (loading) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
//         <Spinner size="xl" />
//       </Box>
//     );
//   }

//   return (
//     <Container maxW="container.lg" py={8}>
//       <Heading size="md" mb={4}>Recruitments</Heading>
//       <VStack spacing={4} align="stretch">
//         {recruitments.map(recruitment => (
//           <RecruitmentCards key={recruitment.id} recruitment={recruitment} />
//         ))}
//       </VStack>
//     </Container>
//   );
// };

// export default MainPage;
