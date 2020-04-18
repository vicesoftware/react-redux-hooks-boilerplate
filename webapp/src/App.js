import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import NavBar from './widgets/NavBar'
import Routes from './Routes'
import './app.css'
import notificationPopup from './infrastructure/notificationPopup'

const {
	components: { NotificationPopup },
} = notificationPopup

function App() {
	return (
		<Router>
			<NavBar />
			<Container className='page'>
				<NotificationPopup />
				<Routes />
			</Container>
		</Router>
	)
}

export default App
