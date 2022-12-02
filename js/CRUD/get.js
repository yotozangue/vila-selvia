async function get(path, id) {

    const url = `${base_url}/${path}/${(!id ? '' : id)}`;
    const authorization = localStorage.getItem('authorization');
    const email = localStorage.getItem('email');

    const config = {
        headers: {
            authorization,
            email
        },
    }

    return new Promise((response, reject) => {

        axios.get(url, config)
        .then(async res => {
            response(res.data);
        })

    })
}
