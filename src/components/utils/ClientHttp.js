const PUT = async (url, data) => {
	const res = await window.fetch(url, {
		method: 'PUT',
		headers: {
			'content-type': 'application/json'
		},
		body: JSON.stringify(data)
	})
	const DATA = await res.json();
	console.log(DATA);
	return DATA;
};

const DELETE = async (url, data) => {
	const res = await window.fetch(url, {
		method: 'DELETE',
		headers: {
			'content-type': 'application/json'
		},
		body: JSON.stringify(data)
	})
	const DATA = await res.json();
	console.log(DATA);
	return DATA;
};

export {
	PUT,
	DELETE
};

