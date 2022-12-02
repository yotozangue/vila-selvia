function sendToastError(messageError) {
    const toast = document.getElementById('toasts');
    toast.style.display = 'flex';

    toast.innerHTML = `
    <div class="toast-container position-fixed bottom-0 end-0 p-3">
        <div id="errorToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
            <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.ycul4iOb6jJdQD1PSw69wgHaEo%26pid%3DApi&f=1&ipt=b46b3c6504491fff8e8a9dcff5695b132707a786c8edbc8eb6b326722798e334&ipo=images" class="rounded me-2" alt="..." width="20px">
            <strong class="me-auto">Warning</strong>
            <small>Now</small>
            <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                ${messageError}
            </div>
        </div>
    </div>
    `
    const toastLiveExample = document.getElementById('errorToast')
    const toasts = new bootstrap.Toast(toastLiveExample)

    toasts.show()
}

function sendToastSuccess(messageSuccess) {
    const toast = document.getElementById('toasts');
    toast.style.display = 'flex';

    toast.innerHTML = `
    <div class="toast-container position-fixed bottom-0 end-0 p-3">
        <div id="successToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
            <img src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fbeeimg.com%2Fimages%2Fq28773096883.png&f=1&nofb=1&ipt=247e152b321e543f5177471b353efa612b6c732692222907217ed8e38d9a7fdd&ipo=images" class="rounded me-2" alt="..." width="20px">
            <strong class="me-auto">Success</strong>
            <small>Now</small>
            <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                ${messageSuccess}
            </div>
        </div>
    </div>
    `
    const toastLiveExample = document.getElementById('successToast')
    const toasts = new bootstrap.Toast(toastLiveExample)

    toasts.show()
}
