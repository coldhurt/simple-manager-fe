interface MultiLangText {
  en: string
  zh: string
}

const i18nData: Record<string, MultiLangText> = {
  Login: {
    en: 'Login',
    zh: '登录',
  },
  Register: {
    en: 'Register',
    zh: '注册',
  },
  Username: {
    en: 'Username',
    zh: '用户名',
  },
  Password: {
    en: 'Password',
    zh: '密码',
  },
  'Confirm Password': {
    en: 'Confirm Password',
    zh: '再次确认密码',
  },
  Message: {
    en: 'Message',
    zh: '消息',
  },
  Friends: {
    en: 'Friends',
    zh: '通讯录',
  },
  MyInfo: {
    en: 'MyInfo',
    zh: '我的',
  },
  Search: {
    en: 'Search',
    zh: '搜索',
  },
  Send: {
    en: 'Send',
    zh: '发送',
  },
  Logout: {
    en: 'Logout',
    zh: '退出',
  },
  Setting: {
    en: 'Setting',
    zh: '设置',
  },
}

const getText = (key: string) => {
  const data = i18nData[key]
  return data ? data['zh'] : key
}

export default getText
