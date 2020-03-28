const DUMMY_ASYNC_DELAY = 1500

// We are taking dispatch seperately here so that useEffect doesn't have to depend dispatch on it upstream.
// If we make it depend on dispatch we could end up having our effect fire over and over again
// See https://reactjs.org/docs/hooks-reference.html#conditionally-firing-an-effect for details
const buildDispatchAsync = (dispatch) => {
	if (!dispatch) {
		throw new Error('dispatch is required')
	}

	return ({ url, actionType, dummyResponse, dummyError } = {}) => {
		console.log('dispatchAsync')
		if (!url) {
			throw new Error('url is required!')
		}

		if (
			!actionType ||
			!(actionType.REQUESTED && actionType.RECEIVED && actionType.ERROR)
		) {
			throw new Error(
				'actionType is required and must be an async action. Use the buildAsyncAction() factor method to create async actions.'
			)
		}

		if (dummyResponse && dummyError) {
			throw new Error(
				"It's invalid to specify dummyResponse and dummyError. You must specify one or the other."
			)
		}

		console.log({ type: actionType.REQUESTED })

		if (dummyResponse) {
			setTimeout(
				() =>
					console.log({ type: actionType.RECEIVED, payload: dummyResponse }),
				DUMMY_ASYNC_DELAY
			)
			return
		} else if (dummyError) {
			setTimeout(
				() => console.log({ type: actionType.ERROR, dummyError }),
				DUMMY_ASYNC_DELAY
			)
		}

		fetch(url)
			.then((response) => response.json())
			.then((json) => dispatch({ type: actionType.RECEIVED, payload: json }))
			.catch((e) => dispatch({ type: actionType.ERROR, payload: e }))
	}
}

export default buildDispatchAsync
