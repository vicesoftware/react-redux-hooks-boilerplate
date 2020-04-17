import Settings from './Settings'
import * as selectors from './settings.selectors'
import slice from './settings.slice'

export const {
	name,
	actions: { setUseCaching, setNoBusySpinner },
	reducer,
} = slice

export const { selectAllSettings } = selectors

export default Settings
