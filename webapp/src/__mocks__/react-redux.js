const reactReduxMock = jest.genMockFromModule('react-redux')

const dispatchMock = jest.fn()
reactReduxMock.useDispatch.mockReturnValue(dispatchMock)

const storeMock = { getState: jest.fn() }
reactReduxMock.useStore.mockReturnValue(storeMock)

module.exports = reactReduxMock
