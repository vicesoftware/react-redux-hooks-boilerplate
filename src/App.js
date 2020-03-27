import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import NavBar from './widgets/NavBar'
import Routes from './Routes'

function App() {
	return (
		<Router>
			<div>
				<NavBar />
				<Routes />
			</div>
		</Router>
	)
}

export default App
