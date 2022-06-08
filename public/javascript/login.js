async function signupFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    // As you can see in the code, we added a conditional to make sure that all fields have values before making the POST request.

    // Although adding this level of client-side validation is helpful, this is just one step of many that a company can take to act against malformed or malicious requests. At many companies, developers go to exhaustive lengths to make sure that the data being POSTed to the server is proper.
    if (username && email && password) {
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                username,
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        // check the response status
        if (response.ok) {
            console.log('success');
        } else {
            alert(response.statusText);
        }
    }
}

async function loginFormHandler(event) {
    event.preventDefault();

    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    // As you can see in the code, we added a conditional to make sure that all fields have values before making the POST request.

    // Although adding this level of client-side validation is helpful, this is just one step of many that a company can take to act against malformed or malicious requests. At many companies, developers go to exhaustive lengths to make sure that the data being POSTed to the server is proper.
    if (email && password) {
        const response = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        // check the response status
        if (response.ok) {
            document.location.replace('/');
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);

// left at 14.2.5