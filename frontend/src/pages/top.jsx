import dynamic from 'next/dynamic';
import { Box, Container } from "@chakra-ui/react";
import Navbar from "../components/TopPage/Navbar";
import Footer from "../components/TopPage/Footer";

// HeroSection と FeatureSection を動的インポートして、SSRを無効にする
const DynamicHeroSection = dynamic(() => import('../components/TopPage/HeroSection'), { ssr: false });
const DynamicFeatureSection = dynamic(() => import('../components/TopPage/FeaturesSection'), { ssr: false });

const Home = () => {
  return (
    <Box>
      <Navbar />
      <DynamicHeroSection />
      <Container maxW="container.xl" mt={10}>
        <DynamicFeatureSection
          title="チームを見つける"
          description="草野球チームを簡単に検索して参加する"
          // imageUrl="/images/find_team.jpg"
        />
        <DynamicFeatureSection
          title="メンバーを募集する"
          description="新しいメンバーを簡単に募集する"
          // imageUrl="/images/recruit_members.jpg"
        />
        <DynamicFeatureSection
          title="活動を共有する"
          description="チームの活動やイベントを共有する"
          // imageUrl="/images/share_activity.jpg"
        />
      </Container>
      <Footer />
    </Box>
  );
};

export default Home;
