import React, { useState } from 'react'
import PropTypes from 'prop-types';

export default function EditPost(p) {
	const [title, settitle] = useState(p.title.rendered)
	return (
		<div>
			<input type="text" value={title} onChange={(e) => { settitle(e.target.value) }} />
		</div>
	)
}

EditPost.propTypes = {
	post: PropTypes.object.isRequired
}