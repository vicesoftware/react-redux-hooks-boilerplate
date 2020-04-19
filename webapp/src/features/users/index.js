import Users from './Users'
import * as selectors from './users.selectors'
import slice from './users.slice'
import * as actions from './user.actions'

export const { name, reducer } = slice

export const { fetchAllUsers } = actions
export const { selectAllUsers } = selectors

export default Users
