const initialState = {
	data: [],
	isLoading: false,
	isError: false
}

export default tagsReducer = (state = initialState, action) => {
	switch(action.type){
		case 'GET_TAGS_PENDING':
			return {
				...state,
				isLoading: true
			}
		case 'GET_TAGS_REJECTED':
			return {
				...state,
				isLoading: false,
				isError: true
			}
		case 'GET_TAGS_FULFILLED':
			return {
				...state,
				isLoading: false,
				data: action.payload.data
			}
		default:
			return state
	}
}