import { combineReducers } from 'redux'

import posts from './posts'
import user from './user'
import auth from './auth'

export default combineReducers({
	posts,
	user,
	auth
})