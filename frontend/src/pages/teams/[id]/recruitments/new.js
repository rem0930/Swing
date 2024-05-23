import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Box, Flex, Image, Spinner } from '@chakra-ui/react';
import ProgressIndicator from '../../../../components/CreateRecruitmentForm/ProgressIndicator';
import Step1 from '../../../../components/CreateRecruitmentForm/Step1';
import Step2 from '../../../../components/CreateRecruitmentForm/Step2';
import Step3 from '../../../../components/CreateRecruitmentForm/Step3';
import Step4 from '../../../../components/CreateRecruitmentForm/Step4';
import Step5 from '../../../../components/CreateRecruitmentForm/Step5';
import Layout from '../../../../components/Layout';

const CreateRecruitmentForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    event_date: '',
    deadline: '',
    role: 'member'
  });
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchTeamData = async () => {
      if (id) {
        try {
          const response = await axios.get(`http://localhost:3000/teams/${id}`);
          setTeam(response.data);
        } catch (error) {
          console.error("There was an error fetching the team data!", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchTeamData();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`http://localhost:3000/teams/${id}/recruitments`, formData,{
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
      });
    router.push(`/teams/${id}`);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <Flex direction="column" align="center" justify="center" minH="100vh" bg="gray.100">
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (!team) {
    return (
      <Flex direction="column" align="center" justify="center" minH="100vh" bg="gray.100">
        <Box>チーム情報が見つかりません。</Box>
      </Flex>
    );
  }

  return (
    <Layout>
      <Flex direction="column" align="center" justify="center" minH="100vh" bg="gray.100" p={{ base: 2, md: 4 }} mt={-20}>
        <Box p={5} maxW={{ base: "90%", md: "600px" }} w="100%" bg="white" borderRadius="md" boxShadow="lg" mx={2}>
          <Image src="/banner.jpg" alt="Banner" borderRadius="md" mb={4} />
          <ProgressIndicator step={step} />
          {step === 1 && <Step1 formData={formData} setFormData={setFormData} handleNext={handleNext} />}
          {step === 2 && <Step2 formData={formData} handleChange={handleChange} handleBack={handleBack} handleNext={handleNext} />}
          {step === 3 && <Step3 formData={formData} handleChange={handleChange} handleBack={handleBack} handleNext={handleNext} />}
          {step === 4 && <Step4 formData={formData} handleChange={handleChange} handleBack={handleBack} handleNext={handleNext} />}
          {step === 5 && <Step5 formData={formData} handleBack={handleBack} handleSubmit={handleSubmit} />}
        </Box>
      </Flex>
    </Layout>
  );
};

export default CreateRecruitmentForm;
