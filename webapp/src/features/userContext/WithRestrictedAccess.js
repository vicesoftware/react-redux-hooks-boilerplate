import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, useLocation } from 'react-router-dom'
import {
	selectIsAuthenticated,
	selectCurrentUserHasPermissions,
} from './userContext.selectors'

const WithRestrictedAccess = (WrappedComponent, requiredPermissions = []) => {
	const ProtectedRoute = () => {
		const isAuthenticated = !!useSelector(selectIsAuthenticated)
		const hasPermissions = useSelector(
			selectCurrentUserHasPermissions(requiredPermissions)
		)
		const location = useLocation()

		return (
			<div>
				{isAuthenticated && hasPermissions ? (
					<WrappedComponent />
				) : // Authenticated so show content
				!isAuthenticated ? (
					<Redirect
						to={{
							// Not authenticated so redirect to /sign-in
							pathname: '/sign-in',
							state: { from: location.pathname },
						}}
					/>
				) : (
					<div>You {"don't"} have the required permissions for this page.</div>
				)}
			</div>
		)
	}

	return ProtectedRoute
}

export default WithRestrictedAccess
