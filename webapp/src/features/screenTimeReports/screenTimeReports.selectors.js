export const getAllScreenTimeReports = (state) =>
	state.screenTimeReports.allScreenTimeReports
export const getScreenTimeReportById = (screenTimeReportsId) => (state) =>
	state.screenTimeReports.allScreenTimeReports.find(
		(item) => item.id === screenTimeReportsId
	)

const emptyReports = []
export const getScreenTimeReportsByUserId = (userId) => (state) => {
	const result = state.screenTimeReports.allScreenTimeReports.filter(
		(item) => item.userId === userId
	)

	return result || emptyReports
}

export const getScreenTimeReportsConfig = (state) =>
	state.screenTimeReports.config
