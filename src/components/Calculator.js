import React, { useState } from 'react'

function Calculator() {

	function handlex(event){
		const v = event.target.value
		setx(parseInt(v ? v : 0))
	}
	function handley(event){
		const v = event.target.value
		sety(parseInt(v ? v : 0))
	}
	const [x, setx] = useState(0)
	const [y, sety] = useState(0)
	return (
		<div>
			X: <input type="number" value={x} onChange={handlex}/>
			<br />
			Y: <input type="number" value={y} onChange={handley}/>
			<h3>Addition: {x} + {y} = {x+y}</h3>
			<h3>Subtraction {x} - {y} = {x-y}</h3>
			<h3>Multiplication: {x*y}</h3>
			<h3>Division: {x/y}</h3>
		</div>
	)
}

export default Calculator