import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import {
	selectIsAuthenticated,
	selectCurrentUserHasPermissions,
} from '../index'

const WithRestrictedAccess = (WrappedComponent, requiredPermissions = []) => {
	const curriedCurrentUserHasPermissions = selectCurrentUserHasPermissions.bind(
		null,
		requiredPermissions
	)

	const ProtectedContainer = ({ location }) => {
		return (
			<div>
				{selectIsAuthenticated && hasPermissions ? (
					<WrappedComponent />
				) : // Authenticated so show content
				!selectIsAuthenticated ? (
					<Redirect
						to={{
							// Not authenticated so redirect to /sign-in
							pathname: '/sign-in',
							state: { from: location },
						}}
					/>
				) : (
					<div>You {"don't"} have the required permissions for this page.</div>
				)}
			</div>
		)
	}

	ProtectedContainer.propTypes = {
		isAuthenticated: PropTypes.bool.isRequired,
		location: PropTypes.object.isRequired,
		hasPermissions: PropTypes.bool.isRequired,
	}

	const mapStateToProps = (state) => ({
		isAuthenticated: !!isAuthenticated(state),
		hasPermissions: curriedCurrentUserHasPermissions(state),
	})

	return connect(mapStateToProps)(ProtectedContainer)
}

export default WithRestrictedAccess
