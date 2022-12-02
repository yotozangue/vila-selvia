async function getSuiteShow() {

    return new Promise(async (response) => {

        const suites = await get('suite');
        let resposta = '';

        const promise = suites.map(suite => {

            let photos = [];
            suite.photos.map(photo => {
                photos.push(`${base_url}/download/${photo}`);
            })

            resposta +=
                `
                <div class="accordion-item">
                    <h2 class="accordion-header" id="headingOne">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${suite._id}" aria-expanded="true" aria-controls="collapseOne">
                            ${suite.name}
                        </button>
                    </h2>
                    <div id="collapse${suite._id}" class="accordion-collapse collapse">
                        <div class="accordion-body">
                            <img src="${photos[0]}" class="img-thumbnail">
                            <h2>${suite.name}</h2>
                            <span>${suite.price}</span>
                            <button type="button" class="btn btn-warning" onclick="modalSuite('${suite._id}')">Editar</button>
                            <button type="button" class="btn btn-danger" onclick="deleteSuite('${suite._id}')">Deletar</button>
                        </div>
                    </div>
                </div>
                `
        })

        await Promise.all(promise);
        response(resposta);
    })

}

async function getReservationShow() {

    return new Promise(async (response) => {

        let resposta = '';
        const reservations = await get('reservation');

        const promise = reservations.map(async reservation => {
            const suite = await get('suite', reservation.suite_id);
            const photo = `${base_url}/download/${suite.photos[0]}`;
            const user = await get('admin/user', reservation.user_id);
            resposta +=
                `
                <div class="accordion-item">
                    <h2 class="accordion-header" id="headingOne">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${reservation._id}" aria-expanded="true" aria-controls="collapseOne">
                            R$ ${(reservation.price.toLocaleString('pt-BR', {string: 'currency', currency: 'BRL'}))} - ${suite.name}
                        </button>
                    </h2>
                    <div id="collapse${reservation._id}" class="accordion-collapse collapse">
                        <div class="accordion-body">
                            <img src="${photo}" class="img-thumbnail">
                            <h2>${suite.name}</h2>
                            <span>${suite.price}</span>
                            <h2>${user.firstname} ${user.lastname}</h2>
                            <span>${user.email}</span>
                        </div>
                    </div>
                </div>
                `

        })

        await Promise.all(promise);
        response(resposta);
    });

}

async function getUserShow() {

    return new Promise(async (response) => {
        let resposta = '';

        const users = await get('admin/users');
        const promise = users.map(async user => {
            resposta += userTr(user);
        })
        await Promise.all(promise);
        response(resposta);
    })
}

function userTr(user) {
    const checked = (user.admin) ? 'checked' : '';
    return `
    <tr id="${user._id}">
        <td class="align-middle">
            ${user.firstname} ${user.lastname}
        </td>
        <td class="align-middle">
            ${user.email}
        </td>
        <td class="align-middle text-center">
            <input
                type="checkbox"
                id="admin"
                class="form-check-input"
                ${checked}
                disabled>
        </td>
        <td class="align-middle">
            <button
                onclick="adminDelete('${user._id}')"
                id="btn1"
                class="btn btn-danger">
                    Delete
            </button>
            <button
                onclick="adminEdit('${user._id}')"
                id="btn2"
                class="btn btn-warning">
                    Edit
            </button>
        </td>
    </tr>
    `;
}


async function getMealShow() {

    return new Promise(async (response) => {

        let resposta = '';
        const meals = await get('meal');

        const promise = meals.map(meal => {
            resposta += mealTr(meal);
        })

        await Promise.all(promise);
        response(resposta);
    })

}

function mealTr(meal) {
    console.log(meal);
    return `
    <tr id="${meal._id}">
        <td class="align-middle">
            <input type="text" class="form-control" value="${meal.name}" disabled id="name">
        </td>
        <td class="align-middle">
            <input type="number" class="form-control" value="${(meal.price)}" step="any" disabled id="price">
        </td>
        <td class="align-middle">
            <button
                onclick="adminDelete('${meal._id}')"
                id="btn1"
                class="btn btn-danger">
                    Delete
            </button>
            <button
                onclick="adminEdit('${meal._id}')"
                id="btn2"
                class="btn btn-warning">
                    Edit
            </button>
        </td>
    </tr>
    `;
}


async function getAddons() {

    return new Promise(async (response) => {

        let resposta = '';
        const addons = await get('addons');

        const promise = addons.map(addon => {
            resposta += addonTr(addon);

        })

        await Promise.all(promise);
        response(resposta);
    })

}

function addonTr(addon) {
    return `
    <tr id="${addon._id}">
        <td class="align-middle">
            <input type="text" class="form-control" value="${addon.name}" disabled id="name">
        </td>
        <td class="align-middle">
            <input type="number" class="form-control" value="${(addon.price)}" disabled step="any" id="price">
        </td>
        <td class="align-middle">
            <button
                onclick="adminDelete('${addon._id}')"
                id="btn1"
                class="btn btn-danger">
                    Delete
            </button>
            <button
                onclick="adminEdit('${addon._id}')"
                id="btn2"
                class="btn btn-warning">
                    Edit
            </button>
        </td>
    </tr>
    `;
}
