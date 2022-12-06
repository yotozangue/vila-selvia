function userPage() {

    const body = document.querySelector('#body');

    body.innerHTML = `
    <div class="container">
        <div class="card card-body p-5 my-4">
            <div class="row">

                <div class="col-md-3">

                    <div class="list-group">
                        <button type="button" class="list-group-item list-group-item-action active" aria-current="true" id="home" onclick="pageHome()">
                            Inicio
                        </button>

                        <button type="button" class="list-group-item list-group-item-action" id="info" onclick="pageInfo()">
                            Info
                        </button>

                        <button type="button" class="list-group-item list-group-item-action" id="changePassword" onclick="pageChangePassword()">
                            Change Password
                        </button>

                        <button type="button" class="list-group-item list-group-item-action" id="reservas" onclick="pageReservas()">
                            Reservas
                        </button>
                    </div>
                </div>

                <div class="col-md-9" id="content">
                </div>
            </div>
        </div>
    </div>
    `
    pageHome();
}

function clear() {
    document.getElementById("home").classList.remove('active');
    document.getElementById("info").classList.remove('active');
    document.getElementById("changePassword").classList.remove('active');
    document.getElementById("reservas").classList.remove('active');
}

function pageHome() {

    clear();
    document.getElementById("home").classList.add('active');

    let content = document.getElementById('content');

    content.innerHTML =
    `
    <div>
        <h1>Seja bem vindo ao seu painel!</h1>
        <p>Aqui você pode verificar e alterar os seus próprios dados! Fique tranquilo, qualquer mudança pode ser refeita e incentivamos você a deixar a sua conta mais segura possível. Aproveite! &#x1F917</p>
    </div>
    `

}


async function pageInfo() {
    clear();
    document.getElementById("info").classList.add('active');

    let content = document.getElementById('content');

    let user2 = await get('user');

    content.innerHTML =
        `
        <div id="panel">
            <p><b>NOME:</b>
            </p><div class="input-group mb-3">
                <input type="text" class="form-control" id="firstname" placeholder="Firstname" value="${user2.firstname}" disabled="">

                <input type="text" class="form-control" id="lastname" placeholder="Lastname" value="${user2.lastname}" disabled="">
            </div><p></p>
            <p><b>EMAIL:</b>
                <input type="email" class="form-control" id="email" placeholder="Email" value="${user2.email}" disabled="">
            </p>

            <div class="row">
                <div class="col">
                    <div class="float-end">
                        <button type="submit" onclick="userEdit()" id="btn1" class="btn btn-warning text-right">
                            Editar
                        </button>
                        <button type="submit" onclick="cancel()" id="btn2" class="btn btn-danger text-right">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>

            </div>
        </div>
        `

}

function pageChangePassword() {

    clear();
    document.getElementById("changePassword").classList.add('active');

    let content = document.getElementById('content');

    content.innerHTML =
    `
    <div>
        <h1>Esta é a SUA SENHA! &#x1F917</h1>
        <p>Sempre a deixe o mais segura possível!</p>

        <p><b>Nova Senha:</b>
        <input
            type="password"
            class="form-control"
            id="newPass"
            placeholder="Nova Senha">
        </p>
        <p><b>Reescreva Nova Senha:</b>
        <input
            type="password"
            class="form-control"
            id="newPassConf"
            placeholder="Reescreva Nova Senha">
        </p>
        <p><b>Senha Antiga:</b>
        <input
            type="password"
            class="form-control"
            id="oldPass"
            placeholder="Senha Antiga">
        </p>

        <div class="row">
            <div class="col"></div>
        <div class="col">
            <div class="float-end">
                <button
                    type="submit"
                    onclick="changeUserPass()"
                    id="btn1"
                    class="btn btn-success">
                    Salvar
                </button>
                    <button
                        type="submit"
                        onclick="getUserData()"
                        id="btn2"
                        class="btn btn-danger">
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    </div>
    `

}

async function pageReservas() {
    clear();
    document.getElementById("reservas").classList.add('active');

    let content = document.getElementById('content');
    const reservas = await getReservationShow();

    content.innerHTML =
    `
    <h1>Reservas</h1>
    <p>Aqui você pode editar informações das nossas suites.</p>

    <div class="accordion" id="accordionReservas">
        ${reservas}
    </div>
    `
}

async function getReservationShow() {

    return new Promise(async (response) => {

        let resposta = '';
        const reservations = await get('reservation/user/teste');

        const promise = reservations.map(async reservation => {


            let warn = '';
            let button = '';

            switch(reservation.status) {
                case 0:
                    warn =
                    `
                    <span class="ms-1">
                        <mark style="background-color: #e5a42b;">
                            Aguardando Pagamento
                        </mark>
                    </span>
                    `
                    button =
                    `
                    <button type="button" onclick="confPagto('${reservation._id}')" class="btn btn-success">Confirmar Pagamento</button>
                    <button type="button" onclick="cancelReservation('${reservation._id}')" class="btn btn-danger">Cancelar Reserva</button>
                    `
                    break;
                case 2:
                    warn =
                    `
                    <span class="ms-1">
                        <mark style="background-color: green; color: white;">
                            Pagamento Confirmado
                        </mark>
                    </span>
                    `
                    button =
                    `
                    <button type="button" onclick="cancelReservation('${reservation._id}')" class="btn btn-danger">Cancelar Reservar</button>
                    `
                    break;
                case 3:
                    warn =
                    `
                    <span class="ms-1">
                        <mark style="background-color: #bd3f3f; color: white;">
                            Reserva Cancelada
                        </mark>
                    </span>
                    `
            }

            const suite = await get('suite', reservation.suite_id);
            const photo = `${base_url}/download/${suite.photos[0]}`;
            resposta +=
                `
                <div class="accordion-item">
                    <h2 class="accordion-header" id="headingOne">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${reservation._id}" aria-expanded="true" aria-controls="collapseOne">
                            R$ ${(reservation.price.toLocaleString('pt-BR', {string: 'currency', currency: 'BRL'}))} - ${suite.name} - ${warn}
                        </button>
                    </h2>
                    <div id="collapse${reservation._id}" class="accordion-collapse collapse">
                        <div class="accordion-body">
                            <img src="${photo}" class="img-thumbnail">
                            <h2>${suite.name}</h2>
                            <span>${suite.price}</span>
                            <h2>${user.firstname} ${user.lastname}</h2>
                            <span>${user.email}</span>
                            <br>
                            ${button}
                        </div>
                    </div>
                </div>
                `

        })

        await Promise.all(promise);
        response(resposta);
    });

}

async function confPagto(id) {
    await get(`reservation/${id}/change/2`)
    .then(response => {
        sendToastSuccess('Pagamento Confirmado!')
        pageReservas();
    })
    .catch(error => {
        console.error(error);
        sendToastError('Aconteceu algum erro. Entre em contato com o suporte.')
    })
}


async function cancelReservation(id) {
    await get(`reservation/${id}/change/3`)
    .then(response => {
        sendToastSuccess('Reserva Cancelada.')
        pageReservas();
    })
    .catch(error => {
        console.error(error);
        sendToastError('Aconteceu algum erro. Entre em contato com o suporte.')
    })
}
