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


export const editPiece = (post_id, title, description, image) => {
	return async (dispatch) => {
		try {
			const res = await axios.post('/upload', image, {
				headers: {
					'Content-Type': `multipart/form-data; boundary=${image._boundary}`
				}
			})
			dispatch({
				action: 'EDIT_PIECE',
				payload: axios.patch('/post/'+post_id, {
					image_uri: res.data.image,
					title: title,
					description: description,
					views: '1'
				})
			})
			alert('Piece updated!')
		} catch(e) {
			alert(e)
		}
	}
}
 
export const removePiece = (post_id) => {
	return {
		type: 'REMOVE_PIECE',
		payload: axios.delete('/post/'+post_id)
	}
}

export const createPiece = (title, description, image) => {
	return async (dispatch) => {
		try {
			const res = await axios.post('/upload', image, {
				headers: {
					'Content-Type': `multipart/form-data; boundary=${image._boundary}`
				}
			})
			dispatch({
				action: 'CREATE_PIECE',
				payload: axios.post('/post', {
					image_uri: res.data.image,
					title: title,
					description: description,
					views: '1'
				})
			})
			alert('Piece created!')
		} catch(e) {
			alert(e)
		}
	}
}