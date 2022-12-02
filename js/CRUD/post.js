async function post(path, data, id) {

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

        axios.post(url, data, config)
        .then(async res => {
            response(res.data);
        })
        .catch(error => {
            reject(error)
        })

    })

}