import axios from '../../AppConfig'

export const fetchPosts = (search) => {
	return {
		type: 'GET_POSTS',
		payload: axios.get('/posts')
	}
}

export const getPost = (post_id, user_id) => {
	return {
		type: 'GET_POST',
		payload: axios.get('/post/'+post_id+'?user_id='+user_id)
	}
}

export const addFavorite = (post_id, user_id) => {
	return {
		type: 'ADD_FAVORITE',
		payload: axios.post('/favorite/'+post_id)
	}
}

export const removeFavorite = (post_id, user_id) => {
	return {
		type: 'REMOVE_FAVORITE',
		payload: axios.delete('/unfavorite/'+post_id)
	}
}