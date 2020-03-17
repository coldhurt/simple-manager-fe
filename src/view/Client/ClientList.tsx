import React from 'react'
import { connect } from 'react-redux'
import { fetchClients } from '../../store/client/actions'
import { AppState } from '../../store'
import { IClientState, IClient } from '../../store/client/types'
import {
  Table,
  Layout,
  Row,
  Col,
  Button,
  Modal,
  Form,
  Input,
  message,
  Checkbox,
  Popconfirm
} from 'antd'
import clientsReducer from '../../store/client/reducers'
import { NavLink } from 'react-router-dom'
import { FormComponentProps } from 'antd/lib/form'
import { ColumnProps } from 'antd/lib/table'
import { Post } from '../../utils'
import moment from 'moment'
import EditableTable from '../../components/EditableTable'
import { IProductData, ColumnsType } from '../../components/types'

const { Header, Content } = Layout

interface IClientListProps {
  fetchClients: Function
  clients: IClientState
}

interface IAddClientProps extends FormComponentProps {
  visible: boolean
  confirmLoading: boolean
  handleOk(data: Object): void
  handleCancel(): void
}

const AddClientModal = Form.create<IAddClientProps>({ name: 'AddClientForm' })(
  ({
    form,
    visible,
    confirmLoading,
    handleOk,
    handleCancel
  }: IAddClientProps) => {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    }
    const handleSubmit = (e: any) => {
      form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          handleOk(values)
        }
      })
    }

    const [products, setProducts] = React.useState<IProductData[]>([])

    const handleDelete = (key: string) => {
      const prods = products.filter(item => item.key !== key)
      setProducts(prods)
    }

    const handleAdd = () => {
      const newData: IProductData = {
        key: products.length + 1,
        productName: '',
        type: '',
        count: 1,
        storageFee: 1,
        processingFee: 1
      }
      setProducts([...products, newData])
    }

    const productsColumn: ColumnsType[] = [
      {
        title: '商品名',
        dataIndex: 'productName',
        width: '30%',
        editable: true
      },
      {
        title: '数量',
        dataIndex: 'count'
      },
      {
        title: '类型',
        dataIndex: 'type'
      },
      {
        title: '加工费',
        dataIndex: 'processingFee'
      },
      {
        title: '存储费',
        dataIndex: 'storageFee'
      },
      {
        title: '操作',
        dataIndex: 'operation',
        render: (text: string, record: IProductData) =>
          products.length >= 1 ? (
            <Popconfirm
              title='Sure to delete?'
              onConfirm={() => handleDelete(record.key as string)}
            >
              <a href='javascript:;'>Delete</a>
            </Popconfirm>
          ) : null
      }
    ]

    const { getFieldDecorator } = form
    return (
      <Modal
        width={730}
        confirmLoading={confirmLoading}
        title='添加客户'
        visible={visible}
        onOk={handleSubmit}
        onCancel={handleCancel}
      >
        <Form {...formItemLayout}>
          <Form.Item label='客户名称'>
            {getFieldDecorator('clientName', {
              rules: [
                {
                  type: 'string',
                  message: 'The input is not valid client name!'
                },
                {
                  required: true,
                  message: 'Please input your client name!'
                }
              ]
            })(<Input />)}
          </Form.Item>
          <Form.Item label='电话'>
            {getFieldDecorator('tel', {
              rules: [
                {
                  len: 11,
                  pattern: /^1\d{10}$/g,
                  message: 'The input is not valid mobile number!'
                },
                {
                  required: true,
                  message: 'Please input your client mobile number!'
                }
              ]
            })(<Input />)}
          </Form.Item>
          <Form.Item label='是否付款'>
            {getFieldDecorator('payStatus', {})(<Checkbox />)}
          </Form.Item>
          <EditableTable
            form={form}
            columns={productsColumn}
            dataSource={products}
            handleAdd={handleAdd}
            handleSave={handleSubmit}
          />
        </Form>
      </Modal>
    )
  }
)

class ClientList extends React.Component<IClientListProps> {
  state = {
    visible: false,
    confirmLoading: false
  }

  componentDidMount() {
    this.props.fetchClients()
  }

  handleCancel = () => {
    this.setState({
      visible: false
    })
  }

  handleOk = async (data = {}) => {
    this.setState({
      confirmLoading: true
    })
    const res = await Post('/api/client/add', data)
    if (res.success) {
      message.success('添加成功')
      this.props.fetchClients()
      this.setState({
        confirmLoading: false,
        visible: false
      })
    } else {
      message.error(res.msg || '添加失败')
      this.setState({
        confirmLoading: false
      })
    }
  }

  handleAdd = () => {
    this.setState({
      visible: true
    })
  }

  handleDelete = (obj: IClient) => {
    Modal.confirm({
      title: `确定删除${obj.clientName}吗？`,
      onOk: () => {
        console.log(obj)
        Post('/api/client/delete', { id: obj._id }).then(res => {
          if (res.success) {
            this.props.fetchClients()
          } else {
            message.error(res.msg)
          }
        })
      }
    })
  }

  render() {
    const { clients } = this.props
    const columns: ColumnProps<IClient>[] = [
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
      },
      {
        title: '加入日期',
        dataIndex: 'createdAt',
        key: 'createdAt',
        defaultSortOrder: 'descend',
        sortDirections: ['descend', 'ascend'],
        sorter: (a: IClient, b: IClient) =>
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
        render: (id: string, obj: IClient) => (
          <div>
            <NavLink to={`/admin/client/detail/${id}`}>查看详情</NavLink>
            {' | '}
            <a onClick={() => this.handleDelete(obj)}>删除</a>
          </div>
        )
      }
    ]
    const data = clients.items.map(item => {
      return {
        ...item,
        key: item._id
      }
    })

    const { visible, confirmLoading } = this.state

    return (
      <Layout>
        <Header style={{ color: '#fff', fontSize: 30, fontWeight: 'bold' }}>
          <Row>
            <Col span={22}>客户列表</Col>
            <Col span={2}>
              <Button onClick={this.handleAdd} type='primary' icon='plus'>
                添加新客户
              </Button>
            </Col>
          </Row>
        </Header>
        <Content>
          <Table
            loading={clients.loading}
            dataSource={data}
            columns={columns}
          />
        </Content>
        <AddClientModal
          confirmLoading={confirmLoading}
          visible={visible}
          handleCancel={this.handleCancel}
          handleOk={this.handleOk}
        />
      </Layout>
    )
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

export default {
  name: 'clients',
  reducers: clientsReducer,
  view: connect(mapStateToProps, mapDispatchToProps)(ClientList)
}
