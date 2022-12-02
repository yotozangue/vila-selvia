function userEdit() {

    /* Allow Modify */
    document.getElementById('firstname').disabled = false;

    document.getElementById('lastname').disabled = false;

    document.getElementById('email').disabled = false;


    /* Change Buttons */

    // Edit Button
    const edit =  document.getElementById('btn1');
    edit.setAttribute('onclick', `userSaveEdit()`);
    edit.className = 'btn btn-success';
    edit.innerHTML = 'Save';

    // Cancel Button
    const cancel = document.getElementById('btn2');
    cancel.setAttribute('onclick', `userCancelEdit()`);
    cancel.innerHTML = 'Cancel';

}
