import React from 'react';
import { Box, Grid, GridItem, Spinner } from '@chakra-ui/react';
import { useUser } from '../../context/UserContext';
import UserInfo from './UserInfo';
import UserTabs from './UserTads';

const UserProfile = () => {
  const { user } = useUser();

  if (!user) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Box maxW="1200px" mx="auto" mt={8} p={4}>
      <Grid templateColumns={{ base: '1fr', md: '1fr 2fr' }} gap={6}>
        <GridItem>
          <UserInfo />
        </GridItem>
        <GridItem>
          <UserTabs />
        </GridItem>
      </Grid>
    </Box>
  );
};

export default UserProfile;
