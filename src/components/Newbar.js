import React from 'react'
import PropTypes from 'prop-types'



export default function Newbar(props) {
	return (
		<div>Hello {props.title} {props.name}</div>
	)
}

Newbar.propTypes = {
	name: PropTypes.string.isRequired,
	title: PropTypes.string
}

Newbar.defaultProps = {
	name: 'Stranger',
	title: "Mr."
};