import React, { createContext, useEffect, useState } from 'react'
import 'semantic-ui-css/semantic.min.css'
import { Button, Menu } from 'semantic-ui-react'
import { BrowserRouter, Outlet, Link, Routes, Route } from 'react-router-dom'
import Calculator from './components/Calculator'
import NoPage from './components/NoPage'
import AllTables from './components/AllTables'
import LoadTables from './components/LoadTables'
import TodoListLocal from './components/TodoListLocal'
import { onAuthStateChanged, onIdTokenChanged } from 'firebase/auth';
import { auth } from './firebase/firebase'
import FirebaseTodo from './firebase/FirebaseTodo'
import TodoListMultiField from './components/TodoListMultiField'
import Post from './wordpress/Post'
import Main from './indexeddb/Main'


export const UserContext = createContext('defaultValue')

export default function App() {
  const [user, setUser] = useState(null)

  // Firebase Authentication
  useEffect(() => {
    const unsubscribeAuthState = onAuthStateChanged(auth, (user) => {
      setUser(user)
    });
    const unsubscribeIdToken = onIdTokenChanged(auth, (user) => {
      setUser(user)
    });
    return () => {
      unsubscribeAuthState()
      unsubscribeIdToken()
    };
  }, [auth])

  return (
    <div style={{ padding: 10 }}>
      <UserContext.Provider value={{ user, setUser }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainMenu />}>
              <Route index element={<p>awfwfa</p>} />
              <Route path='calculator' element={<Calculator />} />
              <Route path="AllTables" element={<AllTables />} />
              <Route path="LoadTables" element={<LoadTables />} />
              <Route path="TodoListLocal" element={<TodoListLocal />} />
              <Route path="TodoListMultiField" element={<TodoListMultiField />} />
              <Route path="FirebaseTodo" element={<FirebaseTodo />} />
              <Route path="*" element={<NoPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  )
}
function MainMenu() {
  return (
    <>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
        <Button color='blue' as={Link} to=''>Home</Button>
        <Button color='blue' as={Link} to='calculator'>Calculator</Button>
        <Button color='blue' as={Link} to='AllTables'>AllTables</Button>
        <Button color='blue' as={Link} to='LoadTables'>LoadTables</Button>
        <Button color='blue' as={Link} to='TodoListLocal'>TodoListLocal</Button>
        <Button color='blue' as={Link} to='TodoListMultiField'>TodoListMultiField</Button>
        <Button color='blue' as={Link} to='FirebaseTodo'>FirebaseTodo</Button>
      </div>
      <Outlet />
    </>
  )
}