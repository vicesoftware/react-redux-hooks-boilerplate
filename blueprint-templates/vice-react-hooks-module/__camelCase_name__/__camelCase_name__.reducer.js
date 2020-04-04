import {
	GET_ALL_{{upperSnakeCase name}},
	GET_{{upperSnakeCase name}}_BY_ID,
} from './{{camelCase name}}.actionsTypes'
import { mergeCollections } from '../../infrastructure/reduxHelpers'

const intitialState = {
	all{{pascalCase name}}: [],
}

export default function reducer(state = intitialState, action) {
	switch (action.type) {
		case GET_ALL_{{upperSnakeCase name}}.RECEIVED:
			return {
				...state,
				all{{pascalCase name}}: action.payload,
			}
		case GET_{{upperSnakeCase name}}_BY_ID.RECEIVED:
			return {
				...state,
				all{{pascalCase name}}: mergeCollections(state.all{{pascalCase name}}, action.payload),
			}
		default: {
			return state
		}
	}
}
