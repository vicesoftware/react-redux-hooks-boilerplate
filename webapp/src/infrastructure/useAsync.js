import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import dispatchAsync from './dispatchAsync'

export default function useAsync({
	url,
	actionType,
	dummyResponse,
	dummyError,
	dependencies = [],
} = {}) {
	if (
		dependencies &&
		(dependencies.length === undefined || dependencies.length === null)
	) {
		throw new Error('dependencies must be an array.')
	}

	const dispatch = useDispatch()

	useEffect(() => {
		dispatchAsync({ url, actionType, dispatch, dummyResponse, dummyError })

		// This was added because the of two issues
		// 1) including dummyResponse and dummyError below makes
		// using those from calling code really awkward as you
		// have to make sure that their pointers doing change or
		// you get endless loops. I lost have a day chasing that down.
		// 2) it complains when you spred out dependencies but there's really
		// no other way I can think to pass the dependencies in in a way that
		// doesn't cause some kind of warning
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [url, actionType, dispatch, ...dependencies])
}
