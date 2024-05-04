import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
    colors: {
        brand: {
          500: '#0D5FFF',  // 例えば、明るいブルー
          600: '#0041C2'   // 濃いブルー
        },
    },
    components: {
        Button: {
            baseStyle: {
                fontWeight: 'bold', // デフォルトのボタンのフォントウェイト
            },
            variants: {
                solid: (props) => ({
                    bg: props.colorMode === 'dark' ? 'brand.600' : 'brand.500',
                    _hover: {
                        bg: 'brand.600',
                        boxShadow: 'lg',
                    },
                }),
            },
        },
    },
});

export default theme;