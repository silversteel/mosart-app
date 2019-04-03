import axios from '../../AppConfig'

export const getUser = ({ id, token }) => {
	axios.defaults.headers.common['Authorization'] = 'Bearer '+token
	return {
			type:'GET_USER',
			payload: axios.get('/user/'+id)
		}
}

export const getOtherUser = ( id ) => {
	return {
			type:'GET_OTHER_USER',
			payload: axios.get('/user/other/'+id)
		}
}


export const editProfile = (user_id, name, bio, location, website, image) => {
	return async (dispatch) => {
		try {
			const res = await axios.post('/upload', image, {
				headers: {
					'Content-Type': `multipart/form-data; boundary=${image._boundary}`
				}
			})
			dispatch({
				action: 'EDIT_PROFILE',
				payload: axios.patch('/profile/'+user_id, {
					image_url: res.data.image,
					name,
					bio, 
					location, 
					website
				})
			})
			alert('Profile updated!')
		} catch(e) {
			alert(e)
		}
	}
}