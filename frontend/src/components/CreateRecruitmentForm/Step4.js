import { useState, useEffect } from 'react';
import { VStack, FormControl, Input, Button, Heading, useToast } from '@chakra-ui/react';
import axios from 'axios';

const Step4 = ({ formData, setFormData, handleBack, handleNext }) => {
  const [address, setAddress] = useState(formData.address || '');
  const toast = useToast();

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GEOCODING_API_KEY;
    console.log('Google Maps API Key:', apiKey ? 'Set correctly' : 'Not set');
  }, []);

  const handleAddressChange = (e) => setAddress(e.target.value);

  const handleNextStep = async () => {
    const apiKey = process.env.NEXT_PUBLIC_GEOCODING_API_KEY;
    if (!apiKey) {
      console.error('Google Maps API Key is not set');
      toast({
        title: 'エラー',
        description: 'APIキーが設定されていません。',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      const encodedAddress = encodeURIComponent(address);
      const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`);
      if (response.data.status === 'OK') {
        const { lat, lng } = response.data.results[0].geometry.location;
        const address = response.data.results[0].formatted_address;

        setFormData({ ...formData, address: address, latitude: lat, longitude: lng });
        handleNext();
      } else {
        console.error('Geocoding failed:', response.data);
        throw new Error('Geocoding failed');
      }
    } catch (error) {
      console.error('Error fetching address data:', error.response ? error.response.data : error.message);
      toast({
        title: 'エラー',
        description: '位置情報の取得に失敗しました。再試行してください。',
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
        <Input
          type="text"
          value={address}
          onChange={handleAddressChange}
          placeholder="住所や地名を入力"
        />
      </FormControl>
      <Button onClick={handleBack}>戻る</Button>
      <Button onClick={handleNextStep} colorScheme="teal">次へ</Button>
    </VStack>
  );
};

export default Step4;
