import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = React.forwardRef((props, ref) => {
	const [visible, setVisible] = useState(false)

	const hideWhenVisible = { display: visible ? 'none' : '' }
	const showWhenVisible = { display: visible ? '' : 'none' }

	const toggleVisibility = () => {
		setVisible(!visible)
	}

	useImperativeHandle(ref, () => {
		return {
			toggleVisibility
		}
	})

	return (
		<div>
			<div style={hideWhenVisible}>
				<button className='ml-3 mt-3 bg-blue-300 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded' onClick={toggleVisibility}>{props.buttonLabel}</button>
			</div>
			<div style={showWhenVisible}>
				{props.children}
				<button className='ml-3 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded' onClick={toggleVisibility}>Hide</button>
			</div>
		</div>
	)
})

Togglable.propTypes = {
	buttonLabel: PropTypes.string.isRequired
}

Togglable.displayName = 'Togglable'

export default Togglable