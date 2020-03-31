import components from './components'
import * as constants from './busyIndicator.constants'
import * as selectors from './busyIndicator.selectors'
import reducer from './busyIndicator.reducer'
import BusyIndicator from './components/BusyIndicator'

export default { components, constants, selectors, reducer }

// Added as a convenience so you can import { BusyIndiator } from `./busyIndicator`
export { BusyIndicator }
