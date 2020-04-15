import * as types from './pendingRequest.actionTypes'

const intialState = {}

export default function reducer(state = intialState, action) {
	switch (action.type) {
		case types.ADD: {
			const newState = {
				...state,
			}

			const { url, method } = action.payload

			newState[`${method}|${url}`] = {
				turnSpinnerOff: false,
			}

			return newState
		}

		// case types.CANCEL: {
		// 	const newState = {
		// 		...state,
		// 	}

		// 	for (const name in newState) {
		// 		if (Object.prototype.hasOwnProperty.call(newState, name)) {
		// 			newState[name] = {
		// 				...newState[name],
		// 				cancelled: true,
		// 			}
		// 		}
		// 	}

		// 	return newState
		// }

		case types.DELETE: {
			const newState = {
				...state,
			}

			const { url, method } = action.payload

			delete newState[`${method}|${url}`]

			return newState
		}

		case types.SET_BUSY_SPINNER: {
			const { turnSpinnerOff } = action.payload
			const newState = {
				...state,
			}

			const { url, method } = action.payload

			newState[`${method}|${url}`] = {
				...newState[`${method}|${url}`],
				turnSpinnerOff,
			}

			return newState
		}

		default: {
			return state
		}
	}
}
