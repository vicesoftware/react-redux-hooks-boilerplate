import React from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import classnames from 'classnames'
import './navBar.css'

export default function NavBar() {
	return (
		<nav>
			<ul>
				<li>
					<NavItem to='/'>Home</NavItem>
				</li>
				<li>
					<NavItem to='/about'>About</NavItem>
				</li>
				<li>
					<NavItem to='/users' activeOnlyWhenExact={false}>
						Users
					</NavItem>
				</li>
			</ul>
		</nav>
	)
}

function NavItem({
	to,
	children,
	activeOnlyWhenExact = true,
	className,
	...rest
}) {
	const match = useRouteMatch({
		path: to,
		exact: activeOnlyWhenExact,
	})

	return (
		<Link
			to={to}
			{...rest}
			className={classnames(className, { active: match })}
		>
			{children}
		</Link>
	)
}
