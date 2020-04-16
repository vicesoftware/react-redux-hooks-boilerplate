export const selectAllUsers = (state) => state.users.allUsers
export const getUsersById = (usersId) => (state) =>
	state.users.allUsers.find((item) => item.id === usersId)
