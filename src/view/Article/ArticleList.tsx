import React, { Component } from 'react'
import { Table, Layout, Button, Col, Row } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import { IArticle, IArticleState } from '../../store/article/types'
import { fetchArticles } from '../../store/article/actions'
import { connect } from 'react-redux'
import { AppState } from '../../store'
import articlesReducer from '../../store/article/reducers'
import { NavLink } from 'react-router-dom'

const { Header, Content } = Layout

interface IArticleListProps {
  fetchArticles: Function
  articles: IArticleState
}

class ArticleList extends Component<IArticleListProps> {
  componentDidMount() {
    this.props.fetchArticles()
  }
  render() {
    const { articles = [] } = this.props.articles
    const data: IArticle[] = articles.map(item => {
      return {
        ...item,
        key: item._id
      }
    })
    const columns: ColumnProps<IArticle>[] = [
      {
        title: '标题',
        dataIndex: 'title'
      },
      {
        title: '创建时间',
        dataIndex: 'createdAt'
      }
    ]
    return (
      <Layout>
        <Header style={{ color: '#fff', fontSize: 30, fontWeight: 'bold' }}>
          <Row>
            <Col span={22}>文章列表</Col>
            <Col span={2}>
              <NavLink to='/admin/article/create'>
                <Button type='primary' icon='plus'>
                  添加文章
                </Button>
              </NavLink>
            </Col>
          </Row>
        </Header>
        <Content>
          <Table columns={columns} dataSource={data} />
        </Content>
      </Layout>
    )
  }
}

const mapDispatchToProps = {
  fetchArticles
}

const mapStateToProps = (state: AppState) => {
  return {
    articles: state.articles
  }
}

export default {
  name: 'articleList',
  reducer: articlesReducer,
  view: connect(mapStateToProps, mapDispatchToProps)(ArticleList)
}
