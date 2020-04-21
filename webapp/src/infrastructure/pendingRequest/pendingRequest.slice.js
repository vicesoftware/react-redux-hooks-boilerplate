import { createSlice } from '@reduxjs/toolkit'
import buildCacheKey from '../buildCacheKey'

const initialState = {}

const slice = createSlice({
	name: 'pendingReqeust',
	initialState,
	reducers: {
		addPendingRequest(state, action) {
			state[buildCacheKey(action.payload)] = {
				turnSpinnerOff: false,
			}
		},
		deletePendingRequest(state, action) {
			delete state[buildCacheKey(action.payload)]
		},
		setBusySpinner(state, action) {
			const { turnSpinnerOff } = action.payload

			state[buildCacheKey(action.payload)].turnSpinnerOff = turnSpinnerOff
		},
	},
})

export default slice

export const { name, actions, reducer } = slice
