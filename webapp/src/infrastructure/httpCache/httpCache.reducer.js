import * as types from './httpCache.actionTypes'
import buildCacheKey from '../buildCacheKey'

const intialState = {}

export default function reducer(state = intialState, action) {
	switch (action.type) {
		case types.ADD: {
			const newState = {
				...state,
			}

			newState[buildCacheKey(action.payload)] = {
				...action.payload.config,
				createdAt: action.payload.createdAt,
			}

			return newState
		}

		case types.RESET: {
			return intialState
		}

		case types.DELETE: {
			const newState = {
				...state,
			}

			if (
				action.payload.url &&
				action.payload.httpMethod &&
				!action.payload.patterns
			) {
				delete newState[buildCacheKey(action.payload)]
			} else if (
				!(action.payload.url && action.payload.httpMethod) &&
				action.payload.patterns
			) {
				for (const cacheKey in newState) {
					if (
						Object.prototype.hasOwnProperty.call(newState, cacheKey) &&
						action.payload.patterns.some((p) => p.test(cacheKey))
					) {
						delete newState[cacheKey]
					}
				}
			}

			return newState
		}

		default: {
			return state
		}
	}
}
