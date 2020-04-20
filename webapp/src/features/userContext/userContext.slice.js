import { createSlice } from '@reduxjs/toolkit'
import * as actions from './userContext.actions'

const initialState = {}

export default createSlice({
	name: 'userContext',
	initialState,
	extraReducers: {
		[actions.signIn.fulfilled]: (_, action) => action.payload,
	},
})
