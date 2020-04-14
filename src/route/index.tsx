import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ConnectedComponent } from 'react-redux'
import AdminPage from '../view/Admin'
import { NotFound, LazyLoadModule } from '../components'

interface IRouteItem {
  path: string | string[]
  component:
    | React.ComponentClass<any>
    | React.FC<any>
    | ConnectedComponent<any, any>
  exact?: boolean
  routes?: IRouteItem[]
}

const routes: IRouteItem[] = [
  {
    path: '/',
    exact: true,
    component: (props: Object) => (
      <LazyLoadModule {...props} resolve={() => import('../view/IndexPage')} />
    ),
  },
  {
    path: '/admin',
    component: AdminPage,
    exact: true,
    // isAuthenticated: true,
    // routes: [
    //   {
    //     path: '/admin/client/list',
    //     component: (props: Object) => (
    //       <LazyLoadModule
    //         {...props}
    //         resolve={() => import('../view/Client/ClientList')}
    //       />
    //     ),
    //     isAuthenticated: true
    //   },
    //   {
    //     path: '/admin/client/detail/:id',
    //     component: (props: Object) => (
    //       <LazyLoadModule
    //         {...props}
    //         resolve={() => import('../view/Client/ClientDetail')}
    //       />
    //     ),
    //     isAuthenticated: true
    //   },
    //   {
    //     path: '/admin/adminList',
    //     isAuthenticated: true,
    //     component: (props: Object) => (
    //       <LazyLoadModule
    //         {...props}
    //         resolve={() => import('../view/Admin/AdminList')}
    //       />
    //     )
    //   },
    //   {
    //     path: '/admin/article/list',
    //     isAuthenticated: true,
    //     component: (props: Object) => (
    //       <LazyLoadModule
    //         {...props}
    //         resolve={() => import('../view/Article/ArticleList')}
    //       />
    //     )
    //   },
    //   {
    //     path: '/admin/article/create',
    //     isAuthenticated: true,
    //     component: (props: Object) => (
    //       <LazyLoadModule
    //         {...props}
    //         resolve={() => import('../view/Article/AddArticle')}
    //       />
    //     )
    //   }
    // ]
  },
  {
    path: '/login',
    exact: true,
    component: (props: Object) => (
      <LazyLoadModule {...props} resolve={() => import('../view/Login')} />
    ),
  },
  {
    path: '/register',
    exact: true,
    component: (props: Object) => (
      <LazyLoadModule {...props} resolve={() => import('../view/Register')} />
    ),
  },
  {
    path: ['/NewIM/chat/:id'],
    exact: true,
    component: (props: Object) => (
      <LazyLoadModule {...props} resolve={() => import('../view/NewIM/Chat')} />
    ),
  },
  {
    path: ['/NewIM/:tab', '/NewIM'],
    exact: true,
    component: (props: Object) => (
      <LazyLoadModule {...props} resolve={() => import('../view/NewIM')} />
    ),
  },
  {
    path: ['/NewIM/friends/add'],
    exact: true,
    component: (props: Object) => (
      <LazyLoadModule
        {...props}
        resolve={() => import('../view/NewIM/Friends/AddFriend')}
      />
    ),
  },
  {
    path: ['/NewIM/user/info'],
    exact: true,
    component: (props: Object) => (
      <LazyLoadModule
        {...props}
        resolve={() => import('../view/NewIM/User/UserInfo')}
      />
    ),
  },
  {
    path: ['/NewIM/user/info/nickname'],
    exact: true,
    component: (props: Object) => (
      <LazyLoadModule
        {...props}
        resolve={() => import('../view/NewIM/User/ChangeNickName')}
      />
    ),
  },

  {
    path: '*',
    exact: true,
    component: NotFound,
  },
]

const PrivateRoute: React.FC<IRouteItem> = ({
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) => (
        <Component {...props}>
          {rest.routes && rest.routes.length > 0 ? (
            <div>
              {rest.routes.map((route: IRouteItem, i: number) => (
                <PrivateRoute key={i} {...route} />
              ))}
            </div>
          ) : null}
        </Component>
      )}
    />
  )
}

function AllRoute() {
  return (
    <Router>
      <div>
        <Switch>
          {routes.map((route, i) => (
            <PrivateRoute key={i} {...route} />
          ))}
        </Switch>
        {/* <Route path='*'>
          <NotFound />
        </Route> */}
      </div>
    </Router>
  )
}

export default AllRoute
