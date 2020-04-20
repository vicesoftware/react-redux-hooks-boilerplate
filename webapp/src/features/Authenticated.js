import React from 'react'
import { WithRestrictedAccess } from './userContext'

function Authenticated() {
	console.log('Hi')
	return <h2>Authenticated</h2>
}

export default WithRestrictedAccess(Authenticated)
