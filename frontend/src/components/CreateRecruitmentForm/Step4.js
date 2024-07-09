import { useState } from 'react';
import { VStack, FormControl, FormLabel, Input, Button, Heading, useToast } from '@chakra-ui/react';
import axios from 'axios';

const Step4 = ({ formData, setFormData, handleBack, handleNext }) => {
  const [location, setLocation] = useState(formData.location || '');
  const toast = useToast();

  const handleLocationChange = (e) => setLocation(e.target.value);

  const handleNextStep = async () => {
    const apiKey = 'YOUR_GOOGLE_MAPS_API_KEY';  // ここにGoogle Maps APIキーを設定
    try {
      const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${apiKey}`);
      const { lat, lng } = response.data.results[0].geometry.location;
      const address = response.data.results[0].formatted_address;

      setFormData({ ...formData, location: address, latitude: lat, longitude: lng });
      handleNext();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to get location data. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <VStack spacing={4}>
      <Heading as="h2" size="lg">場所を設定</Heading>
      <FormControl>
        <FormLabel>住所や地名を入力</FormLabel>
        <Input
          type="text"
          value={location}
          onChange={handleLocationChange}
          placeholder="住所や地名を入力"
        />
      </FormControl>
      <Button onClick={handleBack}>戻る</Button>
      <Button onClick={handleNextStep} colorScheme="teal">次へ</Button>
    </VStack>
  );
};

export default Step4;
