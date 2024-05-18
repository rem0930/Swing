import React from 'react';
import { Box } from "@chakra-ui/react";
import Layout from '../components/Layout';
import UserProfile from '../components/User/UserProfile';

const ProfilePage = () => {
  return (
    <Layout>
      <Box p="5">
        <UserProfile />
      </Box>
    </Layout>
  );
};

export default ProfilePage;
