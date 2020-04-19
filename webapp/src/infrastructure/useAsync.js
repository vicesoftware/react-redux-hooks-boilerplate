import { useDispatch, useStore } from 'react-redux'
import { useEffect } from 'react'
import doAsync from './doAsync'

const defaultHttpMethod = 'get'

export default function useAsync({
	actionType,
	url,
	httpMethod = defaultHttpMethod,
	mapResponseToPayload,
	errorMessage,
	httpConfig,
	onError,
	successMessage,
	noBusySpinner,
	useCaching = false,
	stubSuccess,
	stubError,
	dependencies = [],
} = {}) {
	if (
		dependencies &&
		(dependencies.length === undefined || dependencies.length === null)
	) {
		throw new Error('dependencies must be an array.')
	}

	const dispatch = useDispatch()
	const { getState } = useStore()

	useEffect(() => {
		doAsync({
			dispatch,
			getState,
			actionType,
			url,
			httpMethod,
			mapResponseToPayload,
			errorMessage,
			httpConfig,
			onError,
			successMessage,
			noBusySpinner,
			useCaching,
			stubSuccess,
			stubError,
		})

		// This was added because the of two issues
		// 1) including dummyResponse and dummyError below makes
		// using those from calling code really awkward as you
		// have to make sure that their pointers doing change or
		// you get endless loops. I lost have a day chasing that down.
		// 2) it complains when you spred out dependencies but there's really
		// no other way I can think to pass the dependencies in in a way that
		// doesn't cause some kind of warning
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		dispatch,
		getState,
		actionType,
		url,
		httpMethod,
		mapResponseToPayload,
		errorMessage,
		httpConfig,
		onError,
		successMessage,
		noBusySpinner,
		useCaching,
		// NOTE: These were left here so that we would know not to add these back.
		// If we add these to the depedency list then they have to be the same pointers passed
		// in each time which makes the useEffect api awkward for developers to work with. Leaving these
		// breaks the idiomatic rules of Redux a bit but in a valuable and safe way Please don't remove
		// this comment or change the commented out stubSucces and stubError without discussing with Ryan first
		// stubSuccess,
		// stubError,
		// eslint-disable-next-line react-hooks/exhaustive-deps
		...dependencies,
	])
}
