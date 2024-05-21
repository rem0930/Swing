import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CustomCalendar = React.memo(({ selectedDate, onChange }) => {
  return (
    <DatePicker
      selected={selectedDate}
      onChange={onChange}
      inline
      dateFormat="yyyy-MM-dd"
    />
  );
});

export default CustomCalendar;
