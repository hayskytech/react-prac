import React, { useEffect, useState } from 'react'
import OTPLogin from '../OTPLogin'
import { getDatabase, onValue, push, ref, set } from "firebase/database";

export default function Main() {
  const [user, setUser] = useState(null)
  const [list, setlist] = useState([])
  const [item, setitem] = useState('')
  // function writeUserData() {
  //   const db = getDatabase();
  //   set(ref(db, 'posts/' + user.uid), {
  //     username: 'name',
  //     email: 'emails',
  //     profile_picture: 'imageUrl'
  //   });
  // }
  function additem() {
    const db = getDatabase();
    const postListRef = ref(db, 'todos/' + user.uid);
    const newPostRef = push(postListRef);
    set(newPostRef, item);
  }


  useEffect(() => {
    if (user) {
      const db = getDatabase();
      const starCountRef = ref(db, 'todos/' + user.uid);
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val()
        if (data) {
          setlist(data)
        } else {
          console.log('data does not exists');
        }
      });
    }
  }, [user])


  return (
    <div>
      <OTPLogin user={user} setUser={setUser} />
      {/* <button onClick={addpost}>OK</button> */}
      <hr />
      Add Item:
      <input type="text" value={item} onChange={(e) => { setitem(e.target.value) }} />
      <button onClick={additem}>ADD</button>
      <h2>Todo List</h2>
      <ul>
        {
          Object.values(list).map((item) => {
            return (<li>{item}</li>)
          })
        }
      </ul>

    </div>
  )
}
