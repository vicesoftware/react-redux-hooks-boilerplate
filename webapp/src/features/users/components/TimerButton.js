import React from 'react'
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown'
import { useTimer } from './useTimer'
import { useToggleTimer } from './useToggleTimer'

export function TimerButton({ children, ...rest }) {
	const { isTimerOn, toggleTimer } = useToggleTimer()

	const { content } = useTimer({ isTimerOn, children })

	return (
		<Button onClick={toggleTimer} {...rest}>
			{content}
		</Button>
	)
}

export function TimerDropDownButton({ toggle, children, ...rest }) {
	const { isTimerOn, toggleTimer } = useToggleTimer()
	const { content } = useTimer({ isTimerOn, children: toggle })

	function tryTurnOffTimer() {
		if (isTimerOn) {
			toggleTimer()
		}
	}

	function tryTurnOnTimer() {
		if (!isTimerOn) {
			toggleTimer()
		}
	}

	return (
		<Dropdown onClick={tryTurnOffTimer} {...rest}>
			<Dropdown.Toggle {...rest}>{content}</Dropdown.Toggle>
			{children({ tryTurnOnTimer })}
		</Dropdown>
	)
}
