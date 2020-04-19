import { createSlice } from '@reduxjs/toolkit'
import assign from 'lodash/assign'
import * as actions from './userContext.actions'

const initialState = {}

export default createSlice({
	name: 'userContext',
	initialState,
	extraReducers: {
		[actions.login.fulfilled]: (state, action) => {
			assign(state.allUserContext, action.payload)
		},
	},
})
