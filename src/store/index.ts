import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { combineReducers } from 'redux'
import rootSaga from './sagas'
import clientsReducer from './client/reducers'
import userReducer from './user/reducers'

const rootReducer = combineReducers({
  clients: clientsReducer,
  user: userReducer
})

export type AppState = ReturnType<typeof rootReducer>

const sagaMiddleware = createSagaMiddleware()
const store = createStore(rootReducer, compose(applyMiddleware(sagaMiddleware)))
sagaMiddleware.run(rootSaga)

export default store
