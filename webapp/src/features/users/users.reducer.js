import { GET_ALL_USERS, GET_USERS_BY_ID } from './users.actionsTypes'
import { mergeCollections } from '../../infrastructure/reduxHelpers'

const intitialState = {
	allUsers: [],
}

export default function reducer(state = intitialState, action) {
	switch (action.type) {
		case GET_ALL_USERS.RECEIVED:
			return {
				...state,
				allUsers: action.payload,
			}
		case GET_USERS_BY_ID.RECEIVED:
			return {
				...state,
				allUsers: mergeCollections(state.allUsers, action.payload),
			}
		default: {
			return state
		}
	}
}
