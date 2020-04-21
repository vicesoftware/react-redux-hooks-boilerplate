import React from 'react'
import { WithRestrictedAccess } from './userContext'

const Authorized = () => <h2>Authorized Page</h2>

export default WithRestrictedAccess(Authorized, ['can-do-anything'])
