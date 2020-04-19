import * as types from './pendingRequest.actionTypes'
import buildCacheKey from '../buildCacheKey'

const intialState = {}

export default function reducer(state = intialState, action) {
	switch (action.type) {
		case types.ADD: {
			const newState = {
				...state,
			}

			newState[buildCacheKey(action.payload)] = {
				turnSpinnerOff: false,
			}

			return newState
		}

		case types.DELETE: {
			const newState = {
				...state,
			}

			delete newState[buildCacheKey(action.payload)]

			return newState
		}

		case types.SET_BUSY_SPINNER: {
			const { turnSpinnerOff } = action.payload
			const newState = {
				...state,
			}

			newState[buildCacheKey(action.payload)] = {
				...newState[buildCacheKey(action.payload)],
				turnSpinnerOff,
			}

			return newState
		}

		default: {
			return state
		}
	}
}
