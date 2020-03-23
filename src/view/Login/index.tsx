import React from 'react'
import { IUserState, IAdmin } from '../../store/user/types'
import { IState } from '../../store/types'
import { connect } from 'react-redux'
import { loginAction } from '../../store/user/actions'
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

interface LoginProps {
  user: IUserState
  login(auth: Object): void
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

const Login: React.SFC<LoginProps & MessageActionProps> = ({ login }) => {
  const classes = useStyles()
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
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
            <Button
              className={classes.button}
              fullWidth
              onClick={() => {
                login({ username, password })
              }}
            >
              Login
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
  login: loginAction,
  showMessageAction
}

const LoginForm = connect(mapStateToProps, mapDispatchToProps)(Login)

export default {
  name: 'login',
  reducers: userReducer,
  view: LoginForm
}
