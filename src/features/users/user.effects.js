import { useEffect } from 'react'
import * as userActions from './user.actionsTypes'
import * as userSelectors from './user.selectors'
import { useDispatch, useSelector } from 'react-redux'

export function useGetUsers() {
	return useAsync({
		url: 'https://jsonplaceholder.typicode.com/users',
		actionType: userActions.GET_ALL_ASYNC,
		selector: userSelectors.getAllUsers,
	})
}

export function useAsync({ url, actionType, selector }) {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch({ type: actionType.REQUESTED })
		fetch(url)
			.then((response) => response.json())
			.then((json) => dispatch({ type: actionType.RECEIVED, payload: json }))
			.catch((e) => dispatch({ type: actionType.ERROR }))
	}, [dispatch, actionType, url])

	return useSelector(selector)
}
