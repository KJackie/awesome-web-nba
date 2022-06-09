import React from 'react';
import Router from './Router';
import { UserContextProvider } from '../src/context/UserContext';
import axios from 'axios';
import './styles/App.scss';

axios.defaults.withCredentials = true;

function App() {
	return (
		<UserContextProvider>
			<Router />
		</UserContextProvider>
	);
}

export default App;
