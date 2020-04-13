import { useDispatch } from 'react-redux'
import * as settingsActions from './settings.actionsTypes'

export function useUpdateSettings() {
	const dispatch = useDispatch()
	return (settings) =>
		dispatch({ type: settingsActions.UPDATE_SETTINGS, payload: settings })
}
