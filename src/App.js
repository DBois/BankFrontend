import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import SearchCustomerPage from './components/SearchCustomerPage';
import TransferPage from './components/TransferPage';

function App() {
	return (
		<div className="App" style={{ backgroundColor: 'tomato' }}>
			<SearchCustomerPage />
			<TransferPage />
		</div>
	);
}

var styles = {
	navItem: {
		marginRight: 50,
	},
};
export default App;
