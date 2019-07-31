import React from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import Login from '../view/Login/index'
import ClientList from '../view/Client/ClientList'
import Index from '../view/Index'
import NotFound from '../components/NotFound'

// route config
const routes = [
  {
    path: '/',
    component: Index,
    isAuthenticated: true,
    routes: [
      {
        path: '/clientList',
        component: ClientList,
        isAuthenticated: true
      }
    ]
  },
  {
    path: '/login',
    exact: true,
    component: Login
  },
  {
    path: '/404',
    exact: true,
    component: NotFound
  }
]

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        rest.isAuthenticated || rest.path === '/login' ? (
          <Component {...props}>
            {rest.routes && rest.routes.length > 0 ? (
              <div>
                {rest.routes.map((route, i) => (
                  <PrivateRoute key={i} {...route} />
                ))}
              </div>
            ) : null}
          </Component>
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location }
            }}
          />
        )
      }
    />
  )
}

function AllRoute() {
  return (
    <Router>
      <div>
        {routes.map((route, i) => (
          <PrivateRoute key={i} {...route} />
        ))}
      </div>
    </Router>
  )
}

export default AllRoute
