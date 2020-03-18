import { Modal, Input, Form } from 'antd'
import * as React from 'react'
import { connect } from 'react-redux'
import { AppState } from '../../store'
import { IUserState } from '../../store/user/types'

interface ChangeUserInfoModalProps {
  users: IUserState
  visible: boolean
  onClose(): void
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
  onFinish = (values: any) => {
    console.log(values)
  }
  onOk = () => {
    this.props.onClose()
  }
  render() {
    const { visible, onClose } = this.props
    const { userInfo } = this.state
    return (
      <Modal
        visible={visible}
        onCancel={onClose}
        onOk={this.onOk}
        style={{ paddingTop: 20 }}
      >
        <Form onFinish={this.onFinish} name='userinfo' scrollToFirstError>
          <Form.Item
            name='nickname'
            label='nickname'
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
            name='avatar'
            label='avatar'
            rules={[
              {
                required: true,
                message: 'Please input your avatar!'
              }
            ]}
          >
            <Input />
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

export default connect(mapStateToProps, mapDispatchToProps)(ChangeUserInfoModal)
