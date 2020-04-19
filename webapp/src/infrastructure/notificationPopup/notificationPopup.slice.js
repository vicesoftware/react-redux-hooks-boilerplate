import { createSlice } from '@reduxjs/toolkit'

const initialState = {}

export default createSlice({
	name: 'notificationPopup',
	initialState,
	reducers: {
		notifyError(state, action) {
			state.errorMessage = action.payload
		},
		notifySuccess(state, action) {
			state.successMessage = action.payload
		},
		resetError(state) {
			state.errorMessage = undefined
			state.successMessage = undefined
		},
		closePopup(state) {
			state.errorMessage = undefined
			state.successMessage = undefined
		},
	},
})
