import axios from '../../AppConfig'
import { AsyncStorage } from 'react-native'
import { getUser } from './user'

export const login = (user) => {
	return async (dispatch) => {
		const res = await dispatch({
			type: 'LOGIN',
			payload: axios.post('/login', user)
		})
		dispatch(saveToken(res.value.data))
		dispatch(getUser({id: res.value.data.id, token: res.value.data.access.token}))
	}
}

export const logout = () => {
	axios.defaults.headers.common['Authorization'] = ''
	return {
		type: 'LOGOUT'
	}
}

export const register = (user) => {
	return {
		type: 'REGISTER',
		payload: axios.post('/register', user)
	}
}

export const saveToken = ({id, access}) => {
	return async (dispatch) => {
		try {
			await AsyncStorage.multiSet([
				['AUTH_TOKEN', String(access.token)], 
				['UID', String(id)]
			])
		} catch(e) {
			console.log(e.message)
		}
	}
}

export const getToken = () => {
	return async (dispatch) => {
		try {
			const data = await AsyncStorage.multiGet(['AUTH_TOKEN', 'UID'])
			dispatch({
				type: 'GET_TOKEN',
				payload: {
					token: data[0][1],
					id: data[1][1]
				}
			})
		} catch(e) {
			console.log(e.message)
		}
	}
}

export const removeToken = () => {
	return async (dispatch) => {
		try {
			await AsyncStorage.multiRemove(['AUTH_TOKEN', 'UID'])
			dispatch({
				type: 'REMOVE_TOKEN'
			})
			dispatch(logout())
			dispatch({
				type: 'REMOVE_POST_DATA'
			})
		} catch(e) {
			console.log(e)
		}
	}
}