function showModal (title, description, yesBtnLabel = 'Yes', noBtnLabel = 'Cancel', callback) {

    const modalWrap = document.createElement('div');
    modalWrap.innerHTML = `
        <div class="modal fade" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header bg-light">
                <h5 class="modal-title">${title}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <p>${description}</p>
            </div>
            <div class="modal-footer bg-light">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">${noBtnLabel}</button>
                <button type="button" class="btn btn-primary modal-success-btn" data-bs-dismiss="modal">${yesBtnLabel}</button>
            </div>
            </div>
        </div>
        </div>
    `;

    modalWrap.querySelector('.modal-success-btn').onclick = callback;

    document.body.append(modalWrap);

    var modal = new bootstrap.Modal(modalWrap.querySelector('.modal'));
    modal.show();
}

