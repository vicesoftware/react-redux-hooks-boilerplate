import slice from './notificationPopup.slice'

export const selectSlice = (state) => state[slice.name]

export const selectNotification = (state) => selectSlice(state)
