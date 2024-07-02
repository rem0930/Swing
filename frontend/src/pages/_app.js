import { ChakraProvider } from '@chakra-ui/react';
import { UserProvider } from '../context/UserContext';
import customTheme from "../theme";
import '../styles/global.css'; // カスタムCSSをインポート
import 'react-datepicker/dist/react-datepicker.css'; // デフォルトスタイルをインポート

function App({ Component, pageProps }) {
  return (
    <ChakraProvider theme={customTheme}>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </ChakraProvider>
  );
}

export default App;