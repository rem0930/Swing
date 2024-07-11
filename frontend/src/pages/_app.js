import { APIProvider } from '@vis.gl/react-google-maps';
import { ChakraProvider } from '@chakra-ui/react';
import { UserProvider } from '../context/UserContext';
import customTheme from "../theme";
import '../styles/global.css';
import 'react-datepicker/dist/react-datepicker.css';

function App({ Component, pageProps }) {
  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  // console.log('API Key:', googleMapsApiKey); // デバッグ用

  if (!googleMapsApiKey) {
    console.error('Google Maps API key is not set');
    return null; // または適切なエラーメッセージを表示
  }

  return (
    <ChakraProvider theme={customTheme}>
      <UserProvider>
        <APIProvider apiKey={googleMapsApiKey}>
          <Component {...pageProps} />
        </APIProvider>
      </UserProvider>
    </ChakraProvider>
  );
}

export default App;
