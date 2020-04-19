import { createSlice } from '@reduxjs/toolkit'
import * as actions from './{{camelCase name}}.actions'

const initialState = {
	all{{pascalCase name}}: [],
	filter: '',
}

export default createSlice({
	name: '{{camelCase name}}',
    initialState,
    reducers: { // synchronous actions
		updateFilter(state, action) {
			state.filter = action.payload
		},
	},
	extraReducers: { // asynchronous actions
		[actions.fetchAll{{pascalCase name}}.fulfilled]: (state, action) => {
			state.all{{pascalCase name}} = action.payload
		},
	},
})
