async function modalMeal() {

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
                <h2>Criar Refeição:</h2>

                <form class="row g-3">

                    <div class="form-floating col-md-8">
                        <input type="text" class="form-control" id="mealName" placeholder="Feijoada Da Maria" required>
                        <label for="mealName" class="ps-4">
                            <span class="text-danger">*</span>
                            Nome da Refeição
                        </label>
                    </div>

                    <div class="form-floating col-md-4">
                        <input type="number" class="form-control" id="mealPrice" min="1" step="any" placeholder="250" required>
                        <label for="mealPrice" class="ps-4">
                            <span class="text-danger">*</span>
                            Preço Refeição (R$)
                        </label>
                    </div>

                </form>

            </div>
            <div class="modal-footer bg-light">
                <button type="button" class="btn btn-secondary btn-danger" data-bs-dismiss="modal">Cancelar</button>
                <button type="submit" class="btn btn-primary btn-success" data-bs-toggle="modal" onclick="saveMeal()">Salvar</button>
            </div>
            </div>
        </div>
    </div>
    `;

    var modal = new bootstrap.Modal(modalWrap.querySelector('.modal'));
    modal.show();

}

async function saveMeal() {

    const data = {
        name: document.querySelector('#mealName').value,
        price: document.querySelector('#mealPrice').value,
    }

    await post('meal', data)
    .then((response) => {
        sendToastSuccess('Refeição criada com êxito.');
    })
    pageRefeicoes();
}
