async function userSaveEdit() {

    const newFirstname = document.querySelector('#firstname').value;
    const newLastname = document.querySelector('#lastname').value;
    const newEmail = document.querySelector('#email').value;

    const data = {
        firstname: newFirstname,
        lastname: newLastname,
        email: newEmail,
    };

    await patch('user', data);
    pageInfo();
    
}
