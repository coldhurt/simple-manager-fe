import React from 'react'
import { connect } from 'react-redux'
import { fetchClients } from '../../store/client/actions'
import { AppState } from '../../store'
import { IClientState } from '../../store/client/types'
import { Table } from 'antd'

interface IClientListProps {
  fetchClients: Function
  clients: IClientState
}

class ClientList extends React.Component<IClientListProps> {
  componentDidMount() {
    this.props.fetchClients()
  }

  render() {
    const { clients } = this.props
    const columns = [
      {
        title: '客户名',
        dataIndex: 'clientName',
        key: 'clientName'
      },
      {
        title: '电话',
        dataIndex: 'tel',
        key: 'tel'
      },
      {
        title: '是否付款',
        dataIndex: 'payStatus',
        key: 'payStatus',
        render: (text: boolean) => <span>{text ? '已付款' : '未付款'}</span>
      }
    ]
    const data = clients.items.map(item => {
      return {
        ...item,
        key: item._id
      }
    })

    return <Table dataSource={data} columns={columns} />
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    clients: state.clients
  }
}

const mapDispatchToProps = {
  fetchClients
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClientList)
