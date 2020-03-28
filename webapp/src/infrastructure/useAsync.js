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

	console.log(
		`useAsync called for ${url} with depedencies ${JSON.stringify({
			url,
			actionType,
			dummyResponse,
			dummyError,
			dependencies,
		})}`
	)

	useEffect(() => {
		dispatchAsync({ url, actionType, dispatch, dummyResponse, dummyError })
	}, [url, actionType, dispatch, dummyResponse, dummyError, ...dependencies])
}
