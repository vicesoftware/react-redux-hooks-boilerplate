export const getAllFfl = (state) => state.ffl.allFfl
export const getFflById = (fflId) => (state) =>
	state.ffl.allFfl.find((item) => item.id === fflId)
