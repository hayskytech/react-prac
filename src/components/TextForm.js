import React, { useState } from 'react'
import PropTypes from 'prop-types'


export default function TextForm() {
	const handleUpClick = () => {
		let newText = text.toUpperCase();
		setText(newText)
	}
	const handleOnChange = (event) => {
		setText(event.target.value)
	}
	const [text, setText] = useState('Enter text')
	return (
		<div>
			<div className="mb-3">
				<label htmlFor="myform" className="form-label">Example textarea</label>
				<textarea className="form-control" id="myform" rows="3" value={text} onChange={handleOnChange}></textarea>
				<button className="btn btn-primary" onClick={handleUpClick}>Change Uppercase</button>
			</div>
			<div className="container">
				<h4>Words: {text.length}<br />
					Letters: {text.split(' ').length}
				</h4>
			</div>
		</div>
	)
}

TextForm.propTypes = {
	text: PropTypes.string
}
TextForm.defaultProps = {
	text: 'Enter you text'
};