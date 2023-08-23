import React from 'react'
import { useState } from 'react'


export default function Voting() {

	const [age, setage] = useState(0)
	const [msg, setmsg] = useState("")

	function run(e) {
		const x = e.target.value
		setage(x)
		if (x >= 18) {
			setmsg("eligible for voting")
		} else {
			setmsg("not eligible for voting")

		}
	}




return (
	<div>

		<p> enter youer age:</p>
		<input type="number" onChange={run}value={age}/>
		<p>{msg}</p>


	</div>
)
}
