import React from 'react'
import { IUserState, IRegister } from '../../store/user/types'
import { IState } from '../../store/types'
import { connect } from 'react-redux'
import { registerAction } from '../../store/user/actions'
import userReducer from '../../store/user/reducers'
import {
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  makeStyles
} from '@material-ui/core'
import { MessageActionProps } from '../../App'
import { showMessageAction } from '../../store/util/actions'
import { message } from 'antd'
import { useHistory } from 'react-router-dom'

interface RegisterProps {
  user: IUserState
  register(data: IRegister, callback: Function): void
}

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

const Register: React.SFC<RegisterProps & MessageActionProps> = ({
  register
}) => {
  const classes = useStyles()
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [confirmPassword, setConfirmPassword] = React.useState('')
  const history = useHistory()
  return (
    <Container className={classes.root} disableGutters>
      <CssBaseline>
        <Grid container spacing={4} className={classes.form}>
          <Grid item xs={8} className={classes.item} container>
            <TextField
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
            <TextField
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              label='confirm password'
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
                if (!(username.length >= 5 && username.length <= 30)) {
                  message.error('username length should be between 5 and 30')
                  return
                }
                if (password !== confirmPassword) {
                  message.error('password is not same to confirmPassword')
                } else if (!(password.length >= 8 && password.length <= 30)) {
                  message.error('password length should be between 8 and 30')
                } else {
                  register(
                    { username, password, confirmPassword },
                    (res: Record<string, string>) => {
                      if (res && res.success) {
                        history.replace('/login')
                      }
                    }
                  )
                }
              }}
            >
              Register
            </Button>
          </Grid>
        </Grid>
      </CssBaseline>
    </Container>
  )
}

const mapStateToProps = (state: IState) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  register: registerAction,
  showMessageAction
}

const RegisterForm = connect(mapStateToProps, mapDispatchToProps)(Register)

export default {
  name: 'user',
  reducers: userReducer,
  view: RegisterForm
}
