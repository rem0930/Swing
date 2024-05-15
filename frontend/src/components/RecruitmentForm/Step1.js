import { VStack, Radio, RadioGroup, Stack, Button, Text, Box, Heading } from '@chakra-ui/react';

const Step1 = ({ formData, setFormData, handleNext }) => {
  return (
    <VStack spacing={4}>
      <Heading as="h2" size="lg">募集タイプを選択</Heading>
      <RadioGroup colorScheme="teal" name="role" value={formData.role} onChange={(value) => setFormData({ ...formData, role: value })}>
        <Stack direction={{ base: "column", md: "row" }} spacing={5}>
          <Box p={5} borderWidth="1px" borderRadius="lg">
            <Radio value="member">メンバーの募集</Radio>
          </Box>
          <Box p={5} borderWidth="1px" borderRadius="lg">
            <Radio value="opponent">対戦相手の募集</Radio>
          </Box>
          <Box p={5} borderWidth="1px" borderRadius="lg">
            <Radio value="helper">助っ人の募集</Radio>
          </Box>
        </Stack>
      </RadioGroup>
      <Button onClick={handleNext} colorScheme="teal">次へ</Button>
    </VStack>
  );
};

export default Step1;
