import { createSlice } from '@reduxjs/toolkit'
import * as asyncActions from './demo.asyncActions'

const initialState = {
	allDemo: [],
	filter: '',
}

const slice = createSlice({
	name: 'demo',
	initialState,
	reducers: {
		// synchronous actions
		updateFilter(state, action) {
			state.filter = action.payload
		},
	},
	extraReducers: {
		// asynchronous actions
		[asyncActions.fetchAllDemo.fulfilled]: (state, action) => {
			state.allDemo = action.payload
		},
	},
})

export default slice

export const { name, actions, reducer } = slice
