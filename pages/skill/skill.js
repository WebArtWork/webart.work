const validateUrl = function (url) {
	var res = url.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
	return (res !== null)
}
console.log('we');
const downvote = _id => {
	fetch('/api/article/down', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ _id })
	}).then(response => response.json()).then(data => {
		document.getElementById('votes' + _id).innerHTML = data;
	}).catch((error) => {
		console.error('Error:', error);
	});
}
const upvote = _id => {
	fetch('/api/article/up', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ _id })
	}).then(response => response.json()).then(data => {
		document.getElementById('votes' + _id).innerHTML = data;
	}).catch((error) => {
		console.error('Error:', error);
	});
}
document.getElementById('form').addEventListener('submit', event => {
	event.preventDefault();
	if (!document.getElementById('name').value) {
		alert('please fill name');
	}
	const link = document.getElementById('link').value;
	if (!validateUrl(link)) {
		alert('please fill url correctly');
	}
	if (!document.getElementById('comment').value) {
		alert('please fill comment');
	}
	fetch('/api/article/create', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			page: window.location.pathname.replace('/lib/', ''),
			language: document.getElementById('language').value,
			comment: document.getElementById('comment').value,
			name: document.getElementById('name').value,
			link: link
		})
	}).then(response => response.json()).then(data => {
		location.reload();
	}).catch((error) => {
		console.error('Error:', error);
	});
});
var on_form_change = function () {
	if (!document.getElementById('name').value) {
		return document.getElementById('button').classList.add('disabled');
	}
	const link = document.getElementById('link').value;
	if (!validateUrl(link)) {
		return document.getElementById('button').classList.add('disabled');
	}
	if (!document.getElementById('comment').value) {
		return document.getElementById('button').classList.add('disabled');
	}
	document.getElementById('button').classList.remove('disabled');
}
document.getElementById('name').addEventListener('input', on_form_change);
document.getElementById('link').addEventListener('input', on_form_change);
document.getElementById('comment').addEventListener('input', on_form_change);
