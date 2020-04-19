import slice from './settings.slice'

export const selectSlice = (state) => state[slice.name]

export const selectAllSettings = (state) => selectSlice(state)
