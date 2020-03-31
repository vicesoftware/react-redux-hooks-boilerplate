import { useDispatch } from 'react-redux'
import { SHOW, HIDE } from './modal.actionsTypes'

export function useShowModal() {
	const dispatch = useDispatch()

	dispatch({ type: SHOW })
}

export function useHideModal() {
	const dispatch = useDispatch()

	dispatch({ type: HIDE })
}
