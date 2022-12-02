function adminPage() {

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

                        <button type="button" class="list-group-item list-group-item-action" id="reservas" onclick="pageReservas()">
                            Reservas
                        </button>

                        <button type="button" class="list-group-item list-group-item-action" id="suites" onclick="pageSuites()">
                            Suites
                        </button>

                        <button type="button" class="list-group-item list-group-item-action" id="refeicoes" onclick="pageRefeicoes()">
                            Refeições
                        </button>

                        <button type="button" class="list-group-item list-group-item-action" id="adicionais" onclick="pageAdicionais()">
                            Adicionais
                        </button>

                        <button type="button" class="list-group-item list-group-item-action" id="users" onclick="pageUsers()">
                            Usuários
                        </button>

                        <button type="button" class="list-group-item list-group-item-action" disabled>
                            Gráficos
                        </button>
                    </div>
                </div>

                <div class="col-md" id="content">
                </div>
            </div>
        </div>
    </div>
    `
    pageHome();
}

function clear() {
    document.getElementById("home").classList.remove('active');
    document.getElementById("reservas").classList.remove('active');
    document.getElementById("suites").classList.remove('active');
    document.getElementById("refeicoes").classList.remove('active');
    document.getElementById("adicionais").classList.remove('active');
    document.getElementById("users").classList.remove('active');
}


function pageHome() {
    clear();
    document.getElementById("home").classList.add('active');

    const content = document.querySelector('#content');

    content.innerHTML =
        `
        <h1>Seja bem vindo ao seu painel!</h1>
        <p>Aqui você pode realizar algumas tarefas para administrar a Empresa. Tome cuidado, pois qualquer alteração que você fizer pode causar prejuízos enormes. Aproveite! &#x1F917</p>
        <div class="row align-items-center">
            <div class="col mx-auto text-center">
                <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fthumbs.gfycat.com%2FEveryUnrulyBabirusa-size_restricted.gif&f=1&nofb=1&ipt=e6af419abcd58b2d475749afa1b7acd6453257778c619a39d07e79d94afced46&ipo=images" class="img-fluid rounded"></img>
            </div>
        </div>

        <h2 class="mt-2">O que você <mark style="background-color: green; color: white;">pode</mark> fazer</h2>
        <p>Usar os recursos de administrador para criar, deletar, modificar e atribuir suítes para o nosso catálogo.</p>
        <p>Além de poder adicionar novos serviços extras e ter controle sobre a lista de usuários, cujo você pode modificar e excluir as contas.</p>

        <h2>O que você <mark style="background-color: #b10808; color: white;">não pode</mark> fazer</h2>
        <p>Infelizmente, graças a administração do tempo utilizado para o desenvolvimento do site, o administrador é incapaz de criar, editar, deletar ou atribuir gráficos ao sistema. Isto por enquanto é uma função em desenvolvimento.</p>
        <p>Você não deve em circunstâncias comuns, alterar os dados de usuários sem a permissão do próprio usuário, e abusar do poder de administrador pode fazer com que você seja removido da lista de administradores.</p>
        `;
}

async function pageReservas() {
    clear();
    document.getElementById("reservas").classList.add('active');

    const content = document.querySelector('#content');
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

async function pageSuites() {
    clear();
    document.getElementById("suites").classList.add('active');

    const content = document.querySelector('#content');
    const suites = await getSuiteShow();

    content.innerHTML =
        `
        <h1>Suites</h1>
        <p>Aqui você pode editar informações das nossas suites.</p>
        <button type="button" onclick="modalSuite()" class="btn btn-success mb-4">Nova Suite</button>

        <div class="accordion" id="accordionSuites">
            ${suites}
        </div>
        `
}

async function pageRefeicoes() {
    clear();
    sessionStorage.setItem('status', '2');
    sessionStorage.setItem('inputs', `name,price`);
    document.getElementById("refeicoes").classList.add('active');

    const content = document.querySelector('#content');
    const meals = await getMealShow();
    content.innerHTML =
        `
        <h1>Refeições</h1>

        <button type="button" onclick="modalMeal()" class="btn btn-success mb-4">Nova Refeição</button>

        <table class="table table-responsive table-striped " id="table">
            <thead>
                <tr>
                    <th scope="col" class="col-6">NOME</th>
                    <th scope="col" class="col-2">VALOR</th>
                    <th scope="col" class="col-4">AÇÕES</th>
                </tr>
            </thead>
            <tbody id="container">
                ${meals}
            </tbody>
        </table>
        `
        tableSize();

}

async function pageAdicionais() {
    clear();
    sessionStorage.setItem('status', '3');
    sessionStorage.setItem('inputs', `name,price`);
    document.getElementById("adicionais").classList.add('active');

    const content = document.querySelector('#content');
    const addons = await getAddons();

    content.innerHTML =
        `
        <h1>Adicionais</h1>

        <button type="button" onclick="modalAddon()" class="btn btn-success mb-4">Novo Adicional</button>

        <table class="table table-responsive table-striped " id="table">
            <thead>
                <tr>
                    <th scope="col" class="col-6">NOME</th>
                    <th scope="col" class="col-2">VALOR</th>
                    <th scope="col" class="col-4">AÇÕES</th>
                </tr>
            </thead>
            <tbody id="container">
                ${addons}
            </tbody>
        </table>
        `
        tableSize();
}

async function pageUsers() {
    clear();
    sessionStorage.setItem('status', '1');
    sessionStorage.setItem('inputs', `admin`);
    document.getElementById("users").classList.add('active');

    const content = document.querySelector('#content');
    const users = await getUserShow();
    content.innerHTML =
        `
        <h1>Usuários</h1>

        <table class="table table-responsive table-striped " id="table">
            <thead>
                <tr>
                    <th scope="col">NOME</th>
                    <th scope="col">EMAIL</th>
                    <th scope="col">ADMIN</th>
                    <th scope="col">AÇÕES</th>
                </tr>
            </thead>
            <tbody id="container">
                ${users}
            </tbody>
        </table>
        `
        tableSize();
}


function tableSize() {
    if (window.innerWidth < 768) {
        if(document.getElementById('table'))
            document.getElementById('table').style.display = 'block';
    } else {
        if(document.getElementById('table'))
            document.getElementById('table').style.display = 'table';
    }
}

window.onload = startSection;
window.onresize = tableSize;

function reloadEl(patch, id, trFunc) {
    get(patch, id)
        .then(response => {
            const container = document.getElementById(response._id);
            const tr = trFunc(response);
            container.innerHTML = tr;
        })

}
