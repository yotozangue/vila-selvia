let user;

async function startSection() {

    const url = `${base_url}/user`;
    const authorization = localStorage.getItem('authorization');
    const email = localStorage.getItem('email');

    if(!email) {
        customNav();
        throw new Error('No login.')
    }

    const config = {
        headers: {
            authorization,
            email
        },
    }

    await axios.get(url, config)
    .then((response) => {
        user = {
            id: response.data._id,
            firstname: response.data.firstname,
            lastname: response.data.lastname,
            email: response.data.email,
            admin: response.data.admin,
        };
        localStorage.setItem('name', `${user.firstname} ${user.lastname}`);
        localStorage.setItem('admin', user.admin);
    })
    .catch((error) => {
        console.log('ERRRRO');
        console.error(error)
        logout();
    });
    customNav();

}
