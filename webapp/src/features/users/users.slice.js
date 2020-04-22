import { createSlice } from '@reduxjs/toolkit'
import * as asyncActions from './users.asyncActions'

const initialState = {
	allUsers: [],
}

export default createSlice({
	name: 'users',
	initialState,
	extraReducers: {
		[asyncActions.fetchAllUsers.fulfilled]: (state, action) => {
			state.allUsers = action.payload
		},
	},
})
