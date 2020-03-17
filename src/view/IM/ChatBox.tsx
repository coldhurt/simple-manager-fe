import { List, Avatar, Button } from 'antd'
import React, { Component } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import { IAdmin, IMessage, IUserState } from '../../store/user/types'
import { AppState } from '../../store'
import { connect } from 'react-redux'
import { chatBoxListSuccessAction } from '../../store/user/actions'

interface ChatBoxProps {
  friend: IAdmin
  chat: SocketIOClient.Socket | null
  users: IUserState
  chatBoxListSuccessAction(data: IMessage[]): void
}

class ChatBox extends Component<ChatBoxProps> {
  componentDidMount() {
    this.scrollToBottom()
    if (this.props.chat)
      this.props.chat.on('receive', (msg: IMessage) => {
        this.props.chatBoxListSuccessAction([
          ...this.props.users.chatboxMessage,
          msg
        ])
        this.scrollToBottom()
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
  handleInfiniteOnLoad = async () => {}
  onClear = () => {
    this.props.chatBoxListSuccessAction([])
  }
  render() {
    const { friend, users } = this.props
    return (
      <div>
        <div style={{ margin: 10 }}>
          当前聊天对象：{friend.username}{' '}
          <Button onClick={this.onClear}>清空聊天内容</Button>
        </div>
        <InfiniteScroll
          className='chat-box-list'
          initialLoad={false}
          pageStart={0}
          loadMore={this.handleInfiniteOnLoad}
          hasMore={false}
          useWindow={false}
        >
          {users.chatboxMessage && users.chatboxMessage.length > 0 && (
            <List
              dataSource={users.chatboxMessage}
              renderItem={(item: IMessage) =>
                item.sender === friend._id ? (
                  <List.Item key={item._id} className={'receive-message-item'}>
                    <div>
                      <Avatar src={friend.avatar} />
                      <div>
                        <div>{item.message}</div>
                        <div>{new Date(item.createdAt).toLocaleString()}</div>
                      </div>
                    </div>
                  </List.Item>
                ) : (
                  <List.Item key={item._id} className={'send-message-item'}>
                    <div>
                      <div>
                        <div>{item.message}</div>
                        <div>{new Date(item.createdAt).toLocaleString()}</div>
                      </div>
                      <Avatar src={friend.avatar} />
                    </div>
                  </List.Item>
                )
              }
            >
              {/* {this.state.loading && this.state.hasMore && <Spin />} */}
            </List>
          )}
        </InfiniteScroll>
      </div>
    )
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    users: state.users
  }
}

const mapDispatchToProps = {
  chatBoxListSuccessAction
}
export default connect(mapStateToProps, mapDispatchToProps)(ChatBox)
