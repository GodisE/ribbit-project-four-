import { useState } from 'react';
import { Routes, Route } from 'react-router-dom'
import AuthPage from '../AuthPage/AuthPage';
import GlobalPage from '../GlobalPage/GlobalPage';
import CreateThread from '../CreateThread/CreateThread';
import NavBar from '../components/NavBar/NavBar';
import './App.css';

import { getUser } from '../../utilities/users-service'

export default function App() {
  const [user, setUser] = useState(getUser())

 return (
		<main className='App'>
			{user ? (
				<>
					<NavBar user={user} setUser={setUser}/>
					<Routes>
						<Route path='/global' element={<GlobalPage />} />
						<Route path='/create' element={<CreateThread />} />
					</Routes>
				</>
			) : (
				<AuthPage setUser={setUser} />
			)}
		</main>
	)
}
