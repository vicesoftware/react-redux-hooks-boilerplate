import React from 'react'
import { Provider } from 'react-redux'
import { combineReducers, createStore } from 'redux'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'

const initialState = {}

function reducer(state, action) {
	if (typeof state === 'undefined') {
	  return initialState
	}
  
	// For now, don't handle any actions
	// and just return the state given to us.
	return state
  }

  // can't get this working. opened issue in github: https://github.com/testing-library/react-testing-library/issues/660
it('renders welcome message', () => {
	const store = createStore(combineReducers({ foos: reducer }))

	const { getByText } = render(
		<Provider store={store}>
			<h1>hi</h1>
		</Provider>
	)

	expect(getByText('hi')).toBeInTheDocument()
})
