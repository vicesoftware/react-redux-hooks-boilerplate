import {
	GET_ALL_SCREEN_TIME_REPORTS,
	GET_SCREEN_TIME_REPORTS_BY_ID,
	GET_SCREEN_TIME_REPORTS_BY_USER_ID,
	GET_SCREEN_TIME_REPORTS_CONFIG,
} from './screenTimeReports.actionsTypes'
import { mergeCollections } from '../../infrastructure/reduxHelpers'

const intitialState = {
	allScreenTimeReports: [],
	config: {},
}

export default function reducer(state = intitialState, action) {
	switch (action.type) {
		case GET_ALL_SCREEN_TIME_REPORTS.RECEIVED:
			return {
				...state,
				allScreenTimeReports: action.payload,
			}
		case GET_SCREEN_TIME_REPORTS_BY_ID.RECEIVED:
			return {
				...state,
				allScreenTimeReports: mergeCollections(state.allScreenTimeReports, [
					action.payload,
				]),
			}
		case GET_SCREEN_TIME_REPORTS_BY_USER_ID.RECEIVED:
			return {
				...state,
				allScreenTimeReports: mergeCollections(
					state.allScreenTimeReports,
					action.payload
				),
			}
		case GET_SCREEN_TIME_REPORTS_CONFIG.RECEIVED:
			return {
				...state,
				config: action.payload,
			}
		default: {
			return state
		}
	}
}
