import React, { useState } from 'react'
import WPAuth from './WPAuth'
import Posts from './Posts'

export default function Main() {
	const [myuser, setmyuser] = useState(false)

	return (
		<div>
			<WPAuth myuser={myuser} setmyuser={setmyuser} />
			{
				myuser ? <Posts myuser={myuser} /> : ''
			}
		</div>
	)
}
