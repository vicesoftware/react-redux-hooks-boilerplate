import Demo from './Demo'
import * as selectors from './demo.selectors'
import * as asyncActions from './demo.asyncActions'
import slice from './demo.slice'

export const {
	name,
	actions: { updateFilter },
	reducer,
} = slice

export const { fetchAllDemo } = asyncActions

// we prefix all selectors with the the "select" prefix
export const { selectAllDemo, selectDemoFilter } = selectors

// we export the component most likely to be desired by default
export default Demo
