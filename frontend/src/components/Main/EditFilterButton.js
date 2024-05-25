import React, { useState } from 'react';
import {
  Box, Button, Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton,
  VStack, RadioGroup, Radio, Stack, Text, Switch, Tab, Tabs, TabList, TabPanel, TabPanels, Icon, Flex
} from '@chakra-ui/react';
import { FaSlidersH } from 'react-icons/fa'; // 横線が三つあって所々に丸があるアイコン
import { FiType, FiCalendar, FiCheck } from 'react-icons/fi';
import CustomCalendar from './CustomCalendar';

const EditFilterButton = ({
  selectedDate, setSelectedDate, selectedRole, setSelectedRole, showOnlyOpen, setShowOnlyOpen
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const openDrawer = () => setIsOpen(true);
  const closeDrawer = () => setIsOpen(false);
  const resetFilters = () => {
    setSelectedDate(null);
    setSelectedRole('all');
    setShowOnlyOpen(false);
  };

  return (
    <>
      <Button leftIcon={<FaSlidersH />} colorScheme="teal" size="sm" onClick={openDrawer}>
        フィルター
      </Button>
      <Drawer isOpen={isOpen} placement="bottom" onClose={closeDrawer}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <Flex justifyContent="center" alignItems="center" position="relative">
              <Button
                variant="unstyled"
                colorScheme="gray"
                onClick={resetFilters}
                position="absolute"
                left="0"
                fontSize="sm"
              >
                リセット
              </Button>
              <Text fontSize="sm">フィルターを編集</Text>
            </Flex>
          </DrawerHeader>
          <DrawerBody p={4} px={6}>
            <Tabs>
              <TabList>
                <Tab>
                  <Icon as={FiType} mr={2} />募集タイプ
                </Tab>
                <Tab>
                  <Icon as={FiCalendar} mr={2} />日付
                </Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <VStack spacing={4} align="start">
                    <RadioGroup onChange={setSelectedRole} value={selectedRole}>
                      <Stack direction="column">
                        <Radio value="all">
                          全て{selectedRole === 'all' && <Icon as={FiCheck} ml={2} />}
                        </Radio>
                        <Radio value="member">
                          メンバー{selectedRole === 'member' && <Icon as={FiCheck} ml={2} />}
                        </Radio>
                        <Radio value="opponent">
                          対戦相手{selectedRole === 'opponent' && <Icon as={FiCheck} ml={2} />}
                        </Radio>
                        <Radio value="helper">
                          ヘルパー{selectedRole === 'helper' && <Icon as={FiCheck} ml={2} />}
                        </Radio>
                      </Stack>
                    </RadioGroup>
                    <Box>
                      <Text>募集中のみ表示</Text>
                      <Switch isChecked={showOnlyOpen} onChange={() => setShowOnlyOpen(!showOnlyOpen)} />
                    </Box>
                  </VStack>
                </TabPanel>
                <TabPanel>
                  <Box display="flex" justifyContent="center">
                    <CustomCalendar selectedDate={selectedDate} onChange={setSelectedDate} />
                  </Box>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </DrawerBody>
          <Box p={4}>
            <Button colorScheme="teal" width="100%" onClick={closeDrawer}>フィルターを適用</Button>
          </Box>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default EditFilterButton;
