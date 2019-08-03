import React from 'react'
import { RouteChildrenProps } from 'react-router'
import { IClient } from '../../store/client/types'
import { NavLink } from 'react-router-dom'
import { Post, IResponseJSON } from '../../utils'
import { Layout, Spin } from 'antd'

const { Header, Content } = Layout

const ClientDetail: React.FC<RouteChildrenProps> = ({ match }) => {
  const [state, setState] = React.useState({} as IClient)
  const [loading, setLoading] = React.useState(false)
  React.useEffect(() => {
    if (match) {
      setLoading(true)
      Post('/getClientDetail', match ? match.params : {}).then(
        (res: IResponseJSON) => {
          setState(res.data || {})
          setLoading(false)
        }
      )
    }
  }, [match])
  return (
    <Layout>
      <Header>
        <NavLink to={`/clientList`}>返回客户列表</NavLink>
      </Header>
      <Content>
        <Spin spinning={loading}>
          {state.clientName}
          {state.prevId && (
            <div>
              <NavLink to={`/clientDetail/${state.prevId}`}>prev</NavLink>
            </div>
          )}

          {state.nextId && (
            <div>
              <NavLink to={`/clientDetail/${state.nextId}`}>next</NavLink>
            </div>
          )}
        </Spin>
      </Content>
    </Layout>
  )
}

export default {
  view: ClientDetail
}
