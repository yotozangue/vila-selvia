function changeUserPass() {

    const newPass = document.querySelector('#newPass').value;
    const newPassConf = document.querySelector('#newPassConf').value;
    const oldPass = document.querySelector('#oldPass').value;

    const url = `${base_url}/user/pass`;
    const authorization = localStorage.getItem('authorization');
    const email = localStorage.getItem('email');

    const config = {
        headers: {
            authorization,
            email
        },
    }

    const data = {
        newpass: newPass,
        oldpass: oldPass
    };

    if(newPass === newPassConf) {

        if(newPass.length < 8) {
            sendToastError('New Password Short. Minimum 8 characters.');
        } else {
            axios.patch(url, data, config)
            .then((response) => {
                sendToastSuccess(response.data.msg);

                setTimeout(() => {
                    pageInfo();
                }, 1000)
            })
            .catch((error) => {
                sendToastError(error.response.data.Error);
            });
        }


    } else {
        sendToastError('Non-identical passwords.');
    }

}


