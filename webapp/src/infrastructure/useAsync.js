import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import buildDispatchAsync from './buildDispatchAsync'

export default function useAsync({
	url,
	actionType,
	selector,
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
			selector,
			dummyResponse,
			dummyError,
			dependencies,
		})}`
	)

	const dispatchAsync = buildDispatchAsync(dispatch)

	useEffect(() => {
		dispatchAsync({ url, actionType, dummyResponse, dummyError })
	}, [url, actionType, selector, dummyResponse, dummyError, ...dependencies])

	return useSelector(selector)
}
