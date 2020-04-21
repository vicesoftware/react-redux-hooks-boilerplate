import { createSlice } from '@reduxjs/toolkit'

const initialState = {}

const slice = createSlice({
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

export default slice

export const { name, actions, reducer } = slice
