import Modal from './Modal'
import slice from './modal.slice'
import * as selectors from './modal.selectors'

export const {
	name,
	actions: { showModal, hideModal },
	reducer,
} = slice

export const { selectShowModal } = selectors

export default Modal
