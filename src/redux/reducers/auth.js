const initialState = {
	token: '',
	id: '',
	isLoading: false,
	isError: false
}

export default authReducer = (state = initialState, action) => {
	const { type, payload } = action
	switch(type) {
		case 'LOGIN_PENDING':
			return {
				...state,
				isLoading: true
			}
		case 'LOGIN_REJECTED':
			return {
				...state,
				isLoading: false,
				isError: true
			}
		case 'LOGIN_FULFILLED':
			return {
				...state,
				isLoading: false,
				token: payload.data.access.token,
				id: payload.data.id
			}
		case 'REGISTER_PENDING':
			return {
				...state,
				isLoading: true
			}
		case 'REGISTER_REJECTED':
			return {
				...state,
				isLoading: false,
				isError: true
			}
		case 'REGISTER_FULFILLED':
			return {
				...state,
				isLoading: false
			}
		case 'GET_TOKEN':
			return {
				...state,
				id: payload.id,
				token: payload.token
			}
		default:
			return state
	}
}