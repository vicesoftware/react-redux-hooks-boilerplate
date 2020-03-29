const DUMMY_ASYNC_DELAY = 1500

export default function dispatchAsync({
	url,
	actionType,
	dispatch,
	dummyResponse,
	dummyError,
} = {}) {
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

	dispatch({ type: actionType.REQUESTED })

	if (dummyResponse) {
		setTimeout(
			() => dispatch({ type: actionType.RECEIVED, payload: dummyResponse }),
			DUMMY_ASYNC_DELAY
		)
		return
	} else if (dummyError) {
		setTimeout(
			() => dispatch({ type: actionType.ERROR, dummyError }),
			DUMMY_ASYNC_DELAY
		)
	}

	fetch(url)
		.then((response) => response.json())
		.then((json) => dispatch({ type: actionType.RECEIVED, payload: json }))
		.catch((e) => dispatch({ type: actionType.ERROR, payload: e }))
}
