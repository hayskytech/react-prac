import React from 'react'

export default function Menu(p) {
	const ss = {
		display: 'inline-block',
		padding: 10,
		margin: 5,
		backgroundColor: 'hotpink',
		border: '1px solid blue',
		"&:hover": {
			background: "#efefef"
		},
	}

	return (
		<div>
			<ul style={{ padding: 0 }}>
				{p.list.map((item) => <li style={ss}>{item}</li>)}
			</ul>
		</div>
	)
}
