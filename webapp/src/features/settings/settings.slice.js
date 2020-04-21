import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	useCaching: false,
	noBusySpinner: false,
}

const slice = createSlice({
	name: 'settings',
	initialState,
	reducers: {
		setUseCaching(state, action) {
			state.useCaching = action.payload
		},
		setNoBusySpinner(state, action) {
			state.noBusySpinner = action.payload
		},
	},
})

export default slice

export const { name, actions, reducer } = slice
