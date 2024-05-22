import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Box, Flex, Image, Heading, Avatar, Text, Link, Spinner } from '@chakra-ui/react';
import ProgressIndicator from '../../components/CreateRecruitmentForm/ProgressIndicator';
import Step1 from '../../components/CreateRecruitmentForm/Step1';
import Step2 from '../../components/CreateRecruitmentForm/Step2';
import Step3 from '../../components/CreateRecruitmentForm/Step3';
import Step4 from '../../components/CreateRecruitmentForm/Step4';
import Step5 from '../../components/CreateRecruitmentForm/Step5';

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

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:3000/teams/${id}`)
        .then(response => {
          setTeam(response.data);
        })
        .catch(error => console.error("There was an error fetching the team data!", error));
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);
  const handleSubmit = () => {
    axios.post(`http://localhost:3000/teams/${id}/recruitments`, formData)
      .then(() => router.push(`/teams/${id}`))
      .catch(error => console.error(error));
  };

  if (!team) {
    return (
      <Flex direction="column" align="center" justify="center" minH="100vh" bg="gray.100">
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
    <Flex direction="column" align="center" justify="center" minH="100vh" bg="gray.100">
      <Box p={5} maxW="600px" w="100%" bg="white" borderRadius="md" boxShadow="lg" mx={2}>
        {team && (
          <Flex direction="column" align="center" mb={4}>
            <Avatar size="xl" src={team.profile_photo || '/default-profile.png'} mb={2} />
            <Heading size="lg">{team.name}</Heading>
            <Text fontSize="sm" color="gray.500">
              <Link href={`/teams/${team.id}`} color="teal.500">チームページへ戻る</Link>
            </Text>
          </Flex>
        )}
        <Image src="/banner.jpg" alt="Banner" borderRadius="md" mb={4} />
        <ProgressIndicator step={step} />
        {step === 1 && <Step1 formData={formData} setFormData={setFormData} handleNext={handleNext} />}
        {step === 2 && <Step2 formData={formData} handleChange={handleChange} handleBack={handleBack} handleNext={handleNext} />}
        {step === 3 && <Step3 formData={formData} handleChange={handleChange} handleBack={handleBack} handleNext={handleNext} />}
        {step === 4 && <Step4 formData={formData} handleChange={handleChange} handleBack={handleBack} handleNext={handleNext} />}
        {step === 5 && <Step5 formData={formData} handleBack={handleBack} handleSubmit={handleSubmit} />}
      </Box>
    </Flex>
  );
};

export default CreateRecruitmentForm;
