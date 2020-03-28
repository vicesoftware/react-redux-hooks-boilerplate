import {
	GET_ALL_ASYNC,
	GET_SCREEN_TIME_REPORTS_ASYNC,
	GET_USER_ASYNC,
} from './user.actionsTypes'
import { mergeCollections } from '../../infrastructure/reduxHelpers'

const intitialState = {
	allUsers: [],
	screenTimeReports: [],
}

export default function reducer(state = intitialState, action) {
	switch (action.type) {
		case GET_ALL_ASYNC.RECEIVED:
			return {
				...state,
				allUsers: action.payload,
			}
		case GET_USER_ASYNC.RECEIVED:
			return {
				...state,
				allUsers: mergeCollections(state.allUsers, action.payload),
			}
		case GET_SCREEN_TIME_REPORTS_ASYNC: {
			return {
				...state,
				screenTimeReports: mergeCollections(
					state.screenTimeReports,
					action.payload
				),
			}
		}
		default: {
			return state
		}
	}
}
