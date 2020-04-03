import { GET_ALL_FFL, GET_FFL_BY_ID } from './ffl.actionsTypes'
import { mergeCollections } from '../../infrastructure/reduxHelpers'

const intitialState = {
	allFfl: [],
}

export default function reducer(state = intitialState, action) {
	switch (action.type) {
		case GET_ALL_FFL.RECEIVED:
			return {
				...state,
				allFfl: action.payload,
			}
		case GET_FFL_BY_ID.RECEIVED:
			return {
				...state,
				allFfl: mergeCollections(state.allFfl, action.payload),
			}
		default: {
			return state
		}
	}
}
