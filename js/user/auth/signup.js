async function signup() {

    const firstname = document.querySelector('#firstname');
    const lastname = document.querySelector('#lastname');
    const email = document.querySelector('#email');
    const password = document.querySelector('#password');

    const url = `${base_url}/auth/signup`;

    const data = {
        firstname: firstname.value,
        lastname: lastname.value,
        email: email.value,
        password: password.value
    };

    axios.post(url, data)
    .then((response) => {
        login();
    });

}
