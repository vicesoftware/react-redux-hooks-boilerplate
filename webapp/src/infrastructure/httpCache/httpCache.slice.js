import { createSlice } from '@reduxjs/toolkit'
import buildCacheKey from '../buildCacheKey'

const initialState = {}

export default createSlice({
	name: 'httpCache',
	initialState,
	reducers: {
		addRequestToCache(state, action) {
			// const newState = {
			// 	...state,
			// }

			// newState[buildCacheKey(action.payload)] = {
			// 	...action.payload.config,
			// 	createdAt: action.payload.createdAt,
			// }

			// return newState

			state[buildCacheKey(action.payload)] = {
				...action.payload.config,
				createdAt: action.payload.createdAt,
			}
		},
		deleteRequestFromCache(state, action) {
			if (
				action.payload.url &&
				action.payload.httpMethod &&
				!action.payload.patterns
			) {
				delete state[buildCacheKey(action.payload)]
			} else if (
				!(action.payload.url && action.payload.httpMethod) &&
				action.payload.patterns
			) {
				for (const cacheKey in state) {
					if (
						Object.prototype.hasOwnProperty.call(state, cacheKey) &&
						action.payload.patterns.some((p) => p.test(cacheKey))
					) {
						delete state[cacheKey]
					}
				}
			}
		},
	},
})
