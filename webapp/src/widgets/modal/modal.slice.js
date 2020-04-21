import { createSlice } from '@reduxjs/toolkit'

const initialState = { show: false }

const slice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		showModal(state, action) {
			state.show = true
		},
		hideModal(state, action) {
			state.show = false
		},
	},
})

export default slice

export const { name, actions, reducer } = slice
