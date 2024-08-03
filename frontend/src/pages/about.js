import { useEffect, useState } from "react";
import Layout from '../components/Layouts/Layout';
import axios from 'axios';
import HeroSection from '../components/Top/HeroSection';
import PickUpSection from '../components/Top/PickUpSection';
import FeaturesSection from '../components/Top/FeaturesSection';

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const AboutPage = () => {
  const [recruitments, setRecruitments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecruitments = async () => {
      try {
        const response = await axios.get(`${apiUrl}/recruitments`);
        setRecruitments(response.data.filter(recruitment => recruitment.status === 'open'));
      } catch (error) {
        setError("募集情報の取得中にエラーが発生しました！");
      } finally {
        setLoading(false);
      }
    };

    fetchRecruitments();
  }, []);

  return (
    <Layout bgColor="transparent">
      <HeroSection />
      <PickUpSection recruitments={recruitments} loading={loading} error={error} />
      <FeaturesSection />
    </Layout>
  );
};

export default AboutPage;
