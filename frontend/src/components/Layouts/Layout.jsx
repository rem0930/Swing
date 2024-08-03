import React, { useState, useEffect } from 'react';
import { Box } from "@chakra-ui/react";
import Header from './Header';
import Footer from './Footer';
import { UserProvider } from '../../context/UserContext';

const Layout = ({ children, bgColor }) => {
  const [headerHeight, setHeaderHeight] = useState(64); // デフォルトのヘッダーの高さ

  // ヘッダーの高さを監視するためのイベントリスナー
  useEffect(() => {
    const handleHeaderHeightChange = (event) => {
      setHeaderHeight(event.detail.height);
    };

    window.addEventListener('headerHeightChange', handleHeaderHeightChange);

    return () => {
      window.removeEventListener('headerHeightChange', handleHeaderHeightChange);
    };
  }, []);

  return (
    <UserProvider>
      <Box display="flex" flexDirection="column" minHeight="100vh">
        <Header />
        <Box flex="1" pt={`${headerHeight}px`} bg={bgColor}>
          {children}
        </Box>
        <Footer />
      </Box>
    </UserProvider>
  );
};

export default Layout;
