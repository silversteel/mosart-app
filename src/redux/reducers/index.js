import { combineReducers } from 'redux'

import posts from './posts'
import user from './user'
import auth from './auth'
import tags from './tags'

export default combineReducers({
	posts,
	user,
	auth,
	tags
})