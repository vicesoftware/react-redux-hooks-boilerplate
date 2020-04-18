import {
	NOTIFY_SUCCESS,
	RESET,
	CLOSE,
	NOTIFY_ERROR,
} from './notificationPopup.actionTypes'

export default function reducer(state = {}, action) {
	switch (action.type) {
		case CLOSE:
		case RESET: {
			return {}
		}
		case NOTIFY_ERROR: {
			return action.payload
		}
		case NOTIFY_SUCCESS: {
			return action.payload
		}
		default: {
			return state
		}
	}
}
