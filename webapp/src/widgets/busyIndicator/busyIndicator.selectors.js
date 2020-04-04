export const getGlobalBusyIndicator = (state) =>
	getNamedBusyIndicator('global')(state)
export const getNamedBusyIndicator = (name) => (state) =>
	!!state.busyIndicator[name]
