import { SHOW, HIDE } from './modal.actionsTypes'

const intitialState = {
	show: false,
}

export default function reducer(state = intitialState, action) {
	switch (action.type) {
		case SHOW:
			return {
				...state,
				show: true,
			}
		case HIDE:
			return {
				...state,
				show: false,
			}
		default: {
			return state
		}
	}
}
