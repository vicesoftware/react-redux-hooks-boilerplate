import { createSlice } from '@reduxjs/toolkit'
import buildCacheKey from '../buildCacheKey'

const initialState = {}

const slice = createSlice({
	name: 'httpCache',
	initialState,
	reducers: {
		addRequestToCache(state, action) {
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

export default slice

export const { name, actions, reducer } = slice
