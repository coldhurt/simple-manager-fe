import { List, Spin, Empty, Icon, Avatar } from 'antd'
import * as React from 'react'
import { IAdmin } from '../../store/user/types'

interface FriendListProps {
  data: IAdmin[]
  activeFriend: string
  loading: boolean
  onClickAddFriend(): void
  onClick(friend: IAdmin): void
}

const FriendList: React.SFC<FriendListProps> = ({
  data,
  activeFriend,
  onClick,
  onClickAddFriend,
  loading
}) => {
  return (
    <div>
      <Spin spinning={loading}>
        {Array.isArray(data) && data.length > 0 ? (
          <List className='friend-list'>
            {data.map(item => (
              <List.Item key={item._id}>
                <div
                  className={
                    activeFriend === item._id
                      ? 'friend-row active'
                      : 'friend-row'
                  }
                  onClick={() => onClick(item)}
                >
                  <div className='left'>
                    <Avatar src={item.avatar} alt={item.username} />
                  </div>
                  <div className='right'>
                    <div className='username'>{item.username}</div>
                  </div>
                </div>
              </List.Item>
            ))}
          </List>
        ) : (
          <Empty
            imageStyle={{ height: 30, width: 'auto' }}
            style={{ color: '#fff', marginTop: 30 }}
            image={<Icon type='user' />}
            description='好友为空'
          ></Empty>
        )}
      </Spin>
      <Icon onClick={onClickAddFriend} type='plus' className='add-friend-btn' />
    </div>
  )
}

export default FriendList
