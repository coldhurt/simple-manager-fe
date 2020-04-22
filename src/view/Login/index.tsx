import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Button,
  Container,
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
    border: 0,
    borderRadius: 3,
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
            <Button
              className={classes.button}
              fullWidth
              onClick={login}
              color='primary'
              variant='contained'
            >
              {getText('Login')} {loading && <CircularProgress size={20} />}
            </Button>
          </Grid>
          <Grid>
            <Link to='/register'>
              <Button
                className={classes.button}
                fullWidth
                color='primary'
                variant='contained'
              >
                {getText('Register')}
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

export default {
  name: 'login',
  // reducers: userReducer,
  view: Login,
}
