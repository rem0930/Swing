import { Box, Flex, Text, Badge, HStack, Icon, Link as ChakraLink, Select, Stack, Checkbox } from '@chakra-ui/react';
import { FiMapPin, FiCalendar, FiClock } from 'react-icons/fi';
import NextLink from 'next/link';

const RecruitmentCards = ({ recruitments, selectedRole, setSelectedRole, showOnlyOpen, setShowOnlyOpen, isMobileView }) => {
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
    closed: 'red'
  };

  return (
    <Box width="100%">
      <Flex mb={4} alignItems="center">
        {!isMobileView && (
          <Box flex="3">
            <Select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              width="90%"
            >
              <option value="all">全ての種類</option>
              <option value="member">メンバー募集</option>
              <option value="opponent">対戦相手の募集</option>
              <option value="helper">助っ人募集</option>
            </Select>
          </Box>
        )}
        <Box flex="1">
          <Checkbox
            isChecked={showOnlyOpen}
            onChange={(e) => setShowOnlyOpen(e.target.checked)}
            colorScheme="teal"
            bg="white"
          >
            募集中のみ表示
          </Checkbox>
        </Box>
      </Flex>
      <Stack spacing={4} width="100%">
        {recruitments.map(recruitment => {
          const formattedEventDate = new Date(recruitment.event_date).toLocaleDateString();
          const formattedDeadline = new Date(recruitment.deadline).toLocaleDateString();

          return (
            <NextLink href={`/recruitments/${recruitment.id}`} passHref key={recruitment.id}>
              <ChakraLink
                _hover={{ textDecoration: 'none' }}
                _focus={{ boxShadow: 'none' }}
              >
                <Box
                  borderWidth="1px"
                  borderRadius="lg"
                  overflow="hidden"
                  boxShadow="lg"
                  bg="white"
                  mb={2}
                  width="100%"
                  transition="all 0.2s"
                  _hover={{ transform: 'translateY(-5px)', boxShadow: '2xl' }}
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

                    <Text mt="1" fontWeight="semibold" fontSize="xl" lineHeight="tight" isTruncated>
                      {recruitment.title}
                    </Text>

                    <Box mt="2" noOfLines={1}>
                      {recruitment.description}
                    </Box>

                    <HStack mt="3" spacing="4">
                      <Icon as={FiMapPin} />
                      <Text>場所：{recruitment.address}</Text>
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
              </ChakraLink>
            </NextLink>
          );
        })}
      </Stack>
    </Box>
  );
};

export default RecruitmentCards;
