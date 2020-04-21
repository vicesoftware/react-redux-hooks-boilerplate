import Users from './Users'
import * as selectors from './users.selectors'
import slice from './users.slice'
import * as asyncActions from './user.asyncActions'

export const { name, reducer } = slice

export const { fetchAllUsers } = asyncActions
export const { selectAllUsers } = selectors

export default Users
