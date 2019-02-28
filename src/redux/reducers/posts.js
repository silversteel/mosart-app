const initialState = {
	data: [],
	post: {
		author: {},
		tags: [],
		comments: []
	},
	isLoading: false,
	isError: false
}

export default postsReducer = (state = initialState, action) => {
	const { type, payload } = action
	switch(type) {
		case 'GET_POSTS_PENDING':
			return {
				...state,
				isLoading: true
			}
		case 'GET_POSTS_REJECTED':
			return {
				...state,
				isLoading: false,
				isError: true
			}
		case 'GET_POSTS_FULFILLED':
			return {
				...state,
				isLoading: false,
				data: payload.data
			}
		case 'GET_POST_PENDING':
			return {
				...state,
				isLoading: true
			}
		case 'GET_POST_REJECTED':
			return {
				...state,
				isLoading: false,
				isError: true
			}
		case 'GET_POST_FULFILLED':
			return {
				...state,
				isLoading: false,
				post: payload.data
			}
		case 'REMOVE_POST_DATA':
			return {
				...state,
				post: {
					author: {},
					tags: [],
					comments: []
				}
			}
		case 'ADD_FAVORITE_PENDING':
			return {
				...state,
				isLoading: false
			}
		case 'ADD_FAVORITE_REJECTED':
			return {
				...state,
				isLoading: false
			}
		case 'ADD_FAVORITE_FULFILLED':
			return {
				...state,
				isLoading: false
			}
		case 'REMOVE_FAVORITE_PENDING':
			return {
				...state,
				isLoading: false
			}
		case 'REMOVE_FAVORITE_REJECTED':
			return {
				...state,
				isLoading: false
			}
		case 'REMOVE_FAVORITE_FULFILLED':
			return {
				...state,
				isLoading: false
			}
		case 'CREATE_PIECE_PENDING':
			return {
				...state,
				isLoading: true
			}
		case 'CREATE_PIECE_REJECTED':
			return {
				...state,
				isLoading: false
			}
		case 'CREATE_PIECE_FULFILLED':
			return {
				...state,
				isLoading: false
			}
		default:
			return state
	}
}