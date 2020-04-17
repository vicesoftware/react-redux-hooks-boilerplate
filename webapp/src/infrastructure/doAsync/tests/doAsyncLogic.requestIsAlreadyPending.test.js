import { requestIsAlreadyPending } from '../doAsyncLogic'
import * as pendingRequestSelectors from '../../pendingRequest/pendingRequest.selectors'
import * as reactReduxMock from 'react-redux'
import { REQUEST_ALREADY_PENDING_ASYNC } from '../doAsync.actionTypes'
import { incrementBusyIndicator } from '../../../widgets/busyIndicator'
import { addPendingRequest, setBusySpinner } from '../../pendingRequest'

jest.mock('react-redux')
jest.mock('../../pendingRequest/pendingRequest.selectors')

let dispatch
let getState

describe('Given we call requestIsAlreadyPending ', () => {
	beforeEach(() => {
		dispatch = reactReduxMock.useDispatch()
		getState = reactReduxMock.useStore().getState
	})

	afterEach(() => {
		dispatch.mockReset()
		getState.mockReset()
	})

	describe('When no request are pending ', () => {
		it("And there is noBusySpinner false Then we return false and don't call dispatch ", async () => {
			expect(requestIsAlreadyPending).toBeTruthy()
			expect(dispatch.mock).toBeTruthy()
			expect(pendingRequestSelectors.selectPendingRequest.mock).toBeTruthy()

			pendingRequestSelectors.selectPendingRequest.mockReturnValue(false)

			expect(
				requestIsAlreadyPending({
					actionType: { REQUESTED: '' },
					dispatch,
					getState,
				})
			).toEqual(false)

			expect(dispatch.mock.calls.length).toBe(0)
		})

		it("And there is noBusySpinner true Then we return false and don't call dispatch ", async () => {
			expect(requestIsAlreadyPending).toBeTruthy()
			expect(dispatch.mock).toBeTruthy()
			expect(pendingRequestSelectors.selectPendingRequest.mock).toBeTruthy()

			const url = 'EXPECTED_URL'
			const httpMethod = 'EXPECTED_HTTP_METHOD'

			pendingRequestSelectors.selectPendingRequest.mockReturnValue(false)

			expect(
				requestIsAlreadyPending({
					url,
					httpMethod,
					noBusySpinner: true,
					dispatch,
					getState,
				})
			).toEqual(false)

			expect(dispatch.mock.calls.length).toBe(1)
			expect(dispatch.mock.calls[0][0]).toEqual(
				addPendingRequest({ url, httpMethod })
			)
		})
	})

	describe('When a request is pending but noBusySpinner is passed in ', () => {
		it('Then we dispatch incrementBusyIndicator, dispatch setBusySpinner with busy spinner true and we dispatch REQUEST_ALREADY_PENDING_ASYNC and we return true  ', async () => {
			testIt(
				{ noBusySpinner: false },
				({ noBusySpinner, url, httpMethod, httpConfig }) => {
					expect(dispatch.mock.calls.length).toBe(3)
					expect(dispatch.mock.calls[0][0]).toEqual(incrementBusyIndicator())
					expect(dispatch.mock.calls[1][0]).toEqual(
						setBusySpinner({ url, httpMethod, turnSpinnerOff: !noBusySpinner })
					)
					expect(dispatch.mock.calls[2][0]).toEqual({
						type: REQUEST_ALREADY_PENDING_ASYNC,
						payload: {
							url,
							httpMethod,
							httpConfig,
							noBusySpinner,
						},
					})
				}
			)
		})
	})

	describe('When a request is pending and noBusySpinner is passed in ', () => {
		it('Then we dispatch setBusySpinner with busy spinner true and we dispatch REQUEST_ALREADY_PENDING_ASYNC and we return true  ', async () => {
			testIt(
				{ noBusySpinner: true },
				({ actionType, noBusySpinner, url, httpMethod, httpConfig }) => {
					expect(dispatch.mock.calls.length).toBe(2)
					expect(dispatch.mock.calls[0][0]).toEqual(
						setBusySpinner({ url, httpMethod, turnSpinnerOff: !noBusySpinner })
					)
					expect(dispatch.mock.calls[1][0]).toEqual({
						type: REQUEST_ALREADY_PENDING_ASYNC,
						payload: {
							url,
							httpMethod,
							httpConfig,
							noBusySpinner,
						},
					})
				}
			)
		})
	})
})

function testIt({ noBusySpinner }, andThen) {
	expect(requestIsAlreadyPending).toBeTruthy()
	expect(dispatch.mock).toBeTruthy()
	expect(pendingRequestSelectors.selectPendingRequest.mock).toBeTruthy()

	const actionType = {
		REQUESTED: 'TYPE_REQUESTED',
	}
	const url = 'expectedUrl'
	const httpMethod = 'httpMethod'
	const httpConfig = 'httpConfig'

	pendingRequestSelectors.selectPendingRequest.mockReturnValue(true)

	expect(
		requestIsAlreadyPending({
			noBusySpinner,
			actionType,
			dispatch,
			url,
			httpMethod,
			httpConfig,
			getState,
		})
	).toEqual(true)

	andThen({ actionType, noBusySpinner, url, httpMethod, httpConfig })
}
