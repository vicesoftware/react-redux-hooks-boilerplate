import {
	// CANCEL,
	ADD,
	DELETE,
	SET_BUSY_SPINNER,
} from './pendingRequest.actionTypes'

// export const cancelPendingRequest = () => ({
// 	type: CANCEL,
// })

export const addPendingRequest = (url, method) => ({
	type: ADD,
	payload: {
		url,
		method,
	},
})

export const setBusySpinner = (url, method, turnSpinnerOff) => ({
	type: SET_BUSY_SPINNER,
	payload: {
		url,
		method,
		turnSpinnerOff,
	},
})
export const deletePendingRequest = (url, method) => ({
	type: DELETE,
	payload: {
		url,
		method,
	},
})
