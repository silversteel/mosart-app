import axios from '../../AppConfig'

export const fetchPosts = (search) => {
	return {
		type: 'GET_POSTS',
		payload: axios.get('/posts')
	}
}

export const searchPieces = ({ title, tags }) => {
	let uri = '?'
	if(title) {
		uri = uri + `&title=${title}`
	}

	if(tags && tags.length > 0) {
		uri = uri + `&tags=${JSON.stringify(tags.map((item) => item.id))}`
	}

	const queryString = uri.replace(/^\?(\&)/gi, (match, p1, string) => {
		return '?'
	})

	return {
		type: 'SEARCH_PIECES',
		payload: axios.get('/posts'+queryString)
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


export const editPiece = (post_id, title, description, tags, image) => {
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
					image_url: res.data.image,
					title: title,
					description: description,
					tags: JSON.stringify(tags),
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

export const createPiece = (title, description, tags, image) => {
	console.warn(JSON.stringify(tags))
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
					image_url: res.data.image,
					title: title,
					description: description,
					tags: JSON.stringify(tags),
					views: '1'
				})
			})
			alert('Piece created!')
		} catch(e) {
			alert(e)
		}
	}
}

export const addComment = (content, post_id) => {
	return {
		type: 'ADD_COMMENT',
		payload: axios.post('/comment', { post_id, content })
	}
}