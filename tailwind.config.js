module.exports = {
  theme: {
    extend: {
      colors: {
        black: '#111111',
        light: '#f9f9fa',
        gray: {
          '100': '#f5f5f5',
          '200': '#eeeeee',
          '300': '#e0e0e0',
          '400': '#bdbdbd',
          '500': '#9e9e9e',
          '600': '#757575',
          '700': '#616161',
          '800': '#424242',
          '900': '#212121',
        },
        'brand': {
          100: '#EEEFFC',
          200: '#D4D7F6',
          300: '#BABEF1',
          400: '#868EE7',
          500: '#525DDC',
          600: '#4A54C6',
          700: '#313884',
          800: '#252A63',
          900: '#191C42',
        },
        'inherit': 'inherit',
      },
      fontFamily: {
        sans: [
          '"Public Sans"',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          '"Noto Sans"',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
      fontSize: {
        xxs: '0.675rem',
        md: '0.9rem',
      },
      spacing: {
        '7': '1.75rem',
        '52': '13rem',
      },
      borderWidth: {
        '3': '3px',
        '6': '6px',
      },
      minWidth: (theme) => ({
        '1/2': '50%',
        ...theme('spacing'),
      }),
      listStyleType: {
        'square': 'square',
        'circle': 'circle',
      },
      letterSpacing: {
        widest: '.225em',
      },
    },
  },
  variants: {},
  plugins: [
    ({ addUtilities }) => {
      addUtilities({
        '.border-t-white': {
          'border-top-color': '#fff',
        },
      });
    },
  ],
}
