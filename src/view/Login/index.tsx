import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginAction } from '../../store/user/actions'
import userReducer from '../../store/user/reducers'
import {
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  makeStyles,
  CircularProgress
} from '@material-ui/core'
import { AppState } from '../../store'
const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    backgroundColor: '#cfe8fc',
    height: '100vh',
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  form: {
    justifyContent: 'center'
  },
  item: {
    justifyContent: 'center'
  },
  button: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px'
  }
})

const Login = () => {
  const classes = useStyles()
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const loading = useSelector((state: AppState) => state.users.loading)
  console.log('render Login')
  const dispatch = useDispatch()
  const login = useCallback(data => dispatch(loginAction(data)), [dispatch])
  return (
    <Container className={classes.root} disableGutters>
      <CssBaseline>
        <Grid container spacing={4} className={classes.form}>
          <Grid item xs={8} className={classes.item} container>
            <TextField
              autoFocus
              value={username}
              onChange={e => setUsername(e.target.value)}
              label='username'
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={8} className={classes.item} container>
            <TextField
              value={password}
              onChange={e => setPassword(e.target.value)}
              label='password'
              type='password'
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={8} className={classes.item} container>
            <Button
              className={classes.button}
              fullWidth
              onClick={() => {
                login({ username, password })
              }}
            >
              Login {loading && <CircularProgress size={20} />}
            </Button>
          </Grid>
        </Grid>
      </CssBaseline>
    </Container>
  )
}

export default {
  name: 'login',
  reducers: userReducer,
  view: Login
}
