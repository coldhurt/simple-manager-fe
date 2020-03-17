import React, { Component } from 'react'
import { AppState } from '../../store'
import userReducer from '../../store/user/reducers'
import { userListAction } from '../../store/user/actions'
import { connect } from 'react-redux'
import { IUserState, IAdmin } from '../../store/user/types'
import { Layout, Row, Col, Button, Table, message, Modal } from 'antd'
import { NavLink } from 'react-router-dom'
import { ColumnProps } from 'antd/lib/table'
import moment from 'moment'
import { Post } from '../../utils'

const { Header, Content } = Layout

interface IUserListProps {
  userListAction: Function
  users: IUserState
}

class AdminList extends Component<IUserListProps> {
  componentDidMount() {
    this.props.userListAction()
  }

  handleAdd = () => {}

  handleDelete = (user: IAdmin) => {
    Modal.confirm({
      title: `确定删除${user.username}吗？`,
      onOk: () => {
        Post('/api/admin/delete', { id: user._id }).then(res => {
          if (res.success) {
            this.props.userListAction()
          } else {
            message.error(res.msg)
          }
        })
      }
    })
  }

  render() {
    const { users } = this.props
    console.log(users)
    const columns: ColumnProps<IAdmin>[] = [
      {
        title: '登录名',
        dataIndex: 'username',
        key: 'username'
      },
      {
        title: '加入日期',
        dataIndex: 'createdAt',
        key: 'createdAt',
        defaultSortOrder: 'descend',
        sortDirections: ['descend', 'ascend'],
        sorter: (a: IAdmin, b: IAdmin) =>
          moment.utc(a.createdAt).milliseconds() -
          moment.utc(b.createdAt).milliseconds(),
        render: (date: string) => (
          <span>
            {moment
              .utc(date || '')
              .local()
              .format('YYYY-MM-DD HH:mm:ss')}
          </span>
        )
      },
      {
        title: '操作',
        dataIndex: '_id',
        render: (id: string, obj: IAdmin) => (
          <div>
            <NavLink to={`/adminDetail/${id}`}>查看详情</NavLink>
            {' | '}
            <a onClick={() => this.handleDelete(obj)}>删除</a>
          </div>
        )
      }
    ]
    const data = users.users.map(item => {
      return {
        ...item,
        key: item._id
      }
    })
    return (
      <Layout>
        <Header style={{ color: '#fff', fontSize: 30, fontWeight: 'bold' }}>
          <Row>
            <Col span={22}>管理员列表</Col>
            <Col span={2}>
              <Button onClick={this.handleAdd} type='primary' icon='plus'>
                添加新管理员
              </Button>
            </Col>
          </Row>
        </Header>
        <Content>
          <Table loading={users.loading} dataSource={data} columns={columns} />
        </Content>
      </Layout>
    )
  }
}
const mapStateToProps = (state: AppState) => {
  return {
    users: state.users
  }
}

const mapDispatchToProps = {
  userListAction
}

export default {
  name: 'admins',
  reducers: userReducer,
  view: connect(mapStateToProps, mapDispatchToProps)(AdminList)
}
