import { Box } from "@chakra-ui/react";
import Header from './Header/Header';
import { UserProvider } from '../context/UserContext';

const Layout = ({ children }) => {
  return (
    <UserProvider>
      <Box>
        <Header />
        <Box pt="80px">
          {children}
        </Box>
      </Box>
    </UserProvider>
  );
};

export default Layout;
