import React from 'react'
import { Layout } from 'antd'
import SiderBar from '../../components/Sider'
import MyHeader from '../../components/MyHeader'

const { Header, Sider, Content, Footer } = Layout

interface IndexProps {
  Component: React.Component
}

const Index: React.FC<IndexProps> = props => {
  React.useEffect(() => {})
  return (
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
      <Footer>Footer</Footer>
    </Layout>
  )
}

export default Index
