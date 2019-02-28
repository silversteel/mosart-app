import axios from '../../AppConfig'

export const getUser = ({ id, token }) => {
	axios.defaults.headers.common['Authorization'] = 'Bearer '+token
	return {
			type:'GET_USER',
			payload: axios.get('/user/'+id)
		}
}