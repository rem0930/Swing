import { Box, Image, Heading, Text, Stack } from "@chakra-ui/react";

const FeatureCard = ({ title, description, imageUrl }) => {
  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      mb={6}
    >
      <Image src={imageUrl} alt={title} />
      <Box p={6}>
        <Stack spacing={4}>
          <Heading as="h3" size="lg">
            {title}
          </Heading>
          <Text>{description}</Text>
        </Stack>
      </Box>
    </Box>
  );
};

export default FeatureCard;
