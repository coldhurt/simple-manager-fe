import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas'
import { logger } from 'redux-logger'
import {
  Store,
  Reducer,
  createStore,
  applyMiddleware,
  ReducersMapObject,
  combineReducers,
  Middleware,
} from 'redux'
import { reducerMaps } from './modules'

interface IAddDynamicProps {
  name: string
  reducers: Function | ReducersMapObject
}

export interface IMyStore extends Store {
  asyncReducers: ReducersMapObject
  addDynamicModule(props: IAddDynamicProps): void
  removeDynamicModule(name: string): void
}

const createMyStore = (reducerMap: ReducersMapObject) => {
  const injectAsyncReducers = (
    store: IMyStore,
    name: string,
    reducers: Function | ReducersMapObject
  ) => {
    let asyncReducers = {}

    if (typeof reducers === 'function') {
      asyncReducers = reducers
    }

    if (typeof reducers === 'object') {
      asyncReducers = combineReducers(reducers)
    }
    store.asyncReducers[name] = asyncReducers as Reducer

    store.replaceReducer(
      combineReducers({
        ...reducerMap,
        ...store.asyncReducers,
      })
    )
  }
  const sagaMiddleware = createSagaMiddleware()

  const middwares: Middleware[] = [sagaMiddleware]
  if (process.env.NODE_ENV === 'development') middwares.push(logger)
  const store: IMyStore = createStore(
    combineReducers(reducerMap),
    applyMiddleware(...middwares)
  ) as IMyStore
  sagaMiddleware.run(rootSaga)
  store.asyncReducers = {}
  // add normal reducers
  store.addDynamicModule = ({ name, reducers }) => {
    console.info(`Registering module reducers for ${name}`)
    injectAsyncReducers(store, name, reducers)
  }
  // remove reducer
  store.removeDynamicModule = (name: string) => {
    console.info(`Unregistering module reducers for ${name}`)
    const noopReducer = (state = {}) => state
    injectAsyncReducers(store, name, noopReducer)
  }

  return store
}

export default createMyStore(reducerMaps)
