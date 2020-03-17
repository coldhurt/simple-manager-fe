import React from 'react'
import { Layout } from 'antd'
import SiderBar from '../../components/Sider'
import MyHeader from '../../components/MyHeader'
import { Post } from '../../utils'

const { Header, Sider, Content, Footer } = Layout

interface IndexProps {
  Component: React.Component
}

const Index: React.FC<IndexProps> = props => {
  const [show, setShow] = React.useState(false)
  React.useEffect(() => {
    if (window.location.pathname !== '/login')
      Post('/api/admin/detail', {}).then(json => {
        if (json.success === false) {
          // window.location.href = '/login'
        } else {
          setShow(true)
        }
      })
  })
  return show ? (
    <Layout>
      <Header>
        <MyHeader />
      </Header>
      <Layout>
        <Sider>
          <SiderBar />
        </Sider>
        <Content>{props.children}</Content>
      </Layout>
      {/* <Footer>Footer</Footer> */}
    </Layout>
  ) : null
}

export default Index
