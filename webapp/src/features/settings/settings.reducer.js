import { UPDATE_SETTINGS } from './settings.actionsTypes'

const intitialState = {
	useCaching: false,
}

export default function reducer(state = intitialState, action) {
	switch (action.type) {
		case UPDATE_SETTINGS:
			return {
				...state,
				...action.payload,
			}
		default: {
			return state
		}
	}
}
