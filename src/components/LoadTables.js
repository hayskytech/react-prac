import React from 'react'

export default function LoadTables() {
	let tables = [];
	for (let n = 1; n <= 10; n++) {
		tables.push(<Table n={n} />);
	}
	return tables;
}

function Table(props) {

	const tablecss = {
		border: '1px solid black',
		padding: '10px',
		margin: '10px',
		display: "inline-block"
	}

	let rows = [];
	for (let i = 1; i <= 10; i++) {
		rows.push(<Row n={props.n} i={i} />);
	}

	return (
		<table style={tablecss}>
			<tbody>
				{rows}
			</tbody>
		</table>
	)
}


function Row(p) {
	return (
		<tr>
			<td>{p.n} x {p.i} = {p.n * p.i}</td>
		</tr>
	)
}