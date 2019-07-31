import React from 'react'
import { Menu, Icon, Switch } from 'antd'
import { NavLink, Link } from 'react-router-dom'

const { SubMenu } = Menu

interface ISiderDataItem {
  path: string
  title: string
  icon: string
  subMenu?: ISiderDataItem[]
}

const siderData: ISiderDataItem[] = [
  {
    path: '/clientList',
    title: '客户列表',
    icon: '',
    subMenu: [
      {
        path: '/clientList',
        title: '客户列表',
        icon: ''
      }
    ]
  }
]

const SiderItem = (props: ISiderDataItem) => {
  return props.subMenu && props.subMenu.length > 0 ? (
    <SubMenu
      key={props.title}
      title={
        <span>
          <Icon type='appstore' />
          <span>{props.title}</span>
        </span>
      }
    >
      {props.subMenu.map(SiderItem)}
    </SubMenu>
  ) : (
    <Menu.Item key={props.title}>
      <NavLink to={props.path}>{props.title}</NavLink>
    </Menu.Item>
  )
}

export default class Sider extends React.Component {
  state = {
    mode: 'vertical' as 'vertical',
    theme: 'dark' as 'dark'
  }

  changeMode = (value: boolean) => {
    this.setState({
      mode: value ? 'vertical' : 'inline'
    })
  }

  changeTheme = (value: boolean) => {
    this.setState({
      theme: value ? 'dark' : 'light'
    })
  }

  render() {
    return (
      <div style={{ color: '#fff' }}>
        {/* <Switch onChange={this.changeMode} /> Change Mode
        <span className='ant-divider' style={{ margin: '0 1em' }} />
        <Switch onChange={this.changeTheme} /> Change Theme */}
        <Menu
          style={{ width: '100%' }}
          // defaultSelectedKeys={['1']}
          // defaultOpenKeys={['0']}
          mode={this.state.mode}
          theme={this.state.theme}
        >
          {siderData.map(SiderItem)}
        </Menu>
      </div>
    )
  }
}
