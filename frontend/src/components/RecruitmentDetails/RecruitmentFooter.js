import { useEffect, useState, useRef } from 'react';
import { Button, Flex, HStack, Icon, Text, VStack, useBreakpointValue } from '@chakra-ui/react';
import { FiCalendar, FiMapPin } from 'react-icons/fi';
import SaveButton from '../SaveButton';

const RecruitmentFooter = ({ eventDate, onApply, isOwnTeam, isApplied, status, recruitmentId, address, openLoginModal }) => {
  const [isFooterVisible, setFooterVisible] = useState(false);
  const recruitmentFooterRef = useRef(null);
  const iconSize = useBreakpointValue({ base: '20px', md: '24px' });
  const buttonSize = useBreakpointValue({ base: 'sm', md: 'md' });
  const textSize = useBreakpointValue({ base: 'sm', md: 'md' });
  const showAddress = useBreakpointValue({ base: false, md: true });

  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector('#main-footer');
      const recruitmentFooter = recruitmentFooterRef.current;
      if (footer && recruitmentFooter) {
        const footerRect = footer.getBoundingClientRect();
        const recruitmentFooterRect = recruitmentFooter.getBoundingClientRect();
        setFooterVisible(footerRect.top <= window.innerHeight);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Flex
      ref={recruitmentFooterRef}
      position={isFooterVisible ? 'absolute' : 'fixed'}
      bottom={isFooterVisible ? '0' : 0} // Footer に近づけるために bottom を調整
      left={0}
      width="100%"
      bg="white"
      py={4}
      px={8}
      boxShadow="lg"
      justifyContent="space-between"
      zIndex={1500}
      alignItems="center"
      height="80px"
    >
      <VStack align="start" spacing={1}>
        <HStack>
          <Icon as={FiCalendar} />
          <Text>開催日時: {new Date(eventDate).toLocaleDateString()}</Text>
        </HStack>
        {showAddress && (
          <HStack>
            <Icon as={FiMapPin} />
            <Text>場所: {address || '未設定'}</Text>
          </HStack>
        )}
      </VStack>
      <HStack spacing={1}>  {/* 間隔を少し狭める */}
        <SaveButton recruitmentId={recruitmentId} openLoginModal={openLoginModal} />
        {status === 'closed' ? (
          <Button colorScheme="gray" size={buttonSize} isDisabled>
            募集終了
          </Button>
        ) : isOwnTeam ? (
          <Button colorScheme="red" size={buttonSize} onClick={onApply}>
            募集を締め切る
          </Button>
        ) : isApplied ? (
          <Button colorScheme="gray" size={buttonSize} isDisabled>
            応募済み
          </Button>
        ) : (
          <Button colorScheme="teal" size={buttonSize} onClick={onApply}>
            応募
          </Button>
        )}
      </HStack>
    </Flex>
  );
};

export default RecruitmentFooter;
