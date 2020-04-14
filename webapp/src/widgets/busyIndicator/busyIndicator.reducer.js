const intitialState = {
	global: 0,
}

export default function reducer(state = intitialState, action) {
	if (
		action.type.endsWith('/pending') &&
		(!action.payload || !action.payload.noBusySpinner)
	) {
		if (action.payload && action.payload.name) {
			if (!state.name) {
				return {
					...state,
					[action.payload.name]: 1,
				}
			}
		}
		return {
			...state,
			global: state.global + 1,
		}
	}

	if (action.type.endsWith('/fulfilled') || action.type.endsWith('/error')) {
		if (action.payload && action.payload.name) {
			if (!state.name) {
				console.warn(
					`Received action which should have decremented named busy indicator but that busy indicator wasn't found. Busy indicator name ${action.payload.name}`
				)
				return state
			}

			return {
				...state,
				[action.payload.name]: state[action.payload.name] - 1,
			}
		}

		return {
			...state,
			global: state.global - 1,
		}
	}

	return state
}
