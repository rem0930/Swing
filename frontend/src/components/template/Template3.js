import React from 'react';
import { Box, Heading, Text, UnorderedList, ListItem } from '@chakra-ui/react';

const Template3 = () => {
    return (
        <Box p={5} shadow="md" borderWidth="1px">
            <Heading as="h1" size="xl" mb={4}>初心者歓迎！楽しく野球をしよう！</Heading>
            <Text fontSize="lg" mb={4}>
                草野球チーム「　」では、新しいメンバーを大募集しています！
            </Text>
            <Text fontSize="lg" mb={4}>
                活動場所: 
            </Text>
            <Text fontSize="lg" mb={4}>
                活動曜日: 
            </Text>
            <Text fontSize="lg" mb={4}>
                野球初心者でも大歓迎！野球が好きな方、興味がある方なら誰でも参加OKです。私たちと一緒に楽しくプレーしませんか？
            </Text>
            <Heading as="h2" size="lg" mt={6}>チームの特徴</Heading>
            <UnorderedList spacing={2} mt={2} fontSize="lg">
                <ListItem>初心者から経験者まで幅広いメンバーが在籍</ListItem>
                <ListItem>和気あいあいとした雰囲気</ListItem>
                <ListItem>イベントや交流会も多数開催</ListItem>
            </UnorderedList>
            <Heading as="h2" size="lg" mt={6}>こんな方におすすめ</Heading>
            <UnorderedList spacing={2} mt={2} fontSize="lg">
                <ListItem>スポーツを通じて新しい友達を作りたい方</ListItem>
                <ListItem>運動不足を解消したい方</ListItem>
                <ListItem>野球に挑戦してみたい方</ListItem>
                <ListItem>楽しく体を動かしたい方</ListItem>
            </UnorderedList>
            <Text fontSize="lg" mt={6}>
                ご興味のある方は、ぜひお気軽にご連絡ください。体験参加も随時受付中です！
            </Text>
            <Text fontSize="lg" mt={4}>
                皆さんと一緒にプレーできるのを楽しみにしています！
            </Text>
            <Text fontSize="lg" mt={2}>
                ご質問や詳細については、お気軽にお問い合わせください。
            </Text>
        </Box>
    );
};

export default Template3;
