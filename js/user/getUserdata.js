function getUserData() {
    const url = `${base_url}/user/`;
    const authorization = localStorage.getItem('authorization');
    const email = localStorage.getItem('email');

    const config = {
        headers: {
            authorization,
            email
        },
    }


    axios.get(url, config)
        .then((response) => {
            console.log(response.data);
            const user = {
                id: response.data._id,
                firstname: response.data.firstname,
                lastname: response.data.lastname,
                email: response.data.email,
                password: response.data.password,
                admin: response.data.admin
            };

            const panel = document.getElementById('panel');

            panel.innerHTML = `
            <p><b>ID:</b> ${user.id}</p>
            <p><b>NAME:</b> ${user.firstname} ${user.lastname}</p>
            <p><b>EMAIL:</b> ${user.email}</p>
            <p><b>ADMIN:</b> ${user.admin}</p>
            <p><b>HASH:</b> ${user.password}</p>
            <button
            type="submit"
            onclick="logout()"
            class="btn btn-danger">
            Logout
            </button>
            `;

            const userwelcome = document.getElementById('userwelcome');
            userwelcome.innerHTML = `Hello ${user.firstname}!`;
        })
}