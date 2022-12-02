function login() {

    const email = document.querySelector('#email');
    const password = document.querySelector('#password');

    const url = `${base_url}/auth/login`;

    const data = {
        email: email.value,
        password: password.value
    };

    axios.post(url, data)
    .then(async (response) => {
        const { token } = response.data;
        localStorage.setItem("authorization", token);
        localStorage.setItem("email", email.value);

        await startSection();
        sendToastSuccess('Success!');
        window.location = '/pages/suites.html';
    })
    .catch((error) => {
        sendToastError('Email or Password invalid.');
    })

}
