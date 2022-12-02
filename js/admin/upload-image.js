function adminUploadImage() {

    const url = `${base_url}/uploads/12345`

    const form = document.querySelector("#form");
    const formData = new FormData(form);
    console.log(form);
    console.log(formData);

    const authorization = localStorage.getItem('authorization');
    const email = localStorage.getItem('email');

    const config = {
        headers: {
            "Content-Type": "multipart/form-data",
            authorization,
            email
        },
    }

    axios.post(url, formData,config)
        .then(response => console.log(response));
}
