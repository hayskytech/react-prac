import React from 'react'

import Students from './students/Students'
import Menu from './components/Menu'
import Voting from './students/Voting'
import Layout from './Layout'
import Home from './components/Home'
import About from './components/About'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Farook from './components/Farook'
import Contact from './components/Contact'
import 'semantic-ui-css/semantic.min.css'

export default function App() {

	const items = ['Home', 'About']

	return (
		<div>

			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route index element={<Home />} />
						<Route path="about" element={<About />} />
						<Route path="contact" element={<Contact />} />
						<Route path="Farook" element={<Farook />} />
						{/* <Route path="*" element={<NoPage />} /> */}
					</Route>
				</Routes>
			</BrowserRouter>

		</div>
	)
}
