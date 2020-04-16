import {
	// CANCEL,
	ADD,
	DELETE,
	SET_BUSY_SPINNER,
} from './pendingRequest.actionTypes'

export const addPendingRequest = ({ url, httpMethod }) => ({
	type: ADD,
	payload: {
		url,
		httpMethod,
	},
})

export const setBusySpinner = ({ url, httpMethod }, turnSpinnerOff) => ({
	type: SET_BUSY_SPINNER,
	payload: {
		url,
		httpMethod,
		turnSpinnerOff,
	},
})
export const deletePendingRequest = ({ url, httpMethod }) => ({
	type: DELETE,
	payload: {
		url,
		httpMethod,
	},
})
