import * as busyIndicatorSelectors from './busyIndicator.selectors'
import BusyIndicator from './BusyIndicator'
import slice from './busyIndicator.slice'

export const { name, actions, reducer } = slice
export const selectors = busyIndicatorSelectors

export default BusyIndicator
