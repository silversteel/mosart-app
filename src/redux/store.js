import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise-middleware'
import reducers from './reducers'

const logger = createLogger({})

const store = createStore(
	reducers,
	applyMiddleware(
		thunk,
		logger,
		promiseMiddleware
	)
)

export default store