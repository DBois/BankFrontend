import React, { useState } from 'react';
import '../App.css';

function SearchCustomerPage() {
	const [customer, setCustomer] = useState(null);
	const [searchText, setSearchText] = useState('');
	const fetchUser = async (id) => {
		const URL = `http://localhost:8081/customers/${id}`;
		let result = await fetch(URL).then((data) => data.json());
		setCustomer(result);
	};
	return (
		<div>
			<p>Search for a customer by CPR</p>
			<input
				placeholder="Enter CPR"
				type="text"
				onChange={(e) => setSearchText(e.target.value)}></input>
			<button onClick={() => fetchUser(searchText)}>Request</button>
			{customer && (
				<ul className="UserList">
					<li>Name: {customer.name}</li>
					<li>
						Account numbers:
						{customer.accountNumbers.map((data, idx) => {
							return (
								<p>
									{idx}: {data}
								</p>
							);
						})}
					</li>
					<li>CPR: {customer.cpr}</li>
				</ul>
			)}
		</div>
	);
}

export default SearchCustomerPage;
