import React, { useState } from 'react';
import '../App.css';

function TransferPage() {
	const [detail, setDetail] = useState(null);
	const [searchQuery, setSearchQuery] = useState('');
	const onChangeForm = (e) => {
		setSearchQuery({
			...searchQuery,
			[e.target.name]: e.target.name === 'amount' ? Number(e.target.value) : e.target.value,
		});
	};
	const postTransfer = async (e) => {
		e.preventDefault();
		console.log(JSON.stringify(searchQuery));
		const URL = `http://localhost:8081/accounts/transfer/`;
		let result = await fetch(URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},

			body: JSON.stringify(searchQuery),
		}).then((data) => data.json());
		console.log(result);
	};

	return (
		<div>
			<p>Search for a customer by CPR</p>
			<form onChange={onChangeForm} onSubmit={postTransfer}>
				<input name="amount" placeholder="Amount" type="number" />
				<input name="source" placeholder="Origin bank account" type="text" />
				<input name="target" placeholder="Target bank account" type="text" />
				<button>Transfer</button>
			</form>
		</div>
	);
}

export default TransferPage;
