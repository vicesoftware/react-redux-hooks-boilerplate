import slice from './demo.slice'

export const selectSlice = (state) => state[slice.name]

export const selectAllDemo = (state) => selectSlice(state).allDemo

export const selectDemoFilter = (state) => selectSlice(state).filter
