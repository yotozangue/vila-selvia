async function modalSuite(id) {

    let modalWrap = document.getElementById('modal');
    if(id) {
        const suite = await get('suite', id);

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
                    <h2>Criar Suite:</h2>

                    <form class="row g-3">

                        <div class="form-floating col-md-8">
                            <input type="text" class="form-control" id="suiteNome" placeholder="Av da Virgínias" required value="${suite.name}">
                            <label for="suiteNome" class="ps-4">
                                <span class="text-danger">*</span>
                                Nome da Suite
                            </label>
                        </div>

                        <div class="form-floating col-md-4">
                            <input type="number" class="form-control" id="suiteDiaria" min="1" step="any" placeholder="250" required value="${suite.price}">
                            <label for="suiteDiaria" class="ps-4">
                                <span class="text-danger">*</span>
                                Valor Diária (R$)
                            </label>
                        </div>

                        <div class="form-floating col-md-3">
                            <input type="number" class="form-control" id="suiteTam" min="1" step="any" placeholder="4" required value="${suite.size}">
                            <label for="suiteTam" class="ps-4">
                                <span class="text-danger">*</span>
                                Tamanho (m²)
                            </label>
                        </div>

                        <div class="form-floating col-md-3">
                            <input type="number" class="form-control" id="suiteComodos" min="1" step="1" placeholder="4" required value="${suite.rooms}">
                            <label for="suiteComodos" class="ps-4">
                                <span class="text-danger">*</span>
                                Cômodos
                            </label>
                        </div>

                        <div class="form-floating col-md-3">
                            <input type="number" class="form-control" id="suiteBanheiros" min="1" step="1" placeholder="2" required value="${suite.bathrooms}">
                            <label for="suiteBanheiros" class="ps-4">
                                <span class="text-danger">*</span>
                                Banheiros
                            </label>
                        </div>

                        <div class="form-floating col-md-3">
                            <input type="number" class="form-control" id="suiteCamas" min="1" step="1" placeholder="4" required value="${suite.beds}">
                            <label for="suiteCamas" class="ps-4">
                                <span class="text-danger">*</span>
                                Camas
                            </label>
                        </div>

                        <div class="form-floating col-md-4">
                            <input type="number" class="form-control" id="suiteMaxPessoas" min="1" step="1" placeholder="4" required value="${suite.maximum_people}">
                            <label for="suiteMaxPessoas" class="ps-4">
                                <span class="text-danger">*</span>
                                Max Pessoas
                            </label>
                        </div>

                        <div class="form-floating col-md-4">
                            <input type="number" class="form-control" id="suiteMaxNoites" min="1" step="1" placeholder="365" required value="${suite.maximum_nights}">
                            <label for="suiteMaxNoites" class="ps-4">
                                <span class="text-danger">*</span>
                                Max Noites
                            </label>
                        </div>

                        <div class="form-floating col-md-4">
                            <input type="number" class="form-control" id="suiteMinNoites" min="1" step="1" placeholder="10" required value="${suite.minimal_nights}">
                            <label for="suiteMinNoites" class="ps-4">
                                <span class="text-danger">*</span>
                                Min Noites
                            </label>
                        </div>

                        <div class="form-floating col-md-12">
                            <textarea class="form-control" id="suiteDescricao" placeholder="2 Quartos, perfeito para a família..." required maxlength="100" style="height: 20vh;">${suite.description}</textarea>
                            <label for="suiteDescricao" class="ps-4">
                                <span class="text-danger">*</span>
                                Descrição Simples
                            </label>
                        </div>

                        <h3>Endereço </h3>


                        <div class="form-floating col-md-4">
                            <input type="text" class="form-control" id="suiteCep" maxlength="9" placeholder="08466-875" required required value="${suite.address.cep}" onfocusout="verifyCep()">
                            <label for="suiteCep" class="ps-4">
                                <span class="text-danger">*</span>
                                CEP
                            </label>
                        </div>

                        <div class="form-floating col-md-8">
                            <input type="text" class="form-control" id="suiteLogradouro" placeholder="1234 Main St" required value="${suite.address.address}">
                            <label for="suiteLogradouro" class="ps-4">
                                <span class="text-danger">*</span>
                                Logradouro
                            </label>
                        </div>

                        <div class="form-floating col-md-4">
                            <input type="number" class="form-control" id="suiteNumero" min="1" step="1" placeholder="1657" required value="${suite.address.number}">
                            <label for="suiteNumero" class="ps-4">
                                <span class="text-danger">*</span>
                                Número
                            </label>
                        </div>

                        <div class="form-floating col-md-4">
                            <input type="text" class="form-control" id="suiteCidade" placeholder="Alagoas" required value="${suite.address.city}">
                            <label for="suiteCidade" class="ps-4">
                                <span class="text-danger">*</span>
                                Cidade
                            </label>
                        </div>

                        <div class="form-floating col-md-4">

                            <select id="suiteEstado" class="form-select" required>
                                <option selected>${((!suite.address.state) ? 'Escolha...' : `${suite.address.state}`)}</option>
                                <option>SP</option>
                                <option>RJ</option>
                                <option>AL</option>
                            </select>

                            <label for="suiteEstado" class="ps-4">
                                <span class="text-danger">*</span>
                                Estado
                            </label>
                        </div>

                    </form>

                </div>
                <div class="modal-footer bg-light">
                    <button type="button" class="btn btn-secondary btn-danger" data-bs-dismiss="modal">Cancelar</button>
                    <button type="submit" class="btn btn-primary btn-success" data-bs-toggle="modal" onclick="updateSuite('${id}')">Continuar</button>
                </div>
                </div>
            </div>
        </div>
        `;

    } else {
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
                    <h2>Criar Suite:</h2>

                    <form class="row g-3">

                        <div class="form-floating col-md-8">
                            <input type="text" class="form-control" id="suiteNome" placeholder="Av da Virgínias" required>
                            <label for="suiteNome" class="ps-4">
                                <span class="text-danger">*</span>
                                Nome da Suite
                            </label>
                        </div>

                        <div class="form-floating col-md-4">
                            <input type="number" class="form-control" id="suiteDiaria" min="1" step="any" placeholder="250" required>
                            <label for="suiteDiaria" class="ps-4">
                                <span class="text-danger">*</span>
                                Valor Diária (R$)
                            </label>
                        </div>

                        <div class="form-floating col-md-3">
                            <input type="number" class="form-control" id="suiteTam" min="1" step="1" placeholder="4" required>
                            <label for="suiteTam" class="ps-4">
                                <span class="text-danger">*</span>
                                Tamanho (m²)
                            </label>
                        </div>

                        <div class="form-floating col-md-3">
                            <input type="number" class="form-control" id="suiteComodos" min="1" step="1" placeholder="4" required>
                            <label for="suiteComodos" class="ps-4">
                                <span class="text-danger">*</span>
                                Cômodos
                            </label>
                        </div>

                        <div class="form-floating col-md-3">
                            <input type="number" class="form-control" id="suiteBanheiros" min="1" step="1" placeholder="2" required>
                            <label for="suiteBanheiros" class="ps-4">
                                <span class="text-danger">*</span>
                                Banheiros
                            </label>
                        </div>

                        <div class="form-floating col-md-3">
                            <input type="number" class="form-control" id="suiteCamas" min="1" step="1" placeholder="4" required>
                            <label for="suiteCamas" class="ps-4">
                                <span class="text-danger">*</span>
                                Camas
                            </label>
                        </div>

                        <div class="form-floating col-md-4">
                            <input type="number" class="form-control" id="suiteMaxPessoas" min="1" step="1" placeholder="4" required>
                            <label for="suiteMaxPessoas" class="ps-4">
                                <span class="text-danger">*</span>
                                Max Pessoas
                            </label>
                        </div>

                        <div class="form-floating col-md-4">
                            <input type="number" class="form-control" id="suiteMaxNoites" min="1" step="1" placeholder="365" required>
                            <label for="suiteMaxNoites" class="ps-4">
                                <span class="text-danger">*</span>
                                Max Noites
                            </label>
                        </div>

                        <div class="form-floating col-md-4">
                            <input type="number" class="form-control" id="suiteMinNoites" min="1" step="1" placeholder="10" required>
                            <label for="suiteMinNoites" class="ps-4">
                                <span class="text-danger">*</span>
                                Min Noites
                            </label>
                        </div>

                        <div class="form-floating col-md-12">
                            <textarea class="form-control" id="suiteDescricao" placeholder="2 Quartos, perfeito para a família..." required maxlength="100" style="height: 20vh;"></textarea>
                            <label for="suiteDescricao" class="ps-4">
                                <span class="text-danger">*</span>
                                Descrição Simples
                            </label>
                        </div>

                        <h3>Endereço </h3>

                        <div class="form-floating col-md-4">
                            <input type="text" class="form-control" id="suiteCep" maxlength="9" placeholder="08466-875" required onfocusout="verifyCep()">
                            <label for="suiteCep" class="ps-4">
                                <span class="text-danger">*</span>
                                CEP
                            </label>
                        </div>

                        <div class="form-floating col-md-8">
                            <input type="text" class="form-control" id="suiteLogradouro" placeholder="1234 Main St" required>
                            <label for="suiteLogradouro" class="ps-4">
                                <span class="text-danger">*</span>
                                Logradouro
                            </label>
                        </div>

                        <div class="form-floating col-md-4">
                            <input type="number" class="form-control" id="suiteNumero" min="1" step="1" placeholder="1657" required>
                            <label for="suiteNumero" class="ps-4">
                                <span class="text-danger">*</span>
                                Número
                            </label>
                        </div>

                        <div class="form-floating col-md-4">
                            <input type="text" class="form-control" id="suiteCidade" placeholder="Alagoas">
                            <label for="suiteCidade" class="ps-4">
                                <span class="text-danger">*</span>
                                Cidade
                            </label>
                        </div>

                        <div class="form-floating col-md-4">

                            <select id="suiteEstado" class="form-select" required>
                                <option selected>Escolha...</option>
                                <option>SP</option>
                                <option>RJ</option>
                                <option>AL</option>
                            </select>

                            <label for="suiteEstado" class="ps-4">
                                <span class="text-danger">*</span>
                                Estado
                            </label>
                        </div>



                    </form>

                </div>
                <div class="modal-footer bg-light">
                    <button type="button" class="btn btn-secondary btn-danger" data-bs-dismiss="modal">Cancelar</button>
                    <button type="submit" class="btn btn-primary btn-success" data-bs-toggle="modal" onclick="saveSuite()">Continuar</button>
                </div>
                </div>
            </div>
        </div>
        `;
    }

    var modal = new bootstrap.Modal(modalWrap.querySelector('.modal'));
    modal.show();

}

