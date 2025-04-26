const inputs = document.querySelectorAll(".input");


function addcl() {
	let parent = this.parentNode.parentNode;
	parent.classList.add("focus");
}

function remcl() {
	let parent = this.parentNode.parentNode;
	if (this.value == "") {
		parent.classList.remove("focus");
	}
}


inputs.forEach(input => {
	input.addEventListener("focus", addcl);
	input.addEventListener("blur", remcl);
});

//login function

const form = document.querySelector('form');
const usernameError = document.querySelector('.username.error');
const passwordError = document.querySelector('.password.error'); // Add error display for password if needed

form.addEventListener('submit', async (e) => {
	e.preventDefault();

	// reset error messages
	usernameError.textContent = '';
	passwordError.textContent = '';

	// collect form data
	const username = form.querySelector('input[type="text"]').value; // Username input value
	const password = form.querySelector('input[type="password"]').value; // Password input value

	console.log({ username, password });

	try {
		const res = await fetch('/admin/login', {
			method: 'POST',
			body: JSON.stringify({ username, password }),
			headers: { 'Content-Type': 'application/json' }
		});

		const data = await res.json();
		console.log(data.errors);

		if (data.user) {
			// redirect to the specific role's dashboard
			location.assign(`/admin/dashboard`);
		}

		if (data.errors) {
			if(data.errors.email)
			usernameError.textContent = "incorrect username"
			passwordError.textContent = data.errors.password;
		}
	} catch (err) {
	console.log(err);
}
});
