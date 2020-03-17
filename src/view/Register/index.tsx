import React from 'react'
import { Form, Icon, Input, Button, message, Layout } from 'antd'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import userReducer from '../../store/user/reducers'
import './register.css'

interface IRegisterProps {
  form: WrappedFormUtils
}

const { Content } = Layout

function hasErrors(fieldsError: Record<string, string[] | undefined>) {
  return Object.keys(fieldsError).some((field: string) => fieldsError[field])
}
class Register extends React.Component<IRegisterProps> {
  state = {
    loading: false
  }

  componentDidMount() {
    this.props.form.validateFields()
  }

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    this.props.form.validateFields((err: any, values: any) => {
      if (!err) {
        console.log('Received values of form: ', values)
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

    // Only show error after a field is touched.
    const usernameError =
      isFieldTouched('username') && getFieldError('username')
    const passwordError =
      isFieldTouched('password') && getFieldError('password')
    const repasswordError =
      isFieldTouched('repassword') && getFieldError('repassword')
    return (
      <Layout className='register-layout'>
        <Content className='register-form'>
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
            <Form.Item
              validateStatus={repasswordError ? 'error' : ''}
              help={repasswordError || ''}
            >
              {getFieldDecorator('repassword', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your Password again!'
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
                  placeholder='Password twice'
                />
              )}
            </Form.Item>
            <Form.Item>
              <Button
                type='primary'
                htmlType='submit'
                loading={this.state.loading}
                disabled={hasErrors(getFieldsError())}
              >
                注册
              </Button>
            </Form.Item>
          </Form>
        </Content>
      </Layout>
    )
  }
}

const RegisterForm = Form.create({ name: 'register_form' })(Register)

export default {
  name: 'register',
  reducers: userReducer,
  view: RegisterForm
}
