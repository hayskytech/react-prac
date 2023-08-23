import React from 'react'

export default function Card(props) {


	const data = {
		name: 'ramesh',
		age: 20,
		town: 'NDK'
	}
	console.log(data.name);

	return (
		<div style={{ borderWidth: 2, borderColor: 'black', borderStyle: 'solid', width: 250 }}>

			<h2>{props.name}</h2>

			<p style={{ fontSize: 20 }}>Class {props.class}</p>


		</div>
	)
}
