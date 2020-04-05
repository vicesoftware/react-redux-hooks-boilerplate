import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import NavBar from './widgets/NavBar'
import Routes from './Routes'

function App() {
	return (
		<Router>
			<NavBar />
			<Routes />
		</Router>
	)
}

export default App
