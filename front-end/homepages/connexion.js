var form = document.getElementById("loginForm");

function login() {
    console.log("je subm2");

    const request = new Request('http://localhost:8000/api/login.js', {
        method: 'POST',
        body: JSON.stringify({"mail": form.mail.value, "username": form.username.value, "password": form.password.value}),
        headers: {
            'Content-Type': 'text/plain'
        }
    });

    fetch(request)
        .then(res => res.text())
        .then(text => console.log(text))
        .catch(error => console.error(error));
}