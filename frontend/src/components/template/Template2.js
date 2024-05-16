import React from 'react';
import { Box, Heading, Text, UnorderedList, ListItem } from '@chakra-ui/react';

const Template2 = () => {
    return (
        <Box p={5} shadow="md" borderWidth="1px">
            <Heading as="h1" size="xl" mb={4}>ご覧いただきありがとうございます。</Heading>
            <Text fontSize="lg">草野球チーム「　」は、毎週　メインに　で活動しております。</Text>
            <Text fontSize="lg" mt={4}>楽しみながらも真剣に野球に取り組む、20～30歳代が主力のそこそこ若いチームです。メンバー同士も仲が良く、溶け込みやすい環境です！</Text>
            <Text fontSize="lg" mt={4}>体験参加は常時受け付けております。下記詳細をご覧いただき、少しでも興味を持っていただいた方は、ぜひご連絡いただければと存じます。</Text>

            <Heading as="h2" size="lg" mt={6}>所属リーグ</Heading>
            <Text fontSize="lg" mt={2}>　</Text>

            <Heading as="h2" size="lg" mt={6}>主に使用するグラウンド</Heading>
            <Text fontSize="lg" mt={2}>　</Text>

            <Heading as="h2" size="lg" mt={6}>活動頻度</Heading>
            <Text fontSize="lg" mt={2}>週　回</Text>

            <Heading as="h2" size="lg" mt={6}>チームコンセプト</Heading>
            <Text fontSize="lg" mt={2}>「　」</Text>

            <Heading as="h2" size="lg" mt={6}>イベント</Heading>
            <UnorderedList spacing={2} mt={2}>
                <ListItem>紅白戦</ListItem>
                <ListItem>野球合宿</ListItem>
                <ListItem>バーベキュー</ListItem>
                <ListItem>忘年会</ListItem>
            </UnorderedList>

            <Heading as="h2" size="lg" mt={6}>募集要項（選手）</Heading>
            <Text fontSize="lg" mt={2}>* 高校野球以上の経験者の方</Text>
            <Text fontSize="lg">* 特に希望するポジション</Text>
            <UnorderedList spacing={2}>
                <ListItem>投手</ListItem>
                <ListItem>遊撃手</ListItem>
            </UnorderedList>
            <Text fontSize="lg" mt={2}>* 楽しみながらも真剣に野球がしたい方</Text>
            <Text fontSize="lg">* 20歳未満の方でも大歓迎です。</Text>

            <Heading as="h2" size="lg" mt={6}>募集要項（マネージャー）</Heading>
            <Text fontSize="lg" mt={2}>* 野球が好きな方</Text>
            <Text fontSize="lg">* 男女問わず</Text>
            <Text fontSize="lg">* 未経験の方も大歓迎です！</Text>

            <Text fontSize="lg" mt={6}>最後までご覧いただきありがとうございました。何歳になっても野球に熱くなりたい方をお待ちしております！</Text>
            <Text fontSize="lg" mt={4}>質問や不明な点がございましたら、お気軽に　までご連絡ください。</Text>
            <Text fontSize="lg" mt={2}>宜しくお願い致します！</Text>
        </Box>
    );
};

export default Template2;