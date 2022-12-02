async function modalReservationInfo(id) {

    if(!id) throw new Error('No Suite ID.');

    let modalWrap = document.getElementById('modal');

    const suite = await get('suite', id);

    let photos = [];
    suite.photos.map(photo => {
        photos.push(`${base_url}/download/${photo}`);
    })

    modalWrap.innerHTML =
    `
    <div class="modal fade" tabindex="-1" id="modal1">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
            <div class="modal-header bg-light">
                <h5 class="modal-title">${suite.name}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">

                <h1 class="col-md-10"><img src="/images/logo-demo-green.png" alt="" width="15%" class="my-4"> Detalhes do Quarto</h1>

                <div class="row align-items-center">
                    <div class="col mx-auto text-center">
                        <img src="${photos[0]}" class="img-fluid rounded" style="width: 50%;"></img>
                    </div>
                </div>


                <h2 class="mt-3">${suite.name} - R$ ${(suite.price.toLocaleString('pt-BR', {string: 'currency', currency: 'BRL'}))}</h2>
                <p><b>DESCRIÇÃO: </b>${suite.description}</p>
                <p><b>CÔMODOS: </b>${suite.rooms}</p>
                <p><b>CAMAS: </b>${suite.beds}</p>
                <p><b>TAMANHO: </b>${suite.size}m²</p>
                <h3>ENDEREÇO: </h3>
                <p><b>LOGRADOURO: </b> ${suite.address.address}, ${suite.address.number} (${suite.address.city} - ${suite.address.state})</p>
                <p><b>CEP: </b> ${suite.address.cep}</p>

            </div>
            <div class="modal-footer bg-light">
                <button type="submit" class="btn btn-primary btn-success" data-bs-toggle="modal" onclick="modalReservation('${id}')">Reservar Agora</button>
            </div>
            </div>
        </div>
    </div>
    `;

    let modal = new bootstrap.Modal(modalWrap.querySelector('.modal'));
    modal.show();

}

async function modalReservation(id) {

    if(!user) return userNoLoginModal();

    if(!id) throw new Error('No Suite ID.');

    let modalWrap = document.getElementById('modal');

    const suite = await get('suite', id);


    let mealInput = '';
    let addonsInput = '';
    const meals = await get('meal');
    const addons = await get('addons');

    let promises = meals.map(meal => {
        mealInput +=
        `
            <input type="radio" class="form-check-input" id="reservationMeal" name="reservationMeal" value="${meal._id}">${meal.name} - R$ ${meal.price}<br>
        `;
    })

    await Promise.all(promises);

    promises = addons.map(addon => {
        addonsInput +=
        `
        <input class="form-check-input" type="checkbox" id="reservationAddons" value="${addon._id}">
        <label class="form-check-label" for="reservationAddons">
          ${addon.name} - R$ ${addon.price}
        </label><br>
        `
    })

    await Promise.all(promises);

    modalWrap.innerHTML =
    `
    <div class="modal fade" tabindex="-1" id="modal1">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
            <div class="modal-header bg-light">
                <h5 class="modal-title">Reservar ${suite.name}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">


                <h1 class="col-md-10"><img src="/images/logo-demo-green.png" alt="" width="15%" class="my-4"> Reservar Quarto</h1>

                <form class="row g-3">

                    <div class="col-md-4">
                        <label for="reservationNumHospedes">
                            <span class="text-danger">*</span>
                            Número de Hóspedes:
                        </label>

                        <input type="number" class="form-control" id="reservationNumHospedes" min="1" max="${suite.maximum_people}" step="any" value="1" required}">
                    </div>

                    <div class="col-md-4">
                        <label for="reservationDtStart">
                            <span class="text-danger">*</span>
                            Data Início:
                        </label>

                        <input type="date" class="form-control" id="reservationDtStart" required}">
                    </div>

                    <div class="col-md-4">
                        <label for="reservationDtEnd">
                            <span class="text-danger">*</span>
                            Data Fim:
                        </label>

                        <input type="date" class="form-control" id="reservationDtEnd" required}">
                    </div>

                    <div class="col-md-6">
                        <lavel for="reservationMeal">
                            <h3>Refeições:</h3>
                        </label>
                        ${mealInput}
                    </div>

                    <div class="col-md-6">
                        <lavel>
                            <h3>Adicionais:</h3>
                        </label>
                        ${addonsInput}
                    </div>

                <form>

                <div id="div"></div>

            </div>

            <div class="modal-footer bg-light">
                <button type="button" class="btn btn-primary btn-primary" onclick="calSuite('${id}')">Calcular</button>
                <button class="btn btn-primary btn-success" onclick="suiteNewReservation('${id}')">Reservar</button>
            </div>
        </div>
    </div>
    `;

    try {
        document.querySelectorAll('#reservationMeal')[0].checked = true;
    } catch (error) {
        console.error(error);
    }

    let modal = new bootstrap.Modal(modalWrap.querySelector('.modal'));
    modal.show();

}

