import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Modal, Input, Button, Avatar, Row, Col, message } from 'antd';
import * as React from 'react'
import { IAdmin, IUserState } from '../../store/user/types'
import { AppState } from '../../store'
import { userListAction, friendAddAction } from '../../store/user/actions'
import { connect } from 'react-redux'

interface AddFriendModalProps {
  users: IUserState
  visible: boolean
  onCloseAddFriend(): void
  friendAddAction(friend_id: string): void
  userListAction(): void
}

interface AddFriendListItemProps {
  user: IAdmin
  onClickAdd(user: IAdmin): void
}

const AddFriendListItem: React.SFC<AddFriendListItemProps> = ({
  user,
  onClickAdd
}) => {
  return (
    <div className='add-friend-list-item'>
      <Avatar src={user.avatar} />
      <div>
        <div>{user.username}</div>
        <PlusOutlined onClick={() => onClickAdd(user)} />
      </div>
    </div>
  );
}

class AddFriendModal extends React.Component<AddFriendModalProps> {
  state = {
    query: ''
  }

  static getDerivedStateFromProps(
    nextProps: AddFriendModalProps,
    prevState: any
  ) {
    const { addFriendLoading, error, success } = nextProps.users
    if (!addFriendLoading && prevState.addFriendLoading) {
      if (!success && error) {
        message.error(error)
      } else {
        message.success('add successfully')
      }
    }
    return { ...prevState, addFriendLoading }
  }

  onSearch = () => {
    this.props.userListAction()
  }
  render() {
    const { visible, users, onCloseAddFriend, friendAddAction } = this.props
    return (
      <Modal
        visible={visible}
        onCancel={onCloseAddFriend}
        footer={null}
        onOk={onCloseAddFriend}
      >
        <Row>
          <Col span={14} style={{ marginRight: 20 }}>
            <Input
              placeholder='搜索用户名字'
              value={this.state.query}
              onChange={e => this.setState({ query: e.target.value })}
              onPressEnter={this.onSearch}
            />
          </Col>
          <Col span={4}>
            <Button icon={<SearchOutlined />} onClick={this.onSearch}>
              搜索
            </Button>
          </Col>
        </Row>
        <div>
          <Row gutter={[16, 24]}>
            {users.users.map(item => (
              <Col key={item._id} span={6}>
                <AddFriendListItem
                  user={item}
                  onClickAdd={user => friendAddAction(user._id)}
                />
              </Col>
            ))}
          </Row>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    users: state.users
  }
}

const mapDispatchToProps = {
  friendAddAction,
  userListAction
}

export default connect(mapStateToProps, mapDispatchToProps)(AddFriendModal)
