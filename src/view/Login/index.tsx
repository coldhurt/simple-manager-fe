import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  makeStyles,
  CircularProgress,
} from '@material-ui/core'
import { getAuth } from '../../store/modules'
import { loginAction } from '../../store/modules/auth'
import getText from '../../i18n'
import { Link } from 'react-router-dom'
const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    backgroundColor: '#cfe8fc',
    height: '100vh',
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  form: {
    justifyContent: 'center',
  },
  item: {
    justifyContent: 'center',
  },
  button: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  },
})

const Login = () => {
  const classes = useStyles()
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const loading = useSelector(getAuth).loading
  console.log('render Login')
  const dispatch = useDispatch()
  const login = useCallback(
    () => dispatch(loginAction({ username, password })),
    [dispatch, username, password]
  )
  const onChangeUsername = useCallback((e) => setUsername(e.target.value), [])
  const onChangePassword = useCallback((e) => setPassword(e.target.value), [])
  return (
    <Container className={classes.root} disableGutters>
      <CssBaseline>
        <Grid container spacing={4} className={classes.form}>
          <Grid item xs={8} className={classes.item} container>
            <TextField
              autoFocus
              value={username}
              onChange={onChangeUsername}
              label={getText('Username')}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={8} className={classes.item} container>
            <TextField
              value={password}
              onChange={onChangePassword}
              label={getText('Password')}
              type='password'
              required
              fullWidth
            />
          </Grid>
          <Grid
            item
            xs={8}
            direction='row'
            justify='space-evenly'
            spacing={2}
            container
          >
            <Grid>
              <Button className={classes.button} fullWidth onClick={login}>
                {getText('Login')} {loading && <CircularProgress size={20} />}
              </Button>
            </Grid>
            <Grid>
              <Link to='/register'>
                <Button className={classes.button} fullWidth>
                  {getText('Register')}{' '}
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </CssBaseline>
    </Container>
  )
}

export default {
  name: 'login',
  // reducers: userReducer,
  view: Login,
}
