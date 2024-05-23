import { Progress, Box, Text } from '@chakra-ui/react';

const ProgressIndicator = ({ step }) => {
  return (
    <Box mb={4} textAlign="center" >
      <Progress colorScheme="teal" value={(step / 5) * 100} mb={2} />
      <Text fontWeight="bold">{step}/5</Text>
    </Box>
  );
};

export default ProgressIndicator;
