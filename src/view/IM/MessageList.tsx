import { MessageOutlined } from '@ant-design/icons';
import { List, Spin, Empty, Avatar } from 'antd';
import * as React from 'react'
import { IAdmin } from '../../store/user/types'

interface MessageListProps {
  data: IAdmin[]
  activeFriend: string
  loading: boolean
  onClick(friend: IAdmin): void
}

const MessageList: React.SFC<MessageListProps> = ({
  data,
  activeFriend,
  onClick,
  loading
}) => {
  return (
    <Spin spinning={loading}>
      {Array.isArray(data) && data.length > 0 ? (
        <List className='friend-list'>
          {data.map(item => (
            <List.Item key={item._id}>
              <div
                className={
                  activeFriend === item._id ? 'friend-row active' : 'friend-row'
                }
                onClick={() => onClick(item)}
              >
                <div className='left'>
                  <Avatar src={item.avatar} alt={item.username} />
                </div>
                <div className='right'>
                  <div className='username'>{item.username}</div>
                  <div className='last-msg'>{item.lastMsg}</div>
                </div>
              </div>
            </List.Item>
          ))}
        </List>
      ) : (
        <Empty
          imageStyle={{ height: 30, width: 'auto' }}
          style={{ color: '#fff', marginTop: 30 }}
          image={<MessageOutlined />}
          description='消息列表为空'
        ></Empty>
      )}
    </Spin>
  );
}

export default MessageList
