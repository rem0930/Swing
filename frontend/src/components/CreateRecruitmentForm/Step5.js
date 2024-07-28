import React, { useState, useEffect } from 'react';
import { VStack, FormControl, FormLabel, Input, Button, Heading } from '@chakra-ui/react';

const Step5 = ({ initialFormData, handleChange, handleBack, handleNext }) => {
  const [formData, setFormData] = useState({
    event_date: initialFormData?.event_date || '',
    deadline: initialFormData?.deadline || '',
  });

  useEffect(() => {
    if (initialFormData) {
      setFormData({
        event_date: initialFormData.event_date || '',
        deadline: initialFormData.deadline || '',
      });
    }
  }, [initialFormData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
    handleChange(e);
  };

  const handleNextClick = () => {
    if (!formData.event_date || !formData.deadline) {
      alert('開催日時と募集締切日時を設定してください');
      return;
    }
    handleNext();
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
      <Button 
        onClick={handleNextClick} 
        colorScheme="teal" 
        isDisabled={!formData.event_date || !formData.deadline}
      >
        次へ
      </Button>
    </VStack>
  );
};

export default Step5;
