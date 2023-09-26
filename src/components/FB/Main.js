import React, { useEffect, useState } from 'react'
import OTPLogin from '../OTPLogin'
import { getDatabase, onValue, push, ref, set } from "firebase/database";

export default function Main() {
  const [user, setUser] = useState(null)
  const [list, setlist] = useState([])
  // function writeUserData() {
  //   const db = getDatabase();
  //   set(ref(db, 'posts/' + user.uid), {
  //     username: 'name',
  //     email: 'emails',
  //     profile_picture: 'imageUrl'
  //   });
  // }
  // function addpost() {
  //   const db = getDatabase();
  //   const postListRef = ref(db, 'posts/' + user.uid);
  //   const newPostRef = push(postListRef);
  //   set(newPostRef, {
  //     "name": "ramesh"
  //   });
  // }


  useEffect(() => {
    if (user) {

      const db = getDatabase();
      const starCountRef = ref(db, 'todos');
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val()
        setlist(data)
      });
    }
  }, [user])
  return (
    <div>
      <OTPLogin user={user} setUser={setUser} />
      {/* <button onClick={addpost}>OK</button> */}
      <h2>Todo List</h2>
      <ul>
        {
          list.map((item) => {
            return (<li>{item}</li>)
          })
        }
      </ul>

    </div>
  )
}
