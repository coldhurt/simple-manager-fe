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
  onOk = () => {
    this.props.onClose()
  }
  render() {
    const { visible, onClose } = this.props
    const { userInfo } = this.state
    return (
      <Modal visible={visible} onCancel={onClose} onOk={this.onOk}>
        <Form>
          <Form.Item label='用户名'>
            <Input value={userInfo.username} disabled />
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

export default connect(mapStateToProps, mapDispatchToProps)(ChangeUserInfoModal)
