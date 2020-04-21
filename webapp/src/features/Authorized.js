import React from 'react'
import { WithRestrictedAccess } from './userContext'

const Authorized = () => <h1>Authorized Page</h1>

export default WithRestrictedAccess(Authorized, ['can-do-anything'])
