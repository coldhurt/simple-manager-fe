import { Modal, Input, Form } from 'antd'
import * as React from 'react'
import { connect } from 'react-redux'
import { AppState } from '../../store'
import { IUserState } from '../../store/user/types'
import { WrappedFormUtils } from 'antd/lib/form/Form'

interface ChangeUserInfoModalProps {
  users: IUserState
  visible: boolean
  onClose(): void
  form: WrappedFormUtils
}

class ChangeUserInfoModal extends React.Component<ChangeUserInfoModalProps> {
  state = {
    userInfo: {
      username: '',
      avatar: ''
    }
  }
  componentDidMount() {
    this.setState({
      userInfo: this.props.users.userInfo || {}
    })
  }
  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if(e) e.preventDefault()
    this.props.form.validateFields((err: any, values: any) => {
      if (!err) {
        console.log('Received values of form: ', values)
      }
    })
  }
  onOk = () => {
    this.props.onClose()
  }
  render() {
    const { getFieldDecorator, getFieldError, isFieldTouched } = this.props.form
    const { visible, onClose } = this.props
    const { userInfo } = this.state
    const usernameError =
      isFieldTouched('username') && getFieldError('username')
    return (
      <Modal
        visible={visible}
        onCancel={onClose}
        onOk={this.onOk}
        style={{ paddingTop: 20 }}
      >
        <Form onSubmit={this.handleSubmit}>
          <Form.Item
            validateStatus={usernameError ? 'error' : ''}
            help={usernameError || ''}
          >
            {getFieldDecorator('nickname', {
              rules: [
                {
                  required: true,
                  message: 'Please input your nickname!'
                }
              ]
            })(<Input placeholder='Username' />)}
          </Form.Item>
          <Form.Item label='头像'>
            <Input value={userInfo.avatar} />
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    users: state.users
  }
}

const mapDispatchToProps = {}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  Form.create<ChangeUserInfoModalProps>({ name: 'change_user_info_form' })(
    ChangeUserInfoModal
  )
)
