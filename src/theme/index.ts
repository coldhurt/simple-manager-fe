import { createMuiTheme } from '@material-ui/core'

const theme = createMuiTheme({
  palette: {
    type: 'light',
  },
})

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
  },
})

export { theme, darkTheme }
