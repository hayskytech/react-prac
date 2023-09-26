import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'semantic-ui-react'
import EditPost from './EditPost'

export default function Posts(p) {

	const [list, setlist] = useState([])
	const emptypost = { id: null, title: { rendered: '' } }
	const [title, settitle] = useState('')

	const url = 'https://sufyan.in/wp-json/wp/v2/'
	useEffect(() => {
		if (!p.myuser) return
		let params = { _fields: 'id,title', per_page: 10 }
		params = new URLSearchParams(params)
		fetch(url + 'posts?' + params)
			.then(res => res.json())
			.then(json => {
				setlist(json)
			})
	}, [])
	let headers = {
		"Accept": "*/*",
		Authorization: 'Bearer ' + localStorage.getItem('token'),
		"Content-Type": "application/json"
	}
	function addpost(e) {
		e.preventDefault()
		console.log('adding')
		fetch(url + 'posts', {
			method: 'POST',
			headers: headers,
			body: JSON.stringify({
				title: 'title',
				status: 'publish'
			})
		})
			.then(res => res.json())
			.then(json => {
				console.log(json)
			})
	}
	const imgUpload = useRef(null)
	const [img, setImg] = useState('')

	function previewImage() {
		var oFReader = new FileReader()
		oFReader.readAsDataURL(imgUpload.current.files[0])
		oFReader.onload = function (oFREvent) {
			setImg(oFREvent.target.result)
		}
	}
	function updateItem() {
		if (imgUpload.current.files.length > 0) {
			let file = imgUpload.current.files[0]
			let formData = new FormData()
			formData.append('file', file)

			const headers = {
				"Authorization": 'Bearer ' + localStorage.getItem('token'),
			}

			fetch(
				url + 'media',
				{
					method: 'POST',
					headers: headers,
					body: formData
				}
			)
				.then(res => res.json())
				.then(json => {
					console.log(json)
				})

		}
	}
	return (
		<div>

			<form onSubmit={addpost}>
				Title: <input type="text" value={title} onChange={(e) => { settitle(e.target.value) }} />
				<Button>Add</Button>
			</form>
			<div>
				{(() => {
					if (img) {
						return (<img src={img} alt='image' style={{ width: 200 }} />)
					}
				})()}
				<input id="imgUpload" type="file" ref={imgUpload} onChange={previewImage} />
				<button onClick={updateItem}>Update</button>
			</div>

			{
				list.map((item, i) => {
					return (<p key={i}>{item.title.rendered}</p>)
				})
			}
		</div>
	)
}

Posts.propTypes = {
	myuser: PropTypes.bool.isRequired
}