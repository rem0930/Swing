import { APIProvider } from '@vis.gl/react-google-maps';
import { ChakraProvider } from '@chakra-ui/react';
import { UserProvider } from '../context/UserContext';
import customTheme from "../theme";
import '../styles/global.css';
import 'react-datepicker/dist/react-datepicker.css';

function App({ Component, pageProps }) {
  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!googleMapsApiKey) {
    console.error('Google Maps API key is not set');
    // 開発環境ではエラーメッセージを表示し、本番環境ではより控えめなメッセージを表示
    return process.env.NODE_ENV === 'development' 
      ? <div>Error: Google Maps API key is not set</div>
      : <div>Sorry, there was an error loading the application. Please try again later.</div>;
  }

  return (
    <ChakraProvider theme={customTheme}>
      <UserProvider>
        {Component.needsGoogleMaps ? (
          <APIProvider apiKey={googleMapsApiKey}>
            <Component {...pageProps} />
          </APIProvider>
        ) : (
          <Component {...pageProps} />
        )}
      </UserProvider>
    </ChakraProvider>
  );
}

export default App;