async function suiteNewReservation(id) {

    let meals = [];
    let addons = [];


    for (let i = 0; i < document.querySelectorAll('#reservationMeal').length; i++) {
        const meal = document.querySelectorAll('#reservationMeal')[i];
        if(meal.checked) {
            meals.push(meal.value);
        }
    }

    for (let i = 0; i < document.querySelectorAll('#reservationAddons').length; i++) {
        const addon = document.querySelectorAll('#reservationAddons')[i];
        if(addon.checked) {
            addons.push(addon.value);
        }
    }

    const data = {
        user_id: user.id,
        start_date: document.querySelector('#reservationDtStart').value,
        end_date: document.querySelector('#reservationDtEnd').value,
        number_people: document.querySelector('#reservationNumHospedes').value,
        meal: meals,
        addons: addons
    }

    await post('reservation', data, id)
    .then(async response => {
        sendToastSuccess('Reserva Realizada com Sucesso!');
    })
    .catch(error => {
        console.error(error);
        sendToastError(error.response.data.error);
    })

}

async function calSuite(id) {

    let meals = [];
    let addons = [];


    for (let i = 0; i < document.querySelectorAll('#reservationMeal').length; i++) {
        const meal = document.querySelectorAll('#reservationMeal')[i];
        if(meal.checked) {
            meals.push(meal.value);
        }
    }

    for (let i = 0; i < document.querySelectorAll('#reservationAddons').length; i++) {
        const addon = document.querySelectorAll('#reservationAddons')[i];
        if(addon.checked) {
            addons.push(addon.value);
        }
    }

    const data = {
        user_id: user.id,
        start_date: document.querySelector('#reservationDtStart').value,
        end_date: document.querySelector('#reservationDtEnd').value,
        number_people: document.querySelector('#reservationNumHospedes').value,
        meal: meals,
        addons: addons
    }


    const div = document.querySelector('#div');

    // Set total days
    const time = new Date(data.end_date).getTime() - new Date(data.start_date).getTime();
    const days =  time / (1000 * 60 * 60 * 24);

    const suite = await get('suite', id);
    const meal = await get('meal', data.meal[0]);

    div.innerHTML =
    `
        <hr>
        <h3>Resumo</h3>
        <p><b>SUITE: </b>${suite.name} - ${data.number_people} Hóspedes - ${days} diárias</p>
        <p><b>${meal.name}: </b> ${meal.price} x ${data.number_people} (hóspedes) x ${days} (dias) = R$ ${(meal.price * data.number_people * days)}</p>
    `
    let addonsCont = 0;
    const promises = data.addons.map(async id => {
        const addon = await get('addons', id);
        div.innerHTML +=
        `<p><b>${addon.name}: </b> ${addon.price} x ${data.number_people} = R$ ${(addon.price * data.number_people)}</p>`
        addonsCont += addon.price * data.number_people;
    })

    await Promise.all(promises);

    div.innerHTML +=
    `
    <p><b>TOTAL = </b> R$ ${((suite.price*days)+(meal.price * data.number_people * days)+(addonsCont)).toLocaleString('pt-BR', {string: 'currency', currency: 'BRL'})}</p>
    `

}

function userNoLoginModal() {

    let modalWrap = document.getElementById('modal');

    modalWrap.innerHTML =
    `
    <div class="modal fade" tabindex="-1" id="modal1">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
            <div class="modal-header bg-light">
                <h5 class="modal-title">Você não está logado(a)!</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">

                <h2>Você tem registro no site?</h2>
                <p>Não conseguimos localizar a sua conta. Caso você ainda não tem uma, se cadastre! É simples e rápido.</p>
            </div>
            <div class="modal-footer bg-light">
                <a class="btn btn-primary btn-success" href="/pages/login.html">Logar</a>
                <a class="btn btn-primary btn-success" href="/pages/signup.html">Cadastrar</a>
            </div>
        </div>
    </div>
    `;

    let modal = new bootstrap.Modal(modalWrap.querySelector('.modal'));
    modal.show();
}
