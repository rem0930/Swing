import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Box } from '@chakra-ui/react';

const CustomCalendar = ({ selectedDate, onChange }) => {
  return (
    <Box width="100%" maxWidth="300px" mx="auto">
      <DatePicker
        selected={selectedDate}
        onChange={onChange}
        inline
        dateFormat="yyyy-MM-dd"
      />
    </Box>
  );
};

export default CustomCalendar;
