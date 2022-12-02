// Set Server URL
const base_url = 'http://server.vilaselvia.shop:3080';

function hide(el) {
    document.getElementById(el).style.display = 'none';
}

function getElementInsideContainer(containerId, childId) {
    let el;
    let els = document.getElementById(containerId).getElementsByTagName('*');

    for (let i = 0; i < els.length; i++) {
        if(els[i].id === childId) {
            el = els[i];
            break;
        }
    }
    return el;
}