function modalSuite2(suite) {

    const modalWrap = document.getElementById('modal');

    const authorization = localStorage.getItem('authorization');
    const email = localStorage.getItem('email');

    modalWrap.innerHTML =
    `
    <div class="modal fade" tabindex="-1" id="modal2">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header bg-light">
                    <h5 class="modal-title">Adicionar Nova Suite</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <div class="modal-body">

                    <div class="row g-3" id="form">
                        <h3>Descrição Detalhada:</h3>
                        <div class="form-floating col-md-12">
                            <textarea class="form-control" id="suiteDescricaoDatalhada" placeholder="2 Quartos, perfeito para a família..." maxlength="500" style="height: 30vh;">${((!suite.detailed_description) ? '' : `${suite.detailed_description}`)}</textarea>
                            <label for="suiteDescricaoDatalhada" class="ps-4">
                                <span class="text-danger">*</span>
                                Descrição Detalhada
                            </label>
                        </div>


                        <h3>Avaliações:</h3>
                        <div class="form-floating col-md-4">
                            <input type="number" class="form-control" id="suiteNota" placeholder="4,3" required value="${((!suite.avaliations) ? '' : `${suite.avaliations.rating}`)}">
                            <label for="suiteNota" class="ps-4">
                                    Nota Quarto
                            </label>
                        </div>

                        <div class="form-floating col-md-4">
                            <input type="text" class="form-control" id="suiteDescNota" placeholder="4,3" required value="${((!suite.avaliations) ? '' : `${suite.avaliations.type}`)}">
                            <label for="suiteDescNota" class="ps-4">
                                Descrição Nota
                            </label>
                        </div>

                        <div class="form-floating col-md-4">
                            <input type="number" class="form-control" id="suiteNotaQt" placeholder="500" required value="${((!suite.avaliations) ? '' : `${suite.avaliations.quantity}`)}">
                            <label for="suiteNotaQt" class="ps-4">
                                Quantidade de Avaliações
                            </label>
                        </div>


                        <h3>Fotos:</h3>
                        <form action="${base_url}/uploads/${suite._id}/${email}/${authorization}" method="post" enctype="multipart/form-data" target="_blank">
                            <div class="col-md-12">
                                <div class="mb-3">
                                    <input class="form-control" type="file" id="file1" name="file1">
                                </div>
                            </div>
                            <input type="submit" value="Enviar Foto" onclick="updatePhotos('${suite._id}')" class="btn btn-primary btn-success mb-4">
                        </form>

                        <div class="row ms-0" id="photo-area">

                        </div>
                    </div>
                </div>

                <div class="modal-footer bg-light">
                    <button type="button" onclick="pageSuites()" class="btn btn-secondary btn-danger" data-bs-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn btn-primary btn-success" data-bs-toggle="modal" onclick="updateSuite2('${suite._id}')">Salvar</button>
                </div>
            </div>
        </div>
    </div>
    `

    let modal = new bootstrap.Modal(modalWrap.querySelector('.modal'));
    modal.show();

    updatePhotos(suite._id);
}

