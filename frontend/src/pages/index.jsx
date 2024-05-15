import { Box, Container } from "@chakra-ui/react";
import HeroSection from "../components/HeroSection";
import FeatureCard from "../components/FeatureCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <Box>
      <Navbar />
      <HeroSection />
      <Container maxW="container.xl" mt={10}>
        <FeatureCard
          title="チームを見つける"
          description="草野球チームを簡単に検索して参加する"
          // imageUrl="/images/find_team.jpg"
        />
        <FeatureCard
          title="メンバーを募集する"
          description="新しいメンバーを簡単に募集する"
          // imageUrl="/images/recruit_members.jpg"
        />
        <FeatureCard
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
