import { GET_ALL_DEMO, GET_DEMO_BY_ID } from './demo.actionsTypes'
import { mergeCollections } from '../../infrastructure/reduxHelpers'

const intitialState = {
	allDemo: [],
}

export default function reducer(state = intitialState, action) {
	switch (action.type) {
		case GET_ALL_DEMO.RECEIVED:
			return {
				...state,
				allDemo: action.payload,
			}
		case GET_DEMO_BY_ID.RECEIVED:
			return {
				...state,
				allDemo: mergeCollections(state.allDemo, action.payload),
			}
		default: {
			return state
		}
	}
}
