import {
	GET_ALL_{{upperSnakeCase name}}_ASYNC,
	GET_{{upperSnakeCase name}}_BY_ID_ASYNC,
} from './{{camelCase name}}.actionsTypes'
import { mergeCollections } from '../../infrastructure/reduxHelpers'

const intitialState = {
	all{{pascalCase name}}: [],
}

export default function reducer(state = intitialState, action) {
	switch (action.type) {
		case GET_ALL_{{upperSnakeCase name}}_ASYNC.RECEIVED:
			return {
				...state,
				all{{pascalCase name}}: action.payload,
			}
		case GET_{{upperSnakeCase name}}_BY_ID_ASYNC.RECEIVED:
			return {
				...state,
				all{{pascalCase name}}: mergeCollections(state.allUsers, action.payload),
			}
		default: {
			return state
		}
	}
}
