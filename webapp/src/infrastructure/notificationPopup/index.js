import NotificationPopup from './NotificationPopup'
import * as notificationPopupSelectors from './notificationPopup.selectors'
import slice from './notificationPopup.slice'

export const {
	name,
	actions: { notifyError, notifySuccess, resetError, closePopup },
	reducer,
} = slice

export const {
	selectNotification: getNotification,
} = notificationPopupSelectors

export default NotificationPopup
