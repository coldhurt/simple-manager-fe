import React from 'react'
import { Form, Icon, Input, Button, message, Layout } from 'antd'
import { IUserState } from '../../store/user/types'
import { IState } from '../../store/types'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import { connect } from 'react-redux'
import { loginAction } from '../../store/user/actions'
import userReducer from '../../store/user/reducers'
import './login.css'

interface ILoginProps {
  user: IUserState
  form: WrappedFormUtils
  login: Function
}

const { Content } = Layout

function hasErrors(fieldsError: Record<string, string[] | undefined>) {
  return Object.keys(fieldsError).some((field: string) => fieldsError[field])
}
class Login extends React.Component<ILoginProps> {
  constructor(props: ILoginProps) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }

  static getDerivedStateFromProps(nextProps: ILoginProps, prevState: any) {
    const { loading, error, success } = nextProps.user
    if (!loading && prevState.loading) {
      if (!success && error) {
        message.error(error)
      } else {
        message.success('login successfully')
        setTimeout(() => {
          window.location.href = '/'
        })
      }
    }

    return { ...prevState, loading }
  }

  onChangeState = (stateKey: string) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    this.setState({
      stateKey: e.target.value
    })
  }

  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields()
  }

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    this.props.form.validateFields((err: any, values: any) => {
      if (!err) {
        console.log('Received values of form: ', values)
        this.props.login(values)
      }
    })
  }

  render() {
    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched
    } = this.props.form

    const { loading } = this.props.user

    // Only show error after a field is touched.
    const usernameError =
      isFieldTouched('username') && getFieldError('username')
    const passwordError =
      isFieldTouched('password') && getFieldError('password')
    return (
      <Layout className='login-layout'>
        <Content className='login-form'>
          <Form onSubmit={this.handleSubmit}>
            <Form.Item
              validateStatus={usernameError ? 'error' : ''}
              help={usernameError || ''}
            >
              {getFieldDecorator('username', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your username!'
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon
                      type='user'
                      style={{
                        color: 'rgba(0,0,0,.25)'
                      }}
                    />
                  }
                  placeholder='Username'
                />
              )}
            </Form.Item>
            <Form.Item
              validateStatus={passwordError ? 'error' : ''}
              help={passwordError || ''}
            >
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your Password!'
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon
                      type='lock'
                      style={{
                        color: 'rgba(0,0,0,.25)'
                      }}
                    />
                  }
                  type='password'
                  placeholder='Password'
                />
              )}
            </Form.Item>
            <Form.Item>
              <Button
                type='primary'
                htmlType='submit'
                loading={loading}
                disabled={hasErrors(getFieldsError())}
              >
                Log in
              </Button>
            </Form.Item>
          </Form>
        </Content>
      </Layout>
    )
  }
}

const mapStateToProps = (state: IState) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  login: loginAction
}

const LoginForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create({ name: 'horizontal_login' })(Login))

export default {
  name: 'user',
  reducers: userReducer,
  view: LoginForm
}
