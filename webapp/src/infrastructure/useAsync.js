import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import dispatchAsync from './dispatchAsync'

export default function useAsync({ url, actionType, selector }) {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatchAsync({ url, actionType, dispatch })
	}, [dispatch, actionType, url])

	return useSelector(selector)
}
