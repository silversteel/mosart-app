const initialState = {
	user_id: '',
	email: '',
	username: '',
	profile: {},
	posts: [],
	followers: 0,
	following: 0,
	isOtherLoading: false,
	otherProfile: {
		profile: {},
		posts: []
	},
	isLogin: false,
	isLoading: false,
	isError: false
}

export default userReducer = (state = initialState, action) => {
	const { type, payload } = action
	switch(type) {
		case 'GET_USER_PENDING':
			return {
				...state,
				isLoading: true,
			}
		case 'GET_USER_REJECTED':
			return {
				...state,
				isLoading: false,
				isError: true
			}
		case 'GET_USER_FULFILLED':
			return {
				...state,
				isLoading: false,
				isLogin: true,
				user_id: payload.data.id,
				email: payload.data.email,
				username: payload.data.username,
				profile: payload.data.profile,
				posts: payload.data.posts,
				following: payload.data.following,
				followers: payload.data.followers
			}
		case 'EDIT_PROFILE_PENDING':
			return {
				...state,
				isLoading: true
			}
		case 'EDIT_PROFILE_REJECTED':
			return {
				...state,
				isLoading: false
			}
		case 'EDIT_PROFILE_FULFILLED':
			return {
				...state,
				isLoading: false
			}
		case 'LOGOUT':
			return {
				...state,
				isLogin: false,
				user_id: '',
				email: '',
				username: '',
				profile: {}
			}
		case 'GET_OTHER_USER_PENDING':
			return {
				...state,
				isOtherLoading: true
			}
		case 'GET_OTHER_USER_REJECTED':
			return {
				...state,
				isOtherLoading: false
			}
		case 'GET_OTHER_USER_FULFILLED':
			return {
				...state,
				isOtherLoading: false,
				otherProfile: payload.data
			}
		default:
			return state
	}
}