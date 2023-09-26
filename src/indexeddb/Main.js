import React, { useEffect, useState } from 'react'
import { openDB } from 'idb';
import dbPromise from './dbPromise'

function Main() {

	const [tasks, setTasks] = useState([])

	useEffect(() => {
		async function fetchTasks() {
			const db = await dbPromise
			const transaction = db.transaction('persons', 'readonly')
			const store = transaction.objectStore('persons')
			// var index = store.index("place")
			const tasks = await store.getAll()
			// const vv = tasks.filter(x => { return (x.place.includes(182) || x.place.includes(181)) })
			setTasks(tasks)
		}
		fetchTasks()
	}, []);

	async function getone() {
		const db = await dbPromise
		const store = db.transaction(['tasks'], 'readonly').objectStore("persons")
		var index = store.index("place")
		const tasks = await index.getAll(666)
		console.log(tasks)
	}

	const addTask = async (task) => {
		const db = await dbPromise;
		const modified_after = await db.transaction(['options'], 'readwrite').objectStore('options').get(1)
		let params = {
			_fields: 'id,title,place,waqth',
			per_page: 100,
			offset: 0
		}
		if (modified_after) {
			params.modified_after = modified_after.loaded
		}
		let jsonData = []
		async function loaddata(params) {
			const p = new URLSearchParams(params).toString()
			const url = 'https://muslimawaaz.com//wp-json/wp/v2/person/?' + p
			// return
			const res = await fetch(url)
			const result = await res.json()
			if (params.offset === 0) {
				// setTasks(result)
			}
			jsonData.push(result)
			if (result.length === 100) {
				console.log(result.length);
				params.offset += 100
				await loaddata(params)
			}
		}
		await loaddata(params)
		console.log(jsonData);
		const os = db.transaction(['persons'], 'readwrite').objectStore('persons')
		jsonData.forEach(element => {
			element.forEach(x => {
				os.put(x)
			})
		})
		const tasks = await os.getAll()
		setTasks(tasks)
		const date = new Date()
		const withoutMs = date.toISOString().split('.')[0] + 'Z';
		db.transaction(['options'], 'readwrite').objectStore('options').put({ id: 1, loaded: withoutMs })

	};

	return (
		<div>
			<div>
				<button onClick={() => addTask(`Task ${tasks.length + 1}`)}>Add Task</button>
				<ul>
					{tasks.map((task, index) => (
						<li key={index}>{JSON.stringify(task)}</li>
					))}
				</ul>
			</div>

			<button onClick={getone}>as</button>

			<div>
				{/* {JSON.stringify(tasks)} */}
			</div>

		</div>
	)
}

export default Main
