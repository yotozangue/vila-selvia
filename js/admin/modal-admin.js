function showModalAdmin () {

    const modalWrap = document.createElement('div');
    modalWrap.innerHTML = `
        <div class="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content" id="modal-content">
                <div class="modal-header bg-light" id="modal-header">
                    <h5 class="modal-title">Aguarde</h5>
                    <div class="spinner-grow text-dark" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
                <div class="modal-body" id="modal-body">
                    <p>Estamos checando alguns dados.</p>
                    <div class="d-flex justify-content-center">

                    </div>
                </div>
            </div>
        </div>
        </div>
    `;

    document.body.append(modalWrap);

    const modal = new bootstrap.Modal(modalWrap.querySelector('.modal'));
    modal.show();

    setTimeout(() => {
        if(!user) {
            return modalNao();
        } else if(user.admin) {
            adminPage();
            return modalSim(modal);
        } else {
            return modalNao();
        }


    }, 3000)
}

function modalSim(modal) {
    document.querySelector('#modal-body').innerHTML = `
        <p>Perfeito! Conseguimos verificar o que precisavamos! &#x1F603</p>
        <p><b class="text-warning">ATENÇÃO:</b> Você está acessando o painel de Admin.</p>
    `;

    document.querySelector('#modal-header').innerHTML = `
        <h5 class="modal-title">Bem vindo de volta ${user.firstname}!</h5>
        <div class="spinner-grow text-success" type="button" role="status" data-bs-dismiss="modal" aria-label="Close">
            <span class="visually-hidden">Success...</span>
        </div>
    `;

    setTimeout(() => {
        modal.hide();
    }, 3000)
}

function modalNao() {
    document.querySelector('#modal-body').innerHTML = `
        <p>Essa página é reservada para os funcionários da Vila Selvia.</p>
        <p>Você será redirecionado em alguns segundos.</p>
    `;

    document.querySelector('#modal-header').innerHTML = `
        <h5 class="modal-title">ATENÇÃO</h5>
        <div class="spinner-grow text-danger" role="status">
            <span class="visually-hidden">Danger...</span>
        </div>
    `;
    setTimeout(() => {
        window.location = '/';
    }, 3000)
}
