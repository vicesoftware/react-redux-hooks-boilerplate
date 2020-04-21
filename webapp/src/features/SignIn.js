import React from 'react'
import { Redirect, useLocation } from 'react-router-dom'
import get from 'lodash/get'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Formik } from 'formik'
import { useSelector, useDispatch } from 'react-redux'
import BusyIndicator from '../widgets/busyIndicator'
import { selectIsAuthenticated, signIn } from './userContext'

const SignIn = () => {
	const location = useLocation()
	const isAuthenticated = useSelector(selectIsAuthenticated)
	const dispatch = useDispatch()

	const to = get(location, 'state.from') || 'home'

	return (
		<>
			{isAuthenticated ? (
				<Redirect to={to} />
			) : (
				<BusyIndicator>
					<Formik
						initialValues={{ email: '', password: '' }}
						onSubmit={(values, { setSubmitting, resetForm }) => {
							// When button submits form and form is in the process of submitting, submit button is disabled
							setSubmitting(true)

							// Simulate submitting to database, shows us values submitted, resets form
							dispatch(signIn(values)).then(() => {
								resetForm()
								setSubmitting(false)
							})
						}}
					>
						{({
							values,
							// errors,
							// touched,
							handleChange,
							handleBlur,
							handleSubmit,
							isSubmitting,
						}) => (
							<Form onSubmit={handleSubmit}>
								<Form.Group controlId='formBasicEmail'>
									<Form.Label>Email address</Form.Label>
									<Form.Control
										name='email'
										type='email'
										placeholder='Enter email'
										value={values.email}
										onChange={handleChange}
										onBlur={handleBlur}
									/>
									{/* <Form.Text className='text-muted'>
							We'll never share your email with anyone else.
						</Form.Text> */}
								</Form.Group>

								<Form.Group controlId='formBasicPassword'>
									<Form.Label>Password</Form.Label>
									<Form.Control
										name='password'
										type='password'
										placeholder='Password'
										value={values.password}
										onChange={handleChange}
										onBlur={handleBlur}
									/>
								</Form.Group>
								<Button variant='primary' type='submit' disabled={isSubmitting}>
									Submit
								</Button>
							</Form>
						)}
					</Formik>
				</BusyIndicator>
			)}
		</>
	)
}

export default SignIn
