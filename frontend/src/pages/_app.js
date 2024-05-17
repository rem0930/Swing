import { ChakraProvider } from '@chakra-ui/react';
import customTheme from "../theme";
import '../styles/global.css'; // カスタムCSSをインポート
import 'react-datepicker/dist/react-datepicker.css'; // デフォルトスタイルをインポート

function App({ Component, pageProps }) {
  return (
    <ChakraProvider theme={customTheme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default App;