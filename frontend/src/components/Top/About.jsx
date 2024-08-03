import { Box, Container, Heading, Text, Flex } from "@chakra-ui/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteLeft, faQuoteRight } from '@fortawesome/free-solid-svg-icons';

const AboutSection = () => {
  return (
    <Box as="section" py={20} bg="white" ml={6}>
      <Container maxW="container.lg" px={8}>
        <Heading as="h2" size="2xl" mb={4} fontWeight="bold" textAlign="left" color="teal">
          きっかけをもっと気軽に
        </Heading>
        
        <Box textAlign="left" mt={10} mb={10}>
          <Flex align="flex-start" mb={4}>
            <FontAwesomeIcon icon={faQuoteLeft} style={{ color: "teal", marginRight: "8px", fontSize: "1em", alignSelf: "flex-start" }} />
            <Text fontSize="xl" color="gray.700">
              野球をしたいけど、チームの探し方・参加方法がわからない
            </Text>
            <FontAwesomeIcon icon={faQuoteRight} style={{ color: "teal", marginLeft: "8px", fontSize: "1em", alignSelf: "flex-end" }} />
          </Flex>
          <Flex align="flex-start" mb={4}>
            <FontAwesomeIcon icon={faQuoteLeft} style={{ color: "teal", marginRight: "8px", fontSize: "1em", alignSelf: "flex-start" }} />
            <Text fontSize="xl" color="gray.700">
              新しいメンバーを集めるのに苦労している
            </Text>
            <FontAwesomeIcon icon={faQuoteRight} style={{ color: "teal", marginLeft: "8px", fontSize: "1em", alignSelf: "flex-end" }} />
          </Flex>
          <Text fontSize="lg" color="gray.700" mt={10}>
            そんなふうに思いながら、具体的にどうしたらいいのか悩んでいませんか？
          </Text>
        </Box>
        
        <Box textAlign="left" mt={-3} mb={0}>
          <Text fontSize="lg" color="gray.700">
            Swingは、野球をしたい人々が簡単にチームを作り、管理し、参加できるプラットフォームです。<br/>
            新しい仲間や試合相手を見つけて、充実した草野球ライフをサポートします。
          </Text>
        </Box>
      </Container>
    </Box>
  );
};

export default AboutSection;
