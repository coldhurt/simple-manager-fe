import { createMuiTheme } from '@material-ui/core'

const theme = createMuiTheme({})

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
  },
})

export { theme, darkTheme }
