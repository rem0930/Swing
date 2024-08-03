import { Box, Container, Heading, Text, Stack, Flex, Icon } from "@chakra-ui/react";
import { FaBaseballBall, FaSearch, FaComments, FaUsers } from "react-icons/fa";

const FeatureSection = () => {
  return (
    <Box as="section" py={20} bg="white" mt={-20}>
      <Container maxW="container.lg" px={8}>
        <Heading as="h2" size="xl" mb={12} fontWeight="bold" textAlign="center" color="teal">
          Features
        </Heading>
        <Stack spacing={10} align="center" direction={{ base: "column", md: "row" }} justify="space-around">
          <FeatureItem
            icon={FaBaseballBall}
            title="チームに参加"
            description="簡単にチームに参加して新しい仲間とプレイしましょう！"
          />
          <FeatureItem
            icon={FaSearch}
            title="チームを探す"
            description="近くの草野球チームを見つけて、参加のチャンスを広げましょう！"
          />
          <FeatureItem
            icon={FaUsers}
            title="メンバー募集"
            description="チームメンバー・対戦相手・助っ人を簡単に募集できます！"
          />
          <FeatureItem
            icon={FaComments}
            title="チャット"
            description="応募から参加までスムーズなコミュニケーションをサポート！"
          />
        </Stack>
      </Container>
    </Box>
  );
};

const FeatureItem = ({ icon, title, description }) => {
  return (
    <Flex
      direction="column"
      align="center"
      bg="white"
      p={8}
      rounded="lg"
      shadow="lg"
      transition="transform 0.3s"
      _hover={{ transform: "scale(1.05)" }}
    >
      <Icon as={icon} boxSize={12} color="teal.500" mb={4} />
      <Heading as="h3" size="md" mb={2} fontWeight="bold" color="teal.700">
        {title}
      </Heading>
      <Text fontSize="md" color="gray.700" textAlign="center">
        {description}
      </Text>
    </Flex>
  );
};

export default FeatureSection;
