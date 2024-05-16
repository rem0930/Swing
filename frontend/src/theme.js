// theme.js
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    primary: {
      100: "#E5FCF1",
      200: "#27EF96",
      300: "#10DE82",
      400: "#0EBE6F",
      500: "#0CA25F",
      600: "#0A864F",
      700: "#086F42",
      800: "#075C37",
      900: "#064C2E",
    },
    secondary: {
      100: "#E2E6FF",
      200: "#BBC2FF",
      300: "#8F99FF",
      400: "#6C73FF",
      500: "#5A60FF",
      600: "#4F52E0",
      700: "#4547BF",
      800: "#3B3D99",
      900: "#32347A",
    },
  },
  fonts: {
    heading: "'Poppins', sans-serif",
    body: "'Roboto', sans-serif",
  },
});

export default theme;
