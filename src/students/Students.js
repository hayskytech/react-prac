import React from 'react'
import './students.css'
export default function Students() {

	const list = ['apple', 'cat', 'dog', 'eliphant', 'frog', 'hen', 'tiger']
	return (
		<div>
			<ol id='students'>
				{list.map((item) => (<li>{item}</li>))}
			</ol>
		</div>
	)
}
