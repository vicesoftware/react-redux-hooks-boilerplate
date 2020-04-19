import * as busyIndicatorSelectors from './busyIndicator.selectors'
import BusyIndicator from './BusyIndicator'
import slice from './busyIndicator.slice'

export const {
	name,
	actions: { incrementBusyIndicator, decrementBusyIndicator },
	reducer,
} = slice

export const {
	getGlobalBusyIndicator,
	getNamedBusyIndicator,
} = busyIndicatorSelectors

export default BusyIndicator
