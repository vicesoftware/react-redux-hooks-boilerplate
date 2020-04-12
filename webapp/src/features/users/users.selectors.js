export const getAllUsers = (state) => state.users.allUsers
export const getUsersById = (usersId) => (state) =>
	state.users.allUsers.find((item) => item.id === usersId)
