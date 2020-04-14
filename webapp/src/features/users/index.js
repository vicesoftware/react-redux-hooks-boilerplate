import Users from './Users'
import * as usersSelectors from './users.selectors'
import slice from './users.slice'
import * as usersActions from './user.actions'

export const { name, reducer } = slice
export const actions = { ...slice.actions, ...usersActions }
export const selectors = usersSelectors

export default Users
