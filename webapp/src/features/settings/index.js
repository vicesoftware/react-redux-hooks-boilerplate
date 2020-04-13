import Settings from './Settings'
import * as settingsSelectors from './settings.selectors'
import slice from './settings.slice'

export const { name, actions, reducer } = slice
export const selectors = settingsSelectors

export default Settings
