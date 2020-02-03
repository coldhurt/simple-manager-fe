import React from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
// import Login from '../view/Login/index'
// import ClientList from '../view/Client/ClientList'
import Index from '../view/Index'
import NotFound from '../components/NotFound'
import LazyLoadMoudle from '../components/LazyLoadModule'
import { ConnectedComponent } from 'react-redux'
import ClientDetail from '../view/Client/ClientDetail'

// route config

interface IRouteItem {
  path: string
  component:
    | React.ComponentClass<any>
    | React.FC<any>
    | ConnectedComponent<any, any>
  exact?: boolean
  routes?: IRouteItem[]
  isAuthenticated?: boolean
}

const routes: IRouteItem[] = [
  {
    path: '/',
    component: Index,
    isAuthenticated: true,
    routes: [
      {
        path: '/clientList',
        component: (props: Object) => (
          <LazyLoadMoudle
            {...props}
            resolve={() => import('../view/Client/ClientList')}
          />
        ),
        isAuthenticated: true
      },
      {
        path: '/clientDetail/:id',
        component: (props: Object) => (
          <LazyLoadMoudle
            {...props}
            resolve={() => import('../view/Client/ClientDetail')}
          />
        ),
        isAuthenticated: true
      }
    ]
  },
  {
    path: '/login',
    exact: true,
    component: (props: Object) => (
      <LazyLoadMoudle {...props} resolve={() => import('../view/Login')} />
    )
  },
  {
    path: '/404',
    exact: true,
    component: NotFound
  }
]

const PrivateRoute: React.FC<IRouteItem> = ({
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props =>
        rest.isAuthenticated || rest.path === '/login' ? (
          <Component {...props}>
            {rest.routes && rest.routes.length > 0 ? (
              <div>
                {rest.routes.map((route: IRouteItem, i: number) => (
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
