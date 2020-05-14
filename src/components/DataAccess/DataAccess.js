const URL = `http://localhost:8081/`;

export const transferMoney = async (data) => {
	return await fetch(URL + 'accounts/transfer/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	}).then((data) => data.json());
};

export const getAccount = async (number) => {
	return await fetch(`${URL}accounts/${number}/`).then((data) => data.json());
};

export const getAccounts = async (cpr) => {
	return await fetch(`${URL}accounts/customer=${cpr}/`).then((data) => data.json());
};
