import { Platform } from 'react-native'

const theme = {
  colors: {
    textPrimary: '#135D66',
    textWhite: '#fbe9d0',
    textSecondary: '#874f41',
    primary: '#90aead',
    accentOrange: '#e64833',
    neutralBlue: '#BED7DC',
    neutralBlueOpacity: 'rgba(179, 200, 207, 0.5)',
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: {
    main: Platform.select({
      android: 'Roboto',
      ios: 'Arial',
      default: 'System',
    }),
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
}

export default theme
