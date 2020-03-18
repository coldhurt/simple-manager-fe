import React from 'react'
import { Input, Button, Layout, Form, Tooltip } from 'antd'
import userReducer from '../../store/user/reducers'
import './register.css'
import { QuestionCircleOutlined } from '@ant-design/icons'

const { Content } = Layout

class Register extends React.Component {
  state = {
    loading: false
  }

  componentDidMount() {}

  onFinish = (values: any) => {
    console.log('Received values of form: ', values)
  }

  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 10 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    }
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    }
    return (
      <Layout className='register-layout'>
        <Content className='register-form'>
          <Form
            {...formItemLayout}
            onFinish={this.onFinish}
            name='register'
            scrollToFirstError
          >
            <Form.Item
              name='username'
              label='Username'
              rules={[
                {
                  required: true,
                  message: 'Please input your username!'
                }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name='password'
              label='Password'
              rules={[
                {
                  required: true,
                  message: 'Please input your password!'
                }
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name='confirm'
              label='Confirm Password'
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!'
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve()
                    }
                    return Promise.reject(
                      'The two passwords that you entered do not match!'
                    )
                  }
                })
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name='nickname'
              label={
                <span>
                  Nickname&nbsp;
                  <Tooltip title='What do you want others to call you?'>
                    <QuestionCircleOutlined />
                  </Tooltip>
                </span>
              }
              rules={[
                {
                  required: true,
                  message: 'Please input your nickname!',
                  whitespace: true
                }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type='primary' htmlType='submit'>
                Register
              </Button>
            </Form.Item>
          </Form>
        </Content>
      </Layout>
    )
  }
}

export default {
  name: 'register',
  reducers: userReducer,
  view: Register
}
