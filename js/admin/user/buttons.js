function adminEdit(id) {

    let inputs = sessionStorage.getItem('inputs').split(',');

    // Allow Modify
    inputs.map(input => {
        const at = getElementInsideContainer(id, input);
        at.disabled = false;
    })

    /* Change Buttons */

    // Cancel Button
    const btn1 = getElementInsideContainer(id, 'btn1');
    btn1.setAttribute('onclick', `adminCancelEdit('${id}')`);
    btn1.innerHTML = 'Cancel';

    // Edit Button
    const btn2 = getElementInsideContainer(id, 'btn2');
    btn2.setAttribute('onclick', `adminSaveEdit('${id}')`);
    btn2.className = 'btn btn-success';
    btn2.innerHTML = 'Save';


}


function adminCancelEdit(id) {

    let inputs = sessionStorage.getItem('inputs').split(',');

    // Block Modify
    inputs.map(input => {
        const at = getElementInsideContainer(id, input);
        at.disabled = true;
    })

    const status = Number.parseInt(sessionStorage.getItem('status'));

    switch(status) {
        case 1:
            reloadEl('admin/user', id, userTr);
            break;
        case 2:
            reloadEl('meal', id, mealTr);
            break;
        case 3:
            reloadEl('addons', id, addonTr)
            break;
    }

    /* Change Buttons */

    // Cancel Button
    const btn1 = getElementInsideContainer(id, 'btn1');
    btn1.setAttribute('onclick', `adminDelete('${id}')`);
    btn1.innerHTML = 'Delete';

    // Edit Button
    const btn2 = getElementInsideContainer(id, 'btn2');
    btn2.setAttribute('onclick', `adminEdit('${id}')`);
    btn2.className = 'btn btn-warning';
    btn2.innerHTML = 'Edit';
}

async function adminSaveEdit(id) {

    let inputs = sessionStorage.getItem('inputs').split(',');
    let values = [];

    inputs.map(input => {
        values.push((getElementInsideContainer(id, input)).value);
    })

    const data = Object.fromEntries(
        inputs.map((input, i) => ([input, values[i]]))
    );


    const status = Number.parseInt(sessionStorage.getItem('status'));

    switch(status) {
        case 1:
            patch('admin/user', { admin: (getElementInsideContainer(id, inputs[0]).checked) }, id);
            break;
        case 2:
            await patch('meal', data, id);
            break;
        case 3:
            await patch('addons', data, id)
            break;
    }

    return adminCancelEdit(id);

}


async function adminDelete(id) {

    const status = Number.parseInt(sessionStorage.getItem('status'));

    switch(status) {
        case 1:
            await del('admin/user', id);
            pageUsers();
            break;
        case 2:
            await del('meal', id);
            pageRefeicoes();
            break;
        case 3:
            await del('addons', id)
            pageAdicionais();
            break;
    }

    return adminCancelEdit(id);
}
