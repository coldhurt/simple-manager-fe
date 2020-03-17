import React from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import Index from '../view/Admin'
import NotFound from '../components/NotFound'
import LazyLoadMoudle from '../components/LazyLoadModule'
import { ConnectedComponent } from 'react-redux'

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
    exact: true,
    isAuthenticated: true,
    component: (props: Object) => (
      <LazyLoadMoudle {...props} resolve={() => import('../view/IndexPage')} />
    )
  },
  {
    path: '/admin',
    component: Index,
    isAuthenticated: true,
    routes: [
      {
        path: '/admin/client/list',
        component: (props: Object) => (
          <LazyLoadMoudle
            {...props}
            resolve={() => import('../view/Client/ClientList')}
          />
        ),
        isAuthenticated: true
      },
      {
        path: '/admin/client/detail/:id',
        component: (props: Object) => (
          <LazyLoadMoudle
            {...props}
            resolve={() => import('../view/Client/ClientDetail')}
          />
        ),
        isAuthenticated: true
      },
      {
        path: '/admin/adminList',
        isAuthenticated: true,
        component: (props: Object) => (
          <LazyLoadMoudle
            {...props}
            resolve={() => import('../view/Admin/AdminList')}
          />
        )
      },
      {
        path: '/admin/article/list',
        isAuthenticated: true,
        component: (props: Object) => (
          <LazyLoadMoudle
            {...props}
            resolve={() => import('../view/Article/ArticleList')}
          />
        )
      },
      {
        path: '/admin/article/create',
        isAuthenticated: true,
        component: (props: Object) => (
          <LazyLoadMoudle
            {...props}
            resolve={() => import('../view/Article/AddArticle')}
          />
        )
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
    path: '/register',
    exact: true,
    isAuthenticated: true,
    component: (props: Object) => (
      <LazyLoadMoudle {...props} resolve={() => import('../view/Register')} />
    )
  },
  {
    path: '/im',
    exact: true,
    isAuthenticated: true,
    component: (props: Object) => (
      <LazyLoadMoudle {...props} resolve={() => import('../view/IM/Index')} />
    )
  },
  {
    path: '/404',
    exact: true,
    component: NotFound,
    isAuthenticated: true
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
