import React, { useState, useEffect } from 'react';
import { VStack, FormControl, FormLabel, Input, Button, Heading } from '@chakra-ui/react';

const Step5 = ({ initialFormData, handleChange, handleBack, handleNext }) => {
  const [formData, setFormData] = useState({
    event_date: initialFormData?.event_date || new Date().toISOString().slice(0, 16),
    deadline: initialFormData?.deadline || new Date().toISOString().slice(0, 16),
  });

  useEffect(() => {
    if (initialFormData) {
      setFormData({
        event_date: initialFormData.event_date || new Date().toISOString().slice(0, 16),
        deadline: initialFormData.deadline || new Date().toISOString().slice(0, 16),
      });
    }
  }, [initialFormData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
    handleChange(e);
  };

  return (
    <VStack spacing={4}>
      <Heading as="h2" size="lg">日時設定</Heading>
      <FormControl>
        <FormLabel>開催日時</FormLabel>
        <Input 
          type="datetime-local" 
          name="event_date" 
          value={formData.event_date} 
          onChange={handleInputChange} 
        />
      </FormControl>
      <FormControl>
        <FormLabel>募集締切日時</FormLabel>
        <Input 
          type="datetime-local" 
          name="deadline" 
          value={formData.deadline} 
          onChange={handleInputChange} 
        />
      </FormControl>
      <Button onClick={handleBack}>戻る</Button>
      <Button onClick={handleNext} colorScheme="teal">次へ</Button>
    </VStack>
  );
};

export default Step5;
