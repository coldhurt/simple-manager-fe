import React from 'react'
import { RouteChildrenProps } from 'react-router'
import { IClient } from '../../store/client/types'
import { NavLink } from 'react-router-dom'
import { Post, IResponseJSON } from '../../utils'
import { Layout, Spin, Form, Checkbox, Table, Input, Col, Row } from 'antd'
import { ColumnsType } from '../../components/types'

const { Header, Content, Sider } = Layout

const ClientDetail: React.FC<RouteChildrenProps> = ({ match }) => {
  const [state, setState] = React.useState({} as IClient)
  const [loading, setLoading] = React.useState(false)
  React.useEffect(() => {
    if (match) {
      setLoading(true)
      Post('/api/client/detail', match ? match.params : {}).then(
        (res: IResponseJSON) => {
          setState(res.data || {})
          setLoading(false)
        }
      )
    }
  }, [match])
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
    }
  ]
  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 18 }
  }
  const prevNextButton = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 400,
    fontSize: 30
  }
  return (
    <Layout>
      <Header>
        <NavLink to={`/admin/client/list`}>返回客户列表</NavLink>
      </Header>
      <Content>
        <Row>
          <Col span={2} style={prevNextButton}>
            {state.prevId && (
              <div>
                <NavLink to={`/admin/client/detail/${state.prevId}`}>
                  {'<<'}
                </NavLink>
              </div>
            )}
          </Col>
          <Col span={20}>
            <Spin spinning={loading}>
              <Form {...formItemLayout} style={{ margin: 20 }}>
                <Form.Item label='客户名'>
                  <Input value={state.clientName} />
                </Form.Item>
                <Form.Item label='手机号'>
                  <Input value={state.tel} />
                </Form.Item>
                <Form.Item label='支付状态'>
                  <Checkbox checked={state.payStatus} disabled />
                </Form.Item>
                <Form.Item label='产品列表'>
                  <Table
                    columns={productsColumn}
                    dataSource={(state.products || []).map((item, index) => ({
                      ...item,
                      key: index
                    }))}
                  />
                </Form.Item>
                <Form.Item label='创建时间'>{state.createdAt}</Form.Item>
                <Form.Item label='更新时间'>{state.updatedAt}</Form.Item>
              </Form>
            </Spin>
          </Col>
          <Col span={2} style={prevNextButton}>
            {state.nextId && (
              <div>
                <NavLink to={`/admin/client/detail/${state.nextId}`}>
                  {'>>'}
                </NavLink>
              </div>
            )}
          </Col>
        </Row>
      </Content>
    </Layout>
  )
}

export default {
  view: ClientDetail
}
