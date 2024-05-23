import { Box } from "@chakra-ui/react";
import Header from './Header/Header';
import { UserProvider } from '../context/UserContext';

const Layout = ({ children }) => {
  return (
    <UserProvider>
      <Box display="flex" flexDirection="column" minHeight="100vh">
        <Header />
        <Box flex="1" pt="80px">
          {children}
        </Box>
      </Box>
    </UserProvider>
  );
};

export default Layout;
