import { createSlice } from '@reduxjs/toolkit'
import http from '../../infrastructure/http'
import * as actions from './user.actions'

const initialState = {
	allUsers: [],
}

export default createSlice({
	name: 'users',
	initialState,
	extraReducers: {
		[actions.fetchAllUsers.fulfilled]: (state, action) => {
			state.allUsers = action.payload
		},
	},
})
