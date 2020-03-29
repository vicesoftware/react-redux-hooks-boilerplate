export const getAllUsers = (state) => state.users.allUsers

export const getUser = (userId) => {
	const defaultUser = {}

	return (state) => {
		const user = state.users.allUsers.find((user) => user.id === userId)

		return user || defaultUser
	}
}

export const getScreenTimeReports = (userId) => (state) => {
	console.log(userId)
	console.log(state.users.screenTimeReports)
	return state.users.screenTimeReports.filter(
		(report) => report.userId === userId
	)
}
