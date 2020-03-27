import { GET_ALL_ASYNC } from './user.actionsTypes'

const intitialState = []

export default function reducer(state = intitialState, action) {
	switch (action.type) {
		case GET_ALL_ASYNC.RECEIVED:
			return action.payload
		default: {
			return state
		}
	}
}
