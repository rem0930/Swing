import React from 'react';
import { Button, Icon } from '@chakra-ui/react';
import { FaFilter } from 'react-icons/fa';

const EditFilterButton = ({ onClick }) => {
  return (
    <Button
      onClick={onClick}
      colorScheme="teal"
      leftIcon={<Icon as={FaFilter} />}
      position={{ base: 'fixed', md: 'relative' }}
      bottom={{ base: 4, md: 'auto' }}
      left={{ base: '50%', md: 'auto' }}
      transform={{ base: 'translateX(-50%)', md: 'none' }}
      zIndex={10}
    >
      フィルターを編集
    </Button>
  );
};

export default EditFilterButton;
