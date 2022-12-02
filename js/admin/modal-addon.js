async function modalAddon() {

    let modalWrap = document.getElementById('modal');

    modalWrap.innerHTML =
    `
    <div class="modal fade" tabindex="-1" id="modal1">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
            <div class="modal-header bg-light">
                <h5 class="modal-title">Adicionar Nova Suite</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <h2>Criar Adicional:</h2>

                <form class="row g-3">

                    <div class="form-floating col-md-8">
                        <input type="text" class="form-control" id="addonName" placeholder="Translado" required>
                        <label for="addonName" class="ps-4">
                            <span class="text-danger">*</span>
                            Nome do Adicional
                        </label>
                    </div>

                    <div class="form-floating col-md-4">
                        <input type="number" class="form-control" id="addonPrice" min="1" step="any" placeholder="250" required>
                        <label for="addonPrice" class="ps-4">
                            <span class="text-danger">*</span>
                            Preço Adicional (R$)
                        </label>
                    </div>

                </form>

            </div>
            <div class="modal-footer bg-light">
                <button type="button" class="btn btn-secondary btn-danger" data-bs-dismiss="modal">Cancelar</button>
                <button type="submit" class="btn btn-primary btn-success" data-bs-toggle="modal" onclick="saveAddon()">Salvar</button>
            </div>
            </div>
        </div>
    </div>
    `;

    var modal = new bootstrap.Modal(modalWrap.querySelector('.modal'));
    modal.show();

}

async function saveAddon() {

    const data = {
        name: document.querySelector('#addonName').value,
        price: document.querySelector('#addonPrice').value,
    }

    await post('addons', data)
    .then((response) => {
        sendToastSuccess('Adicional criado com êxito.');
    })
    pageAdicionais();
}
