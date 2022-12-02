function editUser(id) {

    // Edit Button
    const edit = getElementInsideContainer(id, 'edit');
    edit.setAttribute('onclick', 'adminSave()');
    edit.className = 'btn btn-success';
    edit.innerHTML = 'Save';

    // Cancel Button
    const cancel = getElementInsideContainer(id, 'delete');
    cancel.setAttribute('onclick', 'cancelEdit()');
    cancel.innerHTML = 'Cancel';
}

function getElementInsideContainer(containerId, childId) {
    let el;
    let els = document.getElementById(containerId).getElementsByTagName('*');

    for (let i = 0; i < els.length; i++) {
        if(els[i].id === childId) {
            el = els[i];
            break;
        }
    }
    return el;
}
