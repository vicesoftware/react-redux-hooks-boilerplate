import { createSlice } from '@reduxjs/toolkit'
import * as asyncActions from './{{camelCase name}}.asyncActions'

const initialState = {
	all{{pascalCase name}}: [],
	filter: '',
}

const slice = createSlice({
	name: '{{camelCase name}}',
    initialState,
    reducers: { // synchronous actions
		updateFilter(state, action) {
			state.filter = action.payload
		},
	},
	extraReducers: { // asynchronous actions
		[asyncActions.fetchAll{{pascalCase name}}.fulfilled]: (state, action) => {
			state.all{{pascalCase name}} = action.payload
		},
	},
})

export default slice

export const { name, actions, reducer } = slice
