import { Box, VStack, Tabs, TabList, TabPanels, Tab, TabPanel, Badge, Flex, Icon, Link as ChakraLink, Text, HStack } from '@chakra-ui/react';
import { FiMapPin, FiCalendar, FiClock } from 'react-icons/fi';
import NextLink from 'next/link';

const RecruitmentCard = ({ recruitment }) => {
  const formattedEventDate = new Date(recruitment.event_date).toLocaleDateString();
  const formattedDeadline = new Date(recruitment.deadline).toLocaleDateString();

  return (
    <Box
      key={recruitment.id}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="lg"
      bg="white"
      mb={2}
      width="100%"
    >
      <Box p="6">
        <Flex alignItems="baseline" direction={{ base: "column", md: "row" }}>
          <Badge borderRadius="full" px="2" colorScheme={recruitment.status === 'open' ? 'green' : 'red'} mb={{ base: 2, md: 0 }}>
            {recruitment.status === 'open' ? '募集中' : '締切'}
          </Badge>
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml={{ md: "2" }}
          >
            {recruitment.role === 'member' ? 'メンバー' : recruitment.role === 'opponent' ? '対戦相手' : 'ヘルパー'}
          </Box>
        </Flex>

        <NextLink href={`/recruitments/${recruitment.id}`} passHref>
          <ChakraLink mt="1" fontWeight="semibold" fontSize="xl" lineHeight="tight" isTruncated>
            {recruitment.title}
          </ChakraLink>
        </NextLink>

        <Box mt="2" noOfLines={2}>
          {recruitment.description}
        </Box>

        <HStack mt="3" spacing="4">
          <Icon as={FiMapPin} />
          <Text>{recruitment.location_id}</Text>
        </HStack>
        
        <HStack mt="3" spacing="4">
          <Icon as={FiCalendar} />
          <Text>日程：{formattedEventDate}</Text>
        </HStack>
        
        <HStack mt="3" spacing="4">
          <Icon as={FiClock} />
          <Text>締切：{formattedDeadline}</Text>
        </HStack>
      </Box>
    </Box>
  );
};

const TeamRecruitments = ({ recruitments }) => {
  const filterRecruitmentsByRole = (role) => {
    if (role === 'all') {
      return recruitments;
    }
    return recruitments.filter(r => r.role === role);
  };

  return (
    <Box>
      <Tabs variant="soft-rounded" colorScheme="teal">
        <TabList>
          <Tab>全ての募集</Tab>
          <Tab>メンバー募集</Tab>
          <Tab>対戦相手募集</Tab>
          <Tab>助っ人募集</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <VStack spacing={4} align="stretch">
              {filterRecruitmentsByRole('all').map(recruitment => (
                <RecruitmentCard key={recruitment.id} recruitment={recruitment} />
              ))}
            </VStack>
          </TabPanel>
          <TabPanel>
            <VStack spacing={4} align="stretch">
              {filterRecruitmentsByRole('member').map(recruitment => (
                <RecruitmentCard key={recruitment.id} recruitment={recruitment} />
              ))}
            </VStack>
          </TabPanel>
          <TabPanel>
            <VStack spacing={4} align="stretch">
              {filterRecruitmentsByRole('opponent').map(recruitment => (
                <RecruitmentCard key={recruitment.id} recruitment={recruitment} />
              ))}
            </VStack>
          </TabPanel>
          <TabPanel>
            <VStack spacing={4} align="stretch">
              {filterRecruitmentsByRole('helper').map(recruitment => (
                <RecruitmentCard key={recruitment.id} recruitment={recruitment} />
              ))}
            </VStack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default TeamRecruitments;