async function updatePhotos(id) {

    setTimeout(async () => {
        const suite = await get('suite', id);
        doc = '';
        suite.photos.map(photo => {
            doc +=
            `
            <div class="col-md-4 mb-4">

                <button type="button" class="btn btn-danger position-absolute mt-2 ms-2"><i class="fa-sharp fa-solid fa-trash" onclick="deleteFoto('${photo}', '${suite._id}')"></i></button>

                <div style="background: url('${base_url}/download/${photo}') center/cover;height: 175px; width: 100%;">
                </div>
            </div>
            `
        })

        document.getElementById('photo-area').innerHTML = doc;
    }, 2500);

}



async function saveSuite() {

    const data = {
        name: document.getElementById('suiteNome').value,
        price: document.getElementById('suiteDiaria').value,
        rooms: document.getElementById('suiteComodos').value,
        bathrooms: document.getElementById('suiteBanheiros').value,
        beds: document.getElementById('suiteCamas').value,
        maximum_people: document.getElementById('suiteMaxPessoas').value,
        maximum_nights: document.getElementById('suiteMaxNoites').value,
        size: document.getElementById('suiteTam').value,
        minimal_nights: document.getElementById('suiteMinNoites').value,
        description: document.getElementById('suiteDescricao').value,
        address: {
            address: document.getElementById('suiteLogradouro').value,
            cep: document.getElementById('suiteCep').value,
            number: document.getElementById('suiteNumero').value,
            city: document.getElementById('suiteCidade').value,
            state: document.getElementById('suiteEstado')[document.getElementById('suiteEstado').selectedIndex].value
        }
    }

    await post('suite', data)
        .then((response) => {
            sendToastSuccess(`Quarto criado com sucesso!`);
            modalSuite2(response);
        })
        .catch((error) => {
            console.error(error);
            sendToastError(`Algum erro aconteceu, tente novamente ou entre em cotnato com o suporte.`);
        })

}

