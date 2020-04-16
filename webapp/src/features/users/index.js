import Users from './Users'
import { selectAllUsers } from './users.selectors'
import slice from './users.slice'
import { fetchAllUsers } from './user.actions'

export const { name, reducer } = slice
export const actions = {
	fetchAllUsers,
}
export const selectors = {
	selectAllUsers,
}

export default Users
