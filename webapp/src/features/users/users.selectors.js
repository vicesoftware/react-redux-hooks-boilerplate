import slice from './users.slice'

export const selectSlice = (state) => state[slice.name]

export const selectAllUsers = (state) => selectSlice(state).allUsers
export const selectUsersById = (usersId) => (state) =>
	selectAllUsers(state).find((item) => item.id === usersId)
