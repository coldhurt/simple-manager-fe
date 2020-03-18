import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { ConnectedComponent } from 'react-redux'
import AdminPage from '../view/Admin'
import { NotFound, LazyLoadModule } from '../components'

interface IRouteItem {
  path: string
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
    )
  },
  {
    path: '/admin',
    component: AdminPage,
    exact: true
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
    )
  },
  {
    path: '/register',
    exact: true,
    component: (props: Object) => (
      <LazyLoadModule {...props} resolve={() => import('../view/Register')} />
    )
  },
  {
    path: '/im',
    exact: true,
    component: (props: Object) => (
      <LazyLoadModule {...props} resolve={() => import('../view/IM/Index')} />
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
      render={props => (
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
        {routes.map((route, i) => (
          <PrivateRoute key={i} {...route} />
        ))}
      </div>
    </Router>
  )
}

export default AllRoute
