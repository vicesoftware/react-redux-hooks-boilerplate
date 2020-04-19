import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	useCaching: false,
	noBusySpinner: false,
}

export default createSlice({
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
