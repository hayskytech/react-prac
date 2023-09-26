import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react'

export default function WPAuth(p) {
	const [username, setusername] = useState('')
	const [pwd, setpwd] = useState('')
	const [msg, setmsg] = useState('')

	async function handleSubmit() {
		let url = 'https://sufyan.in/wp-json/jwt-auth/v1/token'
		const postdata = {
			username: username,
			password: pwd,
		}
		let requestOptions = {
			method: 'POST',
			headers: {
				"Accept": "*/*",
				"Content-Type": "application/json"
			},
			body: JSON.stringify(postdata)
		}
		const res = await fetch(url, requestOptions)
		const json = await res.json()
		if (json.success) {
			localStorage.setItem('token', json.data.token)
			p.setmyuser(true)
		} else {
			setmsg(json.message)
		}
	}

	useEffect(() => {
		const token = localStorage.getItem('token')
		let url = 'https://sufyan.in/wp-json/jwt-auth/v1/token/validate'
		let requestOptions = {
			method: 'POST',
			headers: {
				"Accept": "*/*",
				Authorization: "Bearer " + token,
				"Content-Type": "application/json"
			},
			body: JSON.stringify({})
		}
		fetch(url, requestOptions)
			.then(res => res.json())
			.then(json => {
				if (json.success) {
					p.setmyuser(true)
				} else {
					console.log(json);
					p.setmyuser(false)
				}
			})
	}, [])

	return (
		<div>
			{p.myuser ?
				<>
					<p>User logged in...
						<a href='#' onClick={() => { p.setmyuser(false); localStorage.setItem('token', '') }}>Logout</a>
					</p>
				</>
				:
				<>
					<div>
						Username: <input type="text" value={username} onChange={(e) => setusername(e.target.value)} />
					</div>
					<div>
						Password: <input type="text" value={pwd} onChange={(e) => setpwd(e.target.value)} />
					</div>
					<div>
						<button onClick={handleSubmit}>Login</button>
					</div>
					{msg}
				</>
			}
		</div>
	)
}

WPAuth.propTypes = {
	myuser: PropTypes.bool,
	setmyuser: PropTypes.func.isRequired
}