import React from 'react';
import { Box, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import AppliedJobs from './AppliedJobs';
import SavedJobs from './SavedJobs';

const UserTabs = () => {
  return (
    <Box bg="white" p={6} borderRadius="md" boxShadow="lg" borderWidth="1px" borderColor="gray.200" mt={-10}>
      <Tabs variant="soft-rounded" colorScheme="teal">
        <TabList mb={4}>
          <Tab>応募した募集</Tab>
          <Tab>保存した募集</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <AppliedJobs />
          </TabPanel>
          <TabPanel>
            <SavedJobs />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default UserTabs;
