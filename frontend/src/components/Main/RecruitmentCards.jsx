import { useState, useEffect } from 'react';
import { Box, Flex, Text, Badge, HStack, Icon, Link as ChakraLink, Select, Stack } from '@chakra-ui/react';
import { FiMapPin, FiCalendar, FiClock } from 'react-icons/fi';
import NextLink from 'next/link';

const RecruitmentCards = ({ recruitments }) => {
  const [selectedRole, setSelectedRole] = useState('all');
  const [filteredRecruitments, setFilteredRecruitments] = useState(recruitments);

  const roleMapping = {
    member: 'メンバー募集',
    opponent: '対戦相手の募集',
    helper: '助っ人募集'
  };

  const statusMapping = {
    open: '募集中',
    closed: '締切'
  };

  const statusColorScheme = {
    open: 'teal',
    closed: 'glay'
  };

  useEffect(() => {
    if (selectedRole === 'all') {
      setFilteredRecruitments(recruitments);
    } else {
      setFilteredRecruitments(recruitments.filter(recruitment => recruitment.role === selectedRole));
    }
  }, [selectedRole, recruitments]);

  return (
    <Box width="100%">
      <Select
        value={selectedRole}
        onChange={(e) => setSelectedRole(e.target.value)}
        mb={4}
        width="100%"
      >
        <option value="all">全ての種類</option>
        <option value="member">メンバー募集</option>
        <option value="opponent">対戦相手の募集</option>
        <option value="helper">助っ人募集</option>
      </Select>
      <Stack spacing={4} width="100%">
        {filteredRecruitments.map(recruitment => {
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
              mb={2} // マージンボトムを減らして間隔を詰める
              width="100%"
            >
              <Box p="6">
                <Flex alignItems="baseline" direction={{ base: "column", md: "row" }} ml={-1}>
                  <Badge borderRadius="full" px="2" colorScheme={statusColorScheme[recruitment.status]} mb={1}>
                    {statusMapping[recruitment.status]}
                  </Badge>
                  <Box
                    color="gray.500"
                    fontWeight="semibold"
                    letterSpacing="wide"
                    fontSize="xs"
                    textTransform="uppercase"
                    ml={{ md: "2" }}
                  >
                    {roleMapping[recruitment.role]}
                  </Box>
                </Flex>

                <NextLink href={`/recruitments/${recruitment.id}`} passHref>
                  <ChakraLink mt="1" fontWeight="semibold" fontSize="xl" lineHeight="tight" isTruncated>
                    {recruitment.title}
                  </ChakraLink>
                </NextLink>

                <Box mt="2">
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
        })}
      </Stack>
    </Box>
  );
};

export default RecruitmentCards;