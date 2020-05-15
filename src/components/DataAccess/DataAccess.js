const URL = `http://localhost:8081/`;

export const transferMoney = async (data) => {
	return new Promise((resolve, reject) => {
		fetch(`${URL}accounts/transfer/`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		}).then((res) => {
			if (res.ok) resolve(res);
			else reject(res);
		});
	});
};

export const getAccount = async (number) => {
	return new Promise((resolve, reject) => {
		fetch(`${URL}accounts/${number}/`).then((res) => {
			if (res.ok) resolve(res);
			else reject(res);
		});
	});
};

export const getAccounts = async (cpr) => {
	return new Promise((resolve, reject) => {
		fetch(`${URL}accounts/customer=${cpr}/`).then((res) => {
			if (res.ok) resolve(res);
			else reject(res);
		});
	});
};

export const getCustomer = async (cpr) => {
	return new Promise((resolve, reject) => {
		fetch(`${URL}customers/${cpr}/`).then((res) => {
			if (res.ok) resolve(res);
			else reject(res);
		});
	});
};

export const postCustomer = async (data) => {
	return new Promise((resolve, reject) => {
		fetch(`${URL}customers/`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		}).then((res) => {
			if (res.ok) resolve(res);
			else reject(res);
		});
	});
};
