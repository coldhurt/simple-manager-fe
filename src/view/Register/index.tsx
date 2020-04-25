import React, { useCallback } from 'react'
import { registerAction } from '../../store/modules/auth'
import {
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  makeStyles,
} from '@material-ui/core'
import { toast } from '../../utils'
import { useHistory, Link } from 'react-router-dom'
import getText from '../../i18n'
import { useDispatch } from 'react-redux'

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

const Register: React.SFC = () => {
  const classes = useStyles()
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [confirmPassword, setConfirmPassword] = React.useState('')
  const history = useHistory()
  const dispatch = useDispatch()
  const onRegister = useCallback(() => {
    if (!(username.length >= 5 && username.length <= 30)) {
      toast.error('username length should be between 5 and 30')
      return
    }
    if (password !== confirmPassword) {
      toast.error('password is not same to confirmPassword')
    } else if (!(password.length >= 8 && password.length <= 30)) {
      toast.error('password length should be between 8 and 30')
    } else {
      dispatch(
        registerAction(
          {
            username,
            password,
            confirmPassword,
          },
          (res: Record<string, string>) => {
            if (res && res.success) {
              history.replace('/login')
            }
          }
        )
      )
    }
  }, [dispatch, username, password, confirmPassword, history])

  return (
    <Container className={classes.root} disableGutters>
      <CssBaseline>
        <Grid container spacing={4} className={classes.form}>
          <Grid item xs={8} className={classes.item} container>
            <TextField
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              label={getText('Username')}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={8} className={classes.item} container>
            <TextField
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label={getText('Password')}
              type='password'
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={8} className={classes.item} container>
            <TextField
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              label={getText('Confirm Password')}
              type='password'
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={8} container direction='row' justify='space-evenly'>
            <Grid>
              <Button
                className={classes.button}
                fullWidth
                onClick={onRegister}
                color='primary'
                variant='contained'
              >
                {getText('Register')}
              </Button>
            </Grid>
            <Grid>
              <Link to='/login'>
                <Button
                  className={classes.button}
                  fullWidth
                  color='primary'
                  variant='contained'
                >
                  {getText('Login')}
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
  name: 'user',
  // reducers: userReducer,
  view: Register,
}
