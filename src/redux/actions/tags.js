import axios from '../../AppConfig'

export const getTags = () => {
	return {
		type: 'GET_TAGS',
		payload: axios.get('/tags')
	}
}