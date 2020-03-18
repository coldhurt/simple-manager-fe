import React, { Component } from 'react'
import { AppState } from '../../store'
import userReducer from '../../store/user/reducers'
import {
  friendListAction,
  userListAction,
  friendAddAction,
  userInfoAction,
  chatBoxListAction
} from '../../store/user/actions'
import { connect } from 'react-redux'
import { IUserState, IAdmin, IMessage } from '../../store/user/types'
import { MessageOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Input, Row, Col, Button, message, Menu } from 'antd';
import io from 'socket.io-client'
import Sider from 'antd/lib/layout/Sider'
import FriendList from './FriendList'
import './im.css'
import { ClickParam } from 'antd/lib/menu'
import MessageList from './MessageList'
import AddFriendModal from './AddFriendModal'
import ChatBox from './ChatBox'
import ChangeUserInfoModal from './ChangeUserInfoModal'

const { Content } = Layout

interface IMProps {
  friendListAction: Function
  userListAction: Function
  friendAddAction(friend_id: string | undefined): void
  chatBoxListAction(friend_id: string | undefined): void
  userInfoAction(): void
  users: IUserState
}

interface IMState {
  message: IMessage[]
  currentMessage: string
  activeFriend: IAdmin
  currentSiderMenu: string
  showAddFriendModel: boolean
  showChangeUserModal: boolean
}

class IMView extends Component<IMProps, IMState> {
  state = {
    message: [],
    currentMessage: '',
    activeFriend: {
      _id: '',
      username: ''
    },
    currentSiderMenu: 'message',
    showAddFriendModel: false,
    showChangeUserModal: false
  }
  chat: null | SocketIOClient.Socket = null
  componentDidMount() {
    this.props.userInfoAction()
    this.props.friendListAction()
    const chat = io('/')
    this.chat = chat
    chat.on('message', (msg: string) => {
      console.log(msg)
      // this.setState({ message: [...this.state.message, { message: msg }] })
    })
    chat.on('connect', (msg: string) => {
      message.info('connected')
    })
    chat.on('error', (err: any) => {
      message.error(err)
      setTimeout(function() {
        if (err === 'need login') {
          window.location.href = '/login'
        }
      }, 300)
    })
    chat.on('disconnect', (err: any) => {
      console.log(err)
    })
  }

  sendMessage = () => {
    const { currentMessage, activeFriend } = this.state
    if (currentMessage && this.chat) {
      this.chat.emit('send', {
        receiver: activeFriend._id,
        message: currentMessage
      })
    }
    this.setState({
      currentMessage: ''
    })
  }

  scrollToBottom = () => {
    setTimeout(() => {
      const dom = document.getElementsByClassName('chat-box-list')
      dom[0].scrollTo({
        left: 0,
        top: dom[0].scrollHeight,
        behavior: 'smooth'
      })
    }, 200)
  }

  onClickFriend = (friend: IAdmin) => {
    this.props.chatBoxListAction(friend._id)
    this.setState(
      {
        activeFriend: friend
      },
      () => {
        this.scrollToBottom()
      }
    )
  }
  onClickAddFriend = () => {
    this.setState({
      showAddFriendModel: true
    })
  }
  onCloseAddFriend = () => {
    this.setState({
      showAddFriendModel: false
    })
  }
  onSearchAddFriend = () => {
    this.props.userListAction()
  }

  handleMenuClick = (t: ClickParam) => {
    switch (t.key) {
      case 'friends':
        this.props.friendListAction()
        break
      default:
    }
    this.setState({
      currentSiderMenu: t.key
    })
  }
  onClickShowChangeUserInfo = () => {
    this.setState({
      showChangeUserModal: true
    })
  }
  onClickHideChangeUserInfo = () => {
    this.setState({
      showChangeUserModal: false
    })
  }
  render() {
    const {
      activeFriend,
      currentSiderMenu,
      showAddFriendModel,
      showChangeUserModal
    } = this.state
    const { users } = this.props
    return (
      <Layout className='im-container'>
        <Sider>
          <div className='current-user-bar'>
            当前用户：{users.userInfo && users.userInfo.username}{' '}
            <Button onClick={this.onClickShowChangeUserInfo}>更改资料</Button>
          </div>
          <Menu
            onClick={this.handleMenuClick}
            selectedKeys={[currentSiderMenu]}
            mode='horizontal'
            theme='dark'
          >
            <Menu.Item key='message'>
              <MessageOutlined />
            </Menu.Item>
            <Menu.Item key='friends'>
              <UserOutlined />
            </Menu.Item>
          </Menu>
          {currentSiderMenu === 'friends' ? (
            <FriendList
              loading={users.loading}
              data={users.friends || []}
              activeFriend={activeFriend ? activeFriend._id : ''}
              onClick={this.onClickFriend}
              onClickAddFriend={this.onClickAddFriend}
            />
          ) : (
            <MessageList
              loading={users.loading}
              data={users.friends || []}
              activeFriend={activeFriend ? activeFriend._id : ''}
              onClick={this.onClickFriend}
            />
          )}
          <AddFriendModal
            visible={showAddFriendModel}
            onCloseAddFriend={this.onCloseAddFriend}
          />
          <ChangeUserInfoModal
            visible={showChangeUserModal}
            onClose={this.onClickHideChangeUserInfo}
          />
        </Sider>
        {activeFriend && activeFriend._id && (
          <Content>
            <ChatBox friend={activeFriend} chat={this.chat} />
            <Row className='send-form'>
              <Col span={10}>
                <Input
                  value={this.state.currentMessage}
                  onChange={e =>
                    this.setState({ currentMessage: e.target.value })
                  }
                  onPressEnter={this.sendMessage}
                />
              </Col>
              <Col span={10}>
                <Button onClick={this.sendMessage}>发送</Button>
              </Col>
            </Row>
          </Content>
        )}
      </Layout>
    );
  }
}
const mapStateToProps = (state: AppState) => {
  return {
    users: state.users
  }
}

const mapDispatchToProps = {
  friendListAction,
  friendAddAction,
  userListAction,
  userInfoAction,
  chatBoxListAction
}

export default {
  name: 'im',
  reducers: userReducer,
  view: connect(mapStateToProps, mapDispatchToProps)(IMView)
}
