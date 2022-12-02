async function getContent() {

    addSuitePlaceholder(12);
    const url = `${base_url}/suite`;

    axios.get(url)
    .then(response => {

        const suites = response.data;

        document.querySelector(`#card-container`).innerHTML = '';
        const promises = suites.map(suite => {
            console.log(suite);
            let photos = [];

            suite.photos.map(photo => {
                photos.push(`${base_url}/download/${photo}`);
            })
            newCard(suite)
            addPhotos(suite._id, photos)
            addSlideButtons(suite);
        })

    });
}

function addPhotos(container, links) {
    const id = getElementInsideContainer(container, 'photos-area');

    for (let i = 0; i < links.length; i++) {
        const link = links[i];
        console.log(id);
        console.log(link)

        if(i == 0) {
            id.innerHTML += `
            <div class="carousel-item active" data-bs-interval="2000">
                <div class="media-card" style="background: url('${link}') center/cover;">
                </div>
            </div>`
        } else {
            id.innerHTML += `
            <div class="carousel-item" data-bs-interval="2000">
                <div class="media-card" style="background: url('${link}') center/cover;">
                </div>
            </div>`
        }


    }

}

function newCard(suite) {
    const id = document.querySelector(`#card-container`);

    id.innerHTML +=
    `
    <div class="card" id="${suite._id}">
        <div class="media-card" onclick="modalReservationInfo('${suite._id}')">
            <div id="card${suite._id}" class="carousel slide" data-bs-ride="true">
                <div class="carousel-indicators" id="slide-button-area">

                </div>
                <div class="carousel-inner" id="photos-area">

                </div>
            </div>
        </div>
        <div class="top-card" onclick="modalReservationInfo('${suite._id}')">
            <h4>${suite.name}</h4>

            <span class="review-score-badge" aria-label="Com nota 4,8">${((!suite.avaliations) ? '5.0' : `${suite.avaliations.rating}`)}</span>
            <span aria-label="Avaliação fabuloso">
                ${((!suite.avaliations) ? 'Sem ranking' : `${suite.avaliations.type}`)}
            </span>
            <span aria-label="de 436 avaliações">
                • ${((!suite.avaliations) ? '0' : `${suite.avaliations.quantity}`)} avaliações
            </span><br>
            <span class="description-text">
            ${suite.description}
            </span>
        </div>
        <div class="d-grid gap-2 my-4 px-2">
            <input type="button" value="Reservar" class="btn btn-primary" onclick="modalReservation('${suite._id}')">
        </div>
    </div>
    `;
    const carousel = new bootstrap.Carousel(`#card${suite._id}`);
}


function addSlideButtons(suite) {

    const id = getElementInsideContainer(`card${suite._id}`, 'slide-button-area');

    for (let i = 0; i < suite.photos.length; i++) {

        if(suite.photos.length == 1) break;

        if (i == 0) {
            id.innerHTML += `
            <button type="button" data-bs-target="#card${suite._id}" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
        `
        } else {
            id.innerHTML += `
            <button type="button" data-bs-target="#card${suite._id}" data-bs-slide-to="${i}" aria-label="Slide ${(i + 1)}"></button>
            `
        }

    }
}

function addSuitePlaceholder(num) {

    const container = document.querySelector('#card-container');

    const card =
    `
    <div class="card">
        <div class="media-card">
            <div class="media-card" style="background-color: #868e96;"></div>
        </div>
        <div class="top-card">
            <span class="placeholder col-6" style="height: 20pt;"></span>

            <p class="card-text placeholder-glow">
                <span class="placeholder col-7"></span>
                <span class="placeholder col-4"></span>
                <span class="placeholder col-4"></span>
                <span class="placeholder col-6"></span>
                <span class="placeholder col-8"></span>
            </p>
        </div>
        <div class="d-grid gap-2 my-4 px-2">
            <a href="#" type="button" class="btn btn-primary disabled placeholder"></a>
        </div>
    </div>
    `

    for (let i = 0; i <= num; i++) {
        container.innerHTML += card;
    }


}