async function updateSuite(id) {

    const data = {
        name: document.getElementById('suiteNome').value,
        price: document.getElementById('suiteDiaria').value,
        rooms: document.getElementById('suiteComodos').value,
        bathrooms: document.getElementById('suiteBanheiros').value,
        beds: document.getElementById('suiteCamas').value,
        maximum_people: document.getElementById('suiteMaxPessoas').value,
        maximum_nights: document.getElementById('suiteMaxNoites').value,
        size: document.getElementById('suiteTam').value,
        minimal_nights: document.getElementById('suiteMinNoites').value,
        description: document.getElementById('suiteDescricao').value,
        address: {
            address: document.getElementById('suiteLogradouro').value,
            cep: document.getElementById('suiteCep').value,
            number: Number.parseInt(document.getElementById('suiteNumero').value),
            city: document.getElementById('suiteCidade').value,
            state: document.getElementById('suiteEstado')[document.getElementById('suiteEstado').selectedIndex].value
        }
    }

    await patch('suite', data, id)
        .then((response) => {
            sendToastSuccess(`Update com sucesso!`);
            modalSuite2(response);
        })
        .catch((error) => {
            sendToastError(`Algum erro aconteceu, tente novamente ou entre em cotnato com o suporte.`);
        })

}

async function deleteSuite(id) {
    await del('suite', id);
    pageSuites();
}

async function deleteFoto(id_photo, id_suite) {
    await del(`delete/${id_suite}`, id_photo);
    updatePhotos(id_suite);
}


async function updateSuite2(id) {
    const data = {
        detailed_description: document.querySelector('#suiteDescricaoDatalhada').value,
        avaliations: {
            type: document.querySelector('#suiteDescNota').value,
            quantity: Number.parseInt(document.querySelector('#suiteNotaQt').value),
            rating: document.querySelector('#suiteNota').value
        }
    }
    const suite = await patch('suite', data, id);

    if(!suite) {
        sendToastError('Ocorreu Algum Erro. Entre em contato com o suporte.')
    } else {
        sendToastSuccess('Dados Atualizados com Sucesso!')
    }

    pageSuites();
}

async function verifyCep() {

    const cep = document.getElementById('suiteCep').value;
    const url = `https://cdn.apicep.com/file/apicep/${cep}.json`;

    axios.get(url)
    .then(response => {
        const { address, city, state } = response.data;
        document.getElementById('suiteLogradouro').value = address; document.getElementById('suiteCidade').value = city;
        let i = document.getElementById('suiteEstado').selectedIndex;
        document.getElementById('suiteEstado')[i].value = state;
    })
    .catch(error => {

    })
}
