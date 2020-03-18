import * as React from 'react'
import { AppState } from '../store'
import { userListAction } from '../store/user/actions'
import userReducer from '../store/user/reducers'
import { connect } from 'react-redux'

function Index() {
  React.useEffect(() => {
    window.location.href = '/im'
  })
  return <div></div>
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
  name: 'Index',
  reducers: userReducer,
  view: connect(mapStateToProps, mapDispatchToProps)(Index)
}
