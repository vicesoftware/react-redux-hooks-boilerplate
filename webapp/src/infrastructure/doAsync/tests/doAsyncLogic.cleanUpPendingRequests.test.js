import { cleanUpPendingRequests } from '../doAsyncLogic'
import * as reactReduxMock from 'react-redux'
import * as pendingRequests from '../../pendingRequest/pendingRequest.selectors'
import { TURN_OFF_BUSY_INDICATOR_FOR_PENDING_ASYNC } from '../doAsync.actionTypes'
import { deletePendingRequest } from '../../pendingRequest/pendingRequest.actions'

jest.mock('react-redux')
jest.mock('../../pendingRequest/pendingRequest.selectors')

let dispatch
let getState

describe('Given we call cleanUpPendingRequests with an actionType and dispatch ', () => {
	beforeEach(() => {
		dispatch = reactReduxMock.useDispatch()
		getState = reactReduxMock.useStore().getState
	})

	afterEach(() => {
		dispatch.mockReset()
		getState.mockReset()

		pendingRequests.getPendingRequest.mockReset()
	})

	describe('When there are no pending requests ', () => {
		it('Then we return without call dispatch', () => {
			expect(pendingRequests.getPendingRequest.mock).toBeTruthy()
			expect(dispatch.mock).toBeTruthy()
			expect(cleanUpPendingRequests).toBeTruthy()

			cleanUpPendingRequests({}, dispatch, getState)

			expect(dispatch.mock.calls.length).toBe(0)
			expect(pendingRequests.getPendingRequest.mock.calls.length).toBe(1)
		})
	})

	describe('When there is a pending requests that require turning off busy spinner ', () => {
		it('Then pending request is called twice and we dispatch TURN_OFF_BUSY_INDICATOR_FOR_PENDING_ASYNC and deletePendingReqeust', () => {
			callPendingRequestAndThen(
				{ turnSpinnerOff: true },
				(dispatchMock, expectedActionType) => {
					expect(dispatchMock.mock.calls.length).toBe(2)
					expect(dispatchMock.mock.calls[0][0]).toEqual({
						type: TURN_OFF_BUSY_INDICATOR_FOR_PENDING_ASYNC,
					})
					expect(dispatchMock.mock.calls[1][0]).toEqual(
						deletePendingRequest(expectedActionType.REQUESTED)
					)
				}
			)
		})
	})

	describe('When there is a pending requests but NOT that require turning off busy spinner ', () => {
		it('Then pending request is called twice and we dispatch ONLY deletePendingReqeust', () => {
			callPendingRequestAndThen(
				{ turnSpinnerOff: false },
				(dispatchMock, expectedActionType) => {
					expect(dispatchMock.mock.calls.length).toBe(1)
					expect(dispatchMock.mock.calls[0][0]).toEqual(
						deletePendingRequest(expectedActionType.REQUESTED)
					)
				}
			)
		})
	})
})

function callPendingRequestAndThen({ turnSpinnerOff }, andThen) {
	expect(pendingRequests.getPendingRequest.mock).toBeTruthy()
	expect(dispatch.mock).toBeTruthy()
	expect(cleanUpPendingRequests).toBeTruthy()

	pendingRequests.getPendingRequest.mockReturnValue({ turnSpinnerOff })

	const expectedState = 'expectedState'

	getState.mockReturnValue(expectedState)

	const expectedActionType = {
		REQUESTED: 'foo',
	}

	cleanUpPendingRequests(expectedActionType, dispatch, getState)

	expect(pendingRequests.getPendingRequest.mock.calls.length).toBe(2)
	expect(pendingRequests.getPendingRequest.mock.calls[0][0]).toBe(expectedState)
	expect(pendingRequests.getPendingRequest.mock.calls[0][1]).toBe(
		expectedActionType.REQUESTED
	)
	expect(pendingRequests.getPendingRequest.mock.calls[1][0]).toBe(expectedState)
	expect(pendingRequests.getPendingRequest.mock.calls[1][1]).toBe(
		expectedActionType.REQUESTED
	)

	andThen(dispatch, expectedActionType)
}
