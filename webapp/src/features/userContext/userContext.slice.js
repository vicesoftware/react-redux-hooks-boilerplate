import { createSlice } from '@reduxjs/toolkit'
import * as asyncActions from './userContext.asynActions'

const initialState = {}

export default createSlice({
	name: 'userContext',
	initialState,
	reducers: {
		logout(state, action) {
			return {}
		},
	},
	extraReducers: {
		[asyncActions.signIn.fulfilled]: (_, action) => action.payload,
	},
})
