import { Box, VStack, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import RecruitmentCard from './RecruitmentCard'; // 募集情報カードコンポーネントをインポート

const TeamRecruitments = ({ recruitments }) => {
  const filterRecruitmentsByRole = (role) => {
    return recruitments.filter(r => r.role === role);
  };

  return (
    <Box>
      <Tabs variant="soft-rounded" colorScheme="teal">
        <TabList>
          <Tab>メンバー募集</Tab>
          <Tab>対戦相手募集</Tab>
          <Tab>助っ人募集</Tab>
        </TabList>

        <TabPanels>
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
