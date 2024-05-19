import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, Heading, Tab, TabList, TabPanel, TabPanels, Tabs, VStack, Text, Avatar, FormControl, FormLabel, Input, Spinner } from '@chakra-ui/react';import CreateTeamForm from './CreateTeamForm';
// import MemberList from './MemberList';
// import EventList from './EventList';
import Layout from '../Layout';

const TeamManagementPage = () => {
  const [team, setTeam] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Loading state追加
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    profile_photo: '',
    description: '',
  });

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('http://localhost:3000/team', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data) {
        setTeam(response.data);
        setFormData({
          name: response.data.name,
          profile_photo: response.data.profile_photo,
          description: response.data.description,
        });
      }
    } catch (error) {
      console.error('Error fetching team data:', error);
    } finally {
      setIsLoading(false); // ローディング完了
    }
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    try {
      const updatedData = {};
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== team[key]) {
          updatedData[key] = formData[key] === '' ? null : formData[key];
        }
      });

      const response = await axios.put(`http://localhost:3000/${team.id}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTeam(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating team:', error);
    }
  };

  if (isLoading) {
    return <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh"><Spinner size="xl" /></Box>;
  }

  if (!team) {
    return <CreateTeamForm />;
  }

  return (
    <Layout>
      <Box p={4}>
        <VStack spacing={4} align="start">
          {/* <Heading as="h1">チーム管理</Heading> */}
          {isEditing ? (
            <FormControl>
              <FormLabel>チーム名</FormLabel>
              <Input name="name" value={formData.name} onChange={handleChange} />
              <FormLabel>プロフィール写真</FormLabel>
              <Input name="profile_photo" value={formData.profile_photo} onChange={handleChange} />
              <FormLabel>紹介文</FormLabel>
              <Input name="description" value={formData.description} onChange={handleChange} />
              <Button mt={4} colorScheme="teal" onClick={handleSave}>保存</Button>
              <Button mt={4} onClick={() => setIsEditing(false)}>キャンセル</Button>
            </FormControl>
          ) : (
            <>
              <Avatar size="xl" name={team.name} src={team.profile_photo} />
              <Heading as="h2">{team.name}</Heading>
              <Text>{team.description}</Text>
              <Button onClick={() => setIsEditing(true)}>編集</Button>
            </>
          )}
        </VStack>

        <Tabs mt={4}>
          <TabList>
            <Tab>メンバー</Tab>
            <Tab>イベント</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              {/* メンバー管理セクション */}
              <Heading as="h3">メンバー一覧</Heading>
              {/* <MemberList teamId={team.id} /> */}
            </TabPanel>
            <TabPanel>
              {/* イベント管理セクション */}
              <Heading as="h3">イベント一覧</Heading>
              {/* <EventList teamId={team.id} /> */}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Layout>
  );
};

export default TeamManagementPage;
