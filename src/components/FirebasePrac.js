import React, { useEffect, useState } from 'react'
import { firebaseConfig } from '../Config';
import OTPLogin from './OTPLogin';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, onIdTokenChanged } from 'firebase/auth';
import { child, getDatabase, onValue, push, ref, remove, set, update } from 'firebase/database';
import { Button } from 'semantic-ui-react';

export default function FirebasePrac() {
	const [myuser, setmyuser] = useState(null)
	const [list, setlist] = useState([])
	const [text, settext] = useState('')

	const app = initializeApp(firebaseConfig);
	const auth = getAuth(app);

	useEffect(() => {
		const unsubscribeAuthState = onAuthStateChanged(auth, (user) => {
			setmyuser(user);
			if (user) {
				console.log('User is logged in...', user.uid);
				loadList(user.uid)
			} else {
				console.log('User not logged in...');
				// setArea(<OTPLogin />)
			}
		});
		const unsubscribeIdToken = onIdTokenChanged(auth, (user) => {
			setmyuser(user);
		});
		return () => {
			unsubscribeAuthState();
			unsubscribeIdToken();
		};
	}, [auth])

	const db = getDatabase();

	function loadList(uid = null) {
		if (myuser) {
			uid = myuser.uid
		}
		const starCountRef = ref(db, 'users/' + uid + '/posts/');
		onValue(starCountRef, (snapshot) => {
			const data = snapshot.val();
			// setSize(snapshot.size);
			if (data) {
				console.log('data: ', data);
				let res = []
				Object.keys(data).forEach(key => {
					res.push({ value: data[key], key: key })
				});
				setlist(res)
			} else {
				setlist([])
				console.log('no data');
			}
		});
	}

	function additem(e) {
		e.preventDefault()
		const postListRef = ref(db, 'users/' + myuser.uid + '/todo/');
		set(postListRef, { hello: text });
	}
	function updateitem() {
		const newPostKey = push(child(ref(db), 'users/' + myuser.uid + '/posts/')).key;
		const updates = {};
		updates['users/' + myuser.uid + '/posts/' + newPostKey] = { name: text }
		update(ref(db), updates);
		settext('')
	}
	function rm(key) {
		console.log('trying to remove ', key);
		remove(ref(db, 'users/' + myuser.uid + '/posts/' + key))
	}


	return (
		<div>
			{
				myuser
					?
					<>
						<Button onClick={loadList}>Load Data</Button>
						<form onSubmit={additem}>
							<input type="text" value={text} onChange={(e) => { settext(e.target.value) }} />
							<Button color='blue'>Add</Button>
						</form>

						<Button onClick={updateitem}>Update</Button>

						{
							list.length ?
								list.map((item, index) => {
									return (
										<p key={item.key}>{item.value.name}
											<button type='button' onClick={() => rm(item.key)}>x</button>
										</p>
									)
								})
								: <p>Loading...</p>
						}
					</>
					:
					<OTPLogin setUser={setmyuser} />
			}
		</div>
	)
}
