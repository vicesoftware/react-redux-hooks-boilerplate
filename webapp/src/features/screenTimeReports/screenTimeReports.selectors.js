export const getAllScreenTimeReports = (state) =>
	state.screenTimeReports.allScreenTimeReports
export const getScreenTimeReportById = (date) => (state) =>
	state.screenTimeReports.allScreenTimeReports.find((item) => {
		debugger
		return new Date(item.date).toDateString() === new Date(date).toDateString()
	})

const emptyReports = []
export const getScreenTimeReportsByUserId = (userId) => (state) => {
	const result = state.screenTimeReports.allScreenTimeReports.filter(
		(item) => item.userId === userId
	)

	return result || emptyReports
}

export const getScreenTimeReportsConfig = (state) =>
	state.screenTimeReports.config
