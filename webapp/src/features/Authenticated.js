import React from 'react'
import { WithRestrictedAccess } from './userContext'

const Authenticated = () => <h2>Authenticated</h2>

export default WithRestrictedAccess(Authenticated)
