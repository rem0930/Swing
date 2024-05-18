import { Box, Icon, Heading, Text, Stack, Flex } from "@chakra-ui/react";
import { FaBaseballBall, FaUsers, FaShareSquare } from "react-icons/fa";

const FeatureSection = ({ title, description }) => {
  const getIcon = (title) => {
    switch (title) {
      case "チームを見つける":
        return <Icon as={FaBaseballBall} w={10} h={10} color="teal.500" />;
      case "メンバーを募集する":
        return <Icon as={FaUsers} w={10} h={10} color="teal.500" />;
      case "活動を共有する":
        return <Icon as={FaShareSquare} w={10} h={10} color="teal.500" />;
      default:
        return null;
    }
  };

  return (
    <Flex
      direction="column"
      alignItems="center"
      maxW="md"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      mb={6}
      p={6}
      boxShadow="lg"
      bg="white"
      _hover={{ transform: "scale(1.05)", transition: "0.3s" }}
    >
      {getIcon(title)}
      <Box mt={4}>
        <Stack spacing={4} textAlign="center">
          <Heading as="h3" size="lg">
            {title}
          </Heading>
          <Text>{description}</Text>
        </Stack>
      </Box>
    </Flex>
  );
};

export default FeatureSection;
