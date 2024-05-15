import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  Stack,
  useColorModeValue,
  Image,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  const handleSignup = () => {
    router.push('/signup');
  };

  const handleLogin = () => {
    router.push('/login');
  };

  return (
    <Box bg={useColorModeValue('gray.50', 'gray.800')}>
      <Container maxW={'5xl'} py={12}>
        <Stack spacing={10} textAlign={'center'} align={'center'}>
          <Heading
            fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
            fontWeight={'bold'}
            lineHeight={'110%'}
          >
            草野球の仲間を探そう
            <Text as={'span'} color={'teal.400'}>
              あなたのチームが待っている
            </Text>
          </Heading>
          <Text color={'gray.500'} maxW={'3xl'}>
            草野球をしたいユーザーとチームメンバー・助っ人・対戦相手を募集したいユーザーを繋げるプラットフォームです。
          </Text>
          <Stack direction={'row'} spacing={4}>
            <Button
              rounded={'full'}
              px={6}
              colorScheme={'teal'}
              bg={'teal.400'}
              _hover={{ bg: 'teal.500' }}
              onClick={handleSignup}
            >
              サインアップ
            </Button>
            <Button rounded={'full'} px={6} onClick={handleLogin}>
              ログイン
            </Button>
          </Stack>
        </Stack>
      </Container>
      <Box mt={10} bg={useColorModeValue('white', 'gray.700')} py={12}>
        <Container maxW={'5xl'}>
          <Stack spacing={8} textAlign={'center'} align={'center'}>
            <Heading
              fontSize={{ base: '2xl', sm: '3xl', md: '5xl' }}
              fontWeight={'bold'}
              lineHeight={'110%'}
            >
              プラットフォームの特徴
            </Heading>
            <Stack direction={{ base: 'column', md: 'row' }} spacing={10}>
              <Feature
                title={'簡単な登録'}
                text={'数分で簡単に登録が完了し、すぐに始めることができます。'}
                icon={'https://via.placeholder.com/150'}
              />
              <Feature
                title={'多様なマッチング'}
                text={'プレイヤー、チーム、助っ人、対戦相手を簡単に見つけられます。'}
                icon={'https://via.placeholder.com/150'}
              />
              <Feature
                title={'安全なコミュニケーション'}
                text={'安全な環境でのメッセージング機能を提供しています。'}
                icon={'https://via.placeholder.com/150'}
              />
            </Stack>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}

function Feature({ title, text, icon }) {
  return (
    <Stack align={'center'} spacing={4}>
      <Image boxSize="100px" src={icon} alt={title} />
      <Heading fontSize={'xl'}>{title}</Heading>
      <Text textAlign={'center'}>{text}</Text>
    </Stack>
  );
}